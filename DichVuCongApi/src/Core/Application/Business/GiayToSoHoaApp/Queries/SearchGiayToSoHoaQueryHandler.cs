using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Queries;

public class SearchGiayToSoHoaQueryWhereBuilder
{
    public static string Build(SearchGiayToSoHoaQuery req)
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
            where += " AND (gtsh.MaHoSo LIKE '%' + @SearchKeys + '%' OR hs.ChuHoSo LIKE '%' + @SearchKeys + '%' OR gtsh.ChuGiayTo LIKE '%' + @SearchKeys + '%' OR gtsh.Ten LIKE '%' + @SearchKeys + '%') ";
        if (!string.IsNullOrEmpty(req.Ma))
            where += " AND gtsh.Ma Like '%' + @Ma + '%'";
        if (req.DaHetHan == true)
            where += " AND gtsh.ThoiHanHieuLuc <= GETDATE()";
        else if (req.DaHetHan == false)
            where += " AND (gtsh.ThoiHanHieuLuc > GETDATE() OR gtsh.ThoiHanVinhVien = 1)";
        if (req.TuNgay != null)
            where += " AND ThoiGianSoHoa >= @TuNgay";
        if (req.NgayTao != null)
            where += " AND gtsh.CreatedOn = @NgayTao";
        if (req.DenNgay != null)
            where += " AND ThoiGianSoHoa <= @DenNgay";
        if (!string.IsNullOrEmpty(req.KhoTaiLieuDienTuId))
            where += " AND gtsh.KhoTaiLieuDienTuId = @KhoTaiLieuDienTuId ";
        if (!string.IsNullOrEmpty(req.MaLinhVuc))
            where += " AND gtsh.MaLinhVuc = @MaLinhVuc ";
        if (!string.IsNullOrEmpty(req.MaTTHC))
            where += " AND gtsh.MaTTHC = @MaTTHC ";
        if (!string.IsNullOrEmpty(req.TrangThaiSoHoa))
            where += " AND gtsh.TrangThaiSoHoa = @TrangThaiSoHoa ";
        if (req.ByCurrentUser == true)
            where += " AND gtsh.NguoiSoHoa = @CurrentUser ";

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
public class SearchGiayToSoHoaQueryHandler : IRequestHandler<SearchGiayToSoHoaQuery, PaginationResponse<GiayToSoHoaDto>>
{
    private readonly ICacheService _cacheService;
    private readonly ICurrentUser _currentUser;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchGiayToSoHoaQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    private class SearchGiayToSoHoaQueryWithCurrentUser : SearchGiayToSoHoaQuery
    {
        public string CurrentUser { get; set; }
    }
    public async Task<PaginationResponse<GiayToSoHoaDto>> Handle(SearchGiayToSoHoaQuery request, CancellationToken cancellationToken)
    {
        // 2 câu query có số lượng bảng join khác nhau => cần cẩn thận khi đổi hàm BuildQuery
        var where = SearchGiayToSoHoaQueryWhereBuilder.Build(request);
        var sql = $@"  SELECT gtsh.ID, ThoiHanHieuLuc, ThoiHanVinhVien, ChuGiayTo, Ten, Ma, ThoiGianSoHoa, g.GroupName, u.FullName, gtsh.DinhKem, gtsh.LoaiSoHoa ,hs.ChuHoSo,gtsh.MaHoSo, gtsh.KhoTaiLieuDienTuId, gtsh.CreatedOn, gtsh.DungLuong
                        FROM Business.GiayToSoHoas as gtsh
                        LEFT JOIN Catalog.Groups as g on gtsh.DonViId = g.MaDinhDanh and gtsh.DonViId != ''
                        LEFT JOIN Business.HoSos as hs on hs.MaHoSo = gtsh.MaHoSo
                        INNER JOIN [Identity].[Users] as u  on u.Id = gtsh.NguoiSoHoa 
                          {where}";
        string sqlGroupByUser = $@" SELECT gtsh.ChuGiayTo FROM Business.GiayToSoHoas as gtsh  {where}
                                    Group By gtsh.ChuGiayTo";
        string sqlByReq = request.GroupByUser == true ? sqlGroupByUser : sql;
        string countBy = request.GroupByUser == true ? "ChuGiayTo" : "ID";
        string orderBy = request.GroupByUser == true ? "ChuGiayTo" : "CreatedOn DESC";
        SearchGiayToSoHoaQueryWithCurrentUser newRequest = request.Adapt<SearchGiayToSoHoaQueryWithCurrentUser>();
        newRequest.CurrentUser = _currentUser.GetUserId().ToString();
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<GiayToSoHoaDto>(sqlByReq, request.PageSize, orderBy, cancellationToken, request.PageNumber, newRequest, countBy: countBy);
        return data;
    }
}
