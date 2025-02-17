using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Commands;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.ExpandApi;
public class SearchGTSHExpandApiQueryWhereBuilder
{
    public static string Build(SearchGTSHExpandApiQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.MaDinhDanh))
            where += " AND gtsh.MaDinhDanh = @MaDinhDanh";
        if (req.HienThiGiayToKetQua == false) // công dân
            where += " AND ((gtsh.LoaiSoHoa = '1' And gtsh.AnGiayTo = 0) OR gtsh.LoaiSoHoa <> '1')"; // loaiSoHoa là kết quả thì công dân chỉ được nhìn những giấy tờ đã được trả kq
        if (!string.IsNullOrEmpty(req.MaKetQuaTTHC))
            where += " AND gtsh.MaGiayTo = @MaKetQuaTTHC";
        if (!string.IsNullOrEmpty(req.SoGiayToChuHoSo))
            where += " AND hs.SoGiayToChuHoSo  Like '%' + @SoGiayToChuHoSo + '%'";
        if (!string.IsNullOrEmpty(req.SearchKeys))
            where += " AND (gtsh.MaHoSo LIKE '%' + @SearchKeys + '%' OR hs.ChuHoSo LIKE '%' + @SearchKeys + '%') ";
        if (!string.IsNullOrEmpty(req.Ma))
            where += " AND gtsh.Ma Like '%' + @Ma + '%'";
        if (req.DaHetHan == true)
            where += " AND gtsh.ThoiHanHieuLuc <= GETDATE()";
        else if (req.DaHetHan == false)
            where += " AND gtsh.ThoiHanHieuLuc > GETDATE()";
        if (req.TuNgay != null)
            where += " AND ThoiGianSoHoa >= @TuNgay";
        if (req.DenNgay != null)
            where += " AND ThoiGianSoHoa <= @DenNgay";
        if (!string.IsNullOrEmpty(req.KhoTaiLieuDienTuId))
            where += " AND gtsh.KhoTaiLieuDienTuId = @KhoTaiLieuDienTuId ";

        if (req.Removed == false)
            where += " AND gtsh.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND gtsh.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchGTSHExpandApiQueryHandler : IRequestHandler<SearchGTSHExpandApiQuery, Result<PaginationResponse<GiayToSoHoaDto>>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;

    public SearchGTSHExpandApiQueryHandler(IDapperRepository dapperRepository, IMediator mediator)
    {

        _dapperRepository = dapperRepository;
        _mediator = mediator;

    }
    public async Task<Result<PaginationResponse<GiayToSoHoaDto>>> Handle(SearchGTSHExpandApiQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _mediator.Send(new UpdateLuotGoiApiChiaSeCommand()
            {
                MaApiChiaSe = request.ApiEx,
            });
            if (res.Failed)
            {
                return Result<PaginationResponse<GiayToSoHoaDto>>.Fail(res.Message);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return Result<PaginationResponse<GiayToSoHoaDto>>.Fail("Lỗi kiểm tra giới hạn lượt gọi api!");

        }


        var where = SearchGTSHExpandApiQueryWhereBuilder.Build(request);
        var sql = $@"  SELECT gtsh.ID, ThoiHanHieuLuc, Ten, Ma, ThoiGianSoHoa, g.GroupName, u.FullName, gtsh.DinhKem, gtsh.LoaiSoHoa ,hs.ChuHoSo,gtsh.MaHoSo, gtsh.KhoTaiLieuDienTuId, gtsh.DungLuong
                        FROM Business.GiayToSoHoas as gtsh
                        LEFT JOIN Catalog.Groups as g on gtsh.DonViId = g.MaDinhDanh
                        INNER JOIN [Identity].[Users] as u  on u.Id = gtsh.NguoiSoHoa 
                        INNER JOIN Business.HoSos as hs on hs.MaHoSo = gtsh.MaHoSo  {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<GiayToSoHoaDto>(sql, request.PageSize, "ThoiGianSoHoa DESC", cancellationToken, request.PageNumber, request);
        return Result<PaginationResponse<GiayToSoHoaDto>>.Success(data);
    }
}
