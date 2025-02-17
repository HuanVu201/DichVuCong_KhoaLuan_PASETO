using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Dtos;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Constant;
using MediatR;

namespace TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Queries;

public class SearchDuThaoXuLyHoSoQueryWhereBuilder
{
    public static string Build(SearchDuThaoXuLyHoSoQuery req)
    {
        string where = string.Empty; // ChoBanHanh = 1 là hồ sơ đang ở trên QLVB
        if (!string.IsNullOrEmpty(req.SearchKeys))
            where += " AND (hs.MaHoSo LIKE '%' + @SearchKeys + '%' OR hs.ChuHoSo LIKE '%' + @SearchKeys + '%') ";
        if (!string.IsNullOrEmpty(req.TiepNhanFrom))
            where += " AND hs.NgayTiepNhan >= @TiepNhanFrom";
        if (!string.IsNullOrEmpty(req.TiepNhanTo))
            where += " AND hs.NgayTiepNhan <= @TiepNhanTo";
        if (!string.IsNullOrEmpty(req.HenTraFrom))
            where += " AND hs.NgayHenTra >= @HenTraFrom";
        if (!string.IsNullOrEmpty(req.HenTraTo))
            where += " AND hs.NgayHenTra <= @HenTraTo";
        if (!string.IsNullOrEmpty(req.MaTrangThai))
            where += " AND hs.TrangThaiHoSoId = @MaTrangThai";
        if (!string.IsNullOrEmpty(req.NguoiXuLy))
            where += " AND dtxlhs.NguoiXuLy LIKE '%' + @NguoiXuLy + '%'";
        if (!string.IsNullOrEmpty(req.LanhDaoThongQua))
            where += " AND dtxlhs.LanhDaoThongQua = @LanhDaoThongQua";
        if (!string.IsNullOrEmpty(req.LoaiDuThao))
            where += " AND dtxlhs.Loai = @LoaiDuThao";



        if (!string.IsNullOrEmpty(req.TrangThaiDuThao))
        {
            if (!string.IsNullOrEmpty(req.LoaiDuThao)
                && req.TrangThaiDuThao == DuThaoXuLyHoSoConstant.TrangThai_ChoKyDuyet)
            {
                where += " AND dtxlhs.TrangThai = N'Chờ ký duyệt'";
            }

            if (!string.IsNullOrEmpty(req.LoaiDuThao)
                && req.TrangThaiDuThao == DuThaoXuLyHoSoConstant.TrangThai_ChoXuLy)
            {
                where += $" AND (dtxlhs.TrangThai = N'{DuThaoXuLyHoSoConstant.TrangThai_ChoXuLy}' OR dtxlhs.TrangThai = N'{DuThaoXuLyHoSoConstant.TrangThai_ChoKyDuyet}')";
            }

            if (!string.IsNullOrEmpty(req.LoaiDuThao)
                && req.TrangThaiDuThao == DuThaoXuLyHoSoConstant.TrangThai_DaXuLy)
            {
                where += $" AND (dtxlhs.TrangThai = N'{DuThaoXuLyHoSoConstant.TrangThai_DaXuLy}' OR dtxlhs.TrangThai = N'{DuThaoXuLyHoSoConstant.TrangThai_TuChoi}')";
            }
        }



        if (req.Removed == false)
            where += " AND hs.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND hs.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchDuThaoXuLyHoSoQueryHandler : IRequestHandler<SearchDuThaoXuLyHoSoQuery, PaginationResponse<DuThaoXuLyHoSoDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public SearchDuThaoXuLyHoSoQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<PaginationResponse<DuThaoXuLyHoSoDto>> Handle(SearchDuThaoXuLyHoSoQuery request, CancellationToken cancellationToken)
    {

        if (request.TrangThaiDuThao == DuThaoXuLyHoSoConstant.TrangThai_ChoKyDuyet)
        {
            request.LanhDaoThongQua = _currentUser.GetUserId().ToString();
        }
        else
        {
            request.NguoiXuLy = _currentUser.GetUserId().ToString();
        }

        var where = SearchDuThaoXuLyHoSoQueryWhereBuilder.Build(request);
        string sql = @$"SELECT hs.Id as HoSoId, dtxlhs.Id, ChuHoSo, SoDienThoaiChuHoSo, EmailChuHoSo, hs.TrangThaiHoSoId, NgayHenTra, hs.MaHoSo, KenhThucHien,
                        tt.TenTTHC, NgayNopHoSo, hs.SoGiayToChuHoSo, dtxlhs.NguoiXuLy, dtxlhs.TrangThai, dtxlhs.TrangThaiLienThongQLVB, dtxlhs.CreatedOn,
                        dtxlhs.FileDinhKem, dtxlhs.TrichYeu, dtxlhs.TenLanhDaoKy, u1.FullName as TenNguoiXuLy
                        FROM 
                          Business.HoSos as hs 
                          INNER JOIN Business.DuThaoXuLyHoSos as dtxlhs ON hs.MaHoSo = dtxlhs.MaHoSo 
                          INNER JOIN Catalog.ThuTucs tt ON hs.MaTTHC = tt.MaTTHC 
                          INNER JOIN [Identity].Users as u1 ON u1.id = dtxlhs.NguoiXuLy
                        {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DuThaoXuLyHoSoDto>(sql, request.PageSize, "CreatedOn DESC", cancellationToken, request.PageNumber, request);
        return data;
    }
}
