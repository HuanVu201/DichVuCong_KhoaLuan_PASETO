using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Commands;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.ExpandApi;
public class SearchHoSoExpandApiQueryWhereBuilder
{
    public static string Build(SearchHoSoExpandApiQuery req)
    {
        YeuCauThanhToanConstants yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
        string where = string.Empty; // ChoBanHanh = 1 là hồ sơ đang ở trên QLVB
        if (!string.IsNullOrEmpty(req.SearchKeys))
            where += $" AND (hs.MaHoSo LIKE '%' + @SearchKeys + '%' OR hs.ChuHoSo LIKE N'%' + @SearchKeys + '%' )";
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND hs.MaHoSo LIKE '%' + @MaHoSo + '%'";

        if (!string.IsNullOrEmpty(req.ChuHoSo))
            where += " AND hs.ChuHoSo LIKE N'%' + @ChuHoSo + '%'";

        if (!string.IsNullOrEmpty(req.SoGiayToChuHoSo))
            where += " AND hs.SoGiayToChuHoSo LIKE '%' + @SoGiayToChuHoSo + '%'";

        if (!string.IsNullOrEmpty(req.SoDienThoaiChuHoSo))
            where += " AND hs.SoGiaySoDienThoaiChuHoSoToChuHoSo LIKE '%' + @SoDienThoaiChuHoSo + '%'";
        return where;
    }
}
public class SearchHoSoExpandApiQueryHandler : IRequestHandler<SearchHoSoExpandApiQuery, Result<PaginationResponse<HoSoExpandApiDto>>>
{
    private readonly string tableTrangThaiHoSo = "[Business].[TrangThaiHoSos]";
    private readonly string tableTruongHopThuTuc = "[Business].[TruongHopThuTucs]";
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _currentUser;
    private readonly IMediator _mediator;
    public SearchHoSoExpandApiQueryHandler(IDapperRepository dapperRepository, IUserService currentUser, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _mediator = mediator;
    }
    public async Task<Result<PaginationResponse<HoSoExpandApiDto>>> Handle(SearchHoSoExpandApiQuery request, CancellationToken cancellationToken)
    {

        try
        {
            var res = await _mediator.Send(new UpdateLuotGoiApiChiaSeCommand()
            {
                MaApiChiaSe = request.ApiEx,
            });
            if (res.Failed)
            {
                return Result<PaginationResponse<HoSoExpandApiDto>>.Fail(res.Message);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return Result<PaginationResponse<HoSoExpandApiDto>>.Fail("Lỗi kiểm tra giới hạn lượt gọi api!");

        }

        var user = await _currentUser.GetCurrentUserAsync(cancellationToken);

        var where = SearchHoSoExpandApiQueryWhereBuilder.Build(request);
        var sql = $@"SELECT hs.ID, hs.ChuHoSo, hs.SoDienThoaiChuHoSo, hs.MaTTHC, hs.TrangThaiHoSoId, hs.TrichYeuHoSo, 
                    NgayTiepNhan, NgayHenTra, hs.CreatedOn, hs.MaHoSo,                   
                    g.GroupName as TenDonVi, NgayNopHoSo, hs.SoGiayToChuHoSo
                    FROM Business.HoSos as hs
                    INNER JOIN Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
                    LEFT JOIN Catalog.Groups g on hs.DonViId = g.GroupCode
                    {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoExpandApiDto>(sql, request.PageSize, "CreatedOn Desc", cancellationToken, request.PageNumber, new
        {
            request.MaHoSo,
            CurrentUser = user.Id.ToString(),
            NguoiGui = user.SoDinhDanh,
            request.SearchKeys,

        });
        return Result<PaginationResponse<HoSoExpandApiDto>>.Success(data);
    }
}
