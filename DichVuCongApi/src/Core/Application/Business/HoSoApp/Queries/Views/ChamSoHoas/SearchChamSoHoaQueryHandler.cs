
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries.Views.ChamSoHoas;
public class SearchChamSoHoaQueryHandler : IRequestHandler<SearchChamSoHoaQuery, PaginationResponse<HoSoDto>>
{
    private readonly string tableTruongHopThuTuc = "[Business].[TruongHopThuTucs]";
    private readonly IDapperRepository _dapperRepository;
    public SearchChamSoHoaQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }

    public class SearchChamSoHoaQueryWhereBuilder
    {
        public static string Build(SearchChamSoHoaQuery req)
        {
            string where = string.Empty; // ChoBanHanh = 1 là hồ sơ đang ở trên QLVB
            if (!string.IsNullOrEmpty(req.SearchKeys))
                where += " AND (hs.MaHoSo LIKE '%' + @SearchKeys + '%' OR hs.ChuHoSo LIKE '%' + @SearchKeys + '%')";
            if (!string.IsNullOrEmpty(req.SoDienThoaiChuHoSo))
                where += " AND hs.SoDienThoaiChuHoSo LIKE '%' + @SoDienThoaiChuHoSo + '%'";
            if (!string.IsNullOrEmpty(req.SoDienThoaiNguoiUyQuyen))
                where += " AND hs.SoDienThoaiNguoiUyQuyen LIKE '%' + @SoDienThoaiNguoiUyQuyen + '%'";
            if (!string.IsNullOrEmpty(req.ChuHoSo))
                where += " AND hs.ChuHoSo LIKE '%' + @ChuHoSo + '%'";
            if (!string.IsNullOrEmpty(req.NguoiUyQuyen))
                where += " AND hs.NguoiUyQuyen LIKE '%' + @NguoiUyQuyen + '%'";
            if (!string.IsNullOrEmpty(req.TrichYeuHoSo))
                where += " AND hs.TrichYeuHoSo LIKE '%' + @TrichYeuHoSo + '%'";
            if (!string.IsNullOrEmpty(req.MaHoSoLienThong))
                where += " AND hs.MaHoSoKhac LIKE '%' + @MaHoSoLienThong + '%'";
            if (!string.IsNullOrEmpty(req.SoKyHieuKetQua))
                where += " AND hs.SoKyHieuKetQua LIKE '%' + @SoKyHieuKetQua + '%'";
            if (!string.IsNullOrEmpty(req.SoKyHieuTrichYeu))
                where += " AND (hs.SoKyHieuKetQua LIKE '%' + @SoKyHieuTrichYeu + '%' OR hs.TrichYeuKetQua LIKE '%' + @SoKyHieuTrichYeu + '%') ";
            if (!string.IsNullOrEmpty(req.MaHoSo))
                where += " AND hs.MaHoSo LIKE '%' + @MaHoSo + '%'";
            if (!string.IsNullOrEmpty(req.TrangThaiHoSoId))
                where += " AND hs.TrangThaiHoSoId = CAST(@TrangThaiHoSoId as varchar(5))";
            if (!string.IsNullOrEmpty(req.TiepNhanFrom))
                where += " AND hs.NgayTiepNhan >= @TiepNhanFrom";
            if (!string.IsNullOrEmpty(req.TiepNhanTo))
                where += " AND hs.NgayTiepNhan <= @TiepNhanTo";
            if (!string.IsNullOrEmpty(req.HenTraFrom))
                where += " AND hs.NgayHenTra >= @HenTraFrom";
            if (!string.IsNullOrEmpty(req.HenTraTo))
                where += " AND hs.NgayHenTra <= @HenTraTo";
            if (!string.IsNullOrEmpty(req.NgayTraFrom))
                where += " AND hs.NgayTra >= @NgayTraFrom";
            if (!string.IsNullOrEmpty(req.NgayTraTo))
                where += " AND hs.NgayTra <= @NgayTraTo";
            if (!string.IsNullOrEmpty(req.SoGiayToChuHoSo))
                where += " AND hs.SoGiayToChuHoSo LIKE '%' + @SoGiayToChuHoSo + '%'";
            if (!string.IsNullOrEmpty(req.GroupCode))
                where += " AND hs.DonViId = @GroupCode";
            if (!string.IsNullOrEmpty(req.KenhThucHien))
                where += " AND hs.KenhThucHien = @KenhThucHien";
            if (!string.IsNullOrEmpty(req.TrangThaiSoHoa))
                where += " AND hs.TrangThaiSoHoa = @TrangThaiSoHoa";
            if (req.SearchAllType == false)
            {
                if (req.LaHoSoChungThuc == true)
                {
                    where += $" AND hs.LaHoSoChungThuc = 1";
                }
                else
                {
                    where += $" AND (hs.LaHoSoChungThuc = 0 )";
                }
            }

            if (req.NopHoSoTuNgay.HasValue) where += $" AND hs.NgayNopHoSo >= @NopHoSoTuNgay ";
            if (req.NopHoSoDenNgay.HasValue) where += $" AND hs.NgayNopHoSo <= @NopHoSoDenNgay ";

            if (req.LoaiDoiTuong == LoaiChuHoSoConstant.CongDan)
            {
                where += $" AND hs.LoaiDoiTuong != N'{LoaiChuHoSoConstant.DoanhNghiep}' AND hs.LoaiDoiTuong != N'{LoaiChuHoSoConstant.CoQuanNhaNuoc}' ";
            }
            else if (!string.IsNullOrEmpty(req.LoaiDoiTuong))
            {
                where += $" AND hs.LoaiDoiTuong = @LoaiDoiTuong ";
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
    public async Task<PaginationResponse<HoSoDto>> Handle(SearchChamSoHoaQuery request, CancellationToken cancellationToken)
    {
        if(request.TrangThaiSoHoa != HoSo_TrangThaiSoHoa.ChoSoHoa && request.TrangThaiSoHoa != HoSo_TrangThaiSoHoa.DaSoHoa)
        {
            throw new ArgumentException("Trạng thái số hóa không hợp lệ");
        }
        var where = SearchChamSoHoaQueryWhereBuilder.Build(request);
        var sql = $@"SELECT hs.ID,hs.NgayXacNhanKetQua, ChuHoSo,hs.TenDiaBan,hs.TenBuocHienTai,NgayLuuViTriHoSo,NguoiLuuViTriHoSo ,hs.SoKyHieuKetQua,SoDienThoaiChuHoSo, EmailChuHoSo, hs.MaTruongHop, hs.MaTTHC, hs.TrangThaiHoSoId,LyDoTuChoi,LyDoBoSung,hs.TrichYeuHoSo, hs.ViTriDeHoSo,hs.LoaiKetQua, hs.DiaChiChuHoSo,
		            UyQuyen, hs.NguoiUyQuyen, hs.SoDienThoaiNguoiUyQuyen, NgayTiepNhan, NgayHenTra, hs.CreatedOn, hs.NgayChuyenXuLy, hs.LastModifiedOn, hs.MaHoSo,hs.DonViId, KenhThucHien,thtt.BatBuocDinhKemKetQua, thtt.Ten as TenTruongHop,thtt.BatBuocKySoKetQua, hs.DinhKemKetQua
                    ,g.GroupName as TenDonVi, NgayNopHoSo, hs.SoGiayToChuHoSo, hs.NgayHenTraCaNhan, hs.DinhKemTuChoi, hs.LoaiDuLieuKetNoi
                    FROM Business.HoSos as hs
                    INNER JOIN Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
                    LEFT JOIN Catalog.Groups g on hs.DonViId = g.GroupCode
                    LEFT JOIN {tableTruongHopThuTuc} thtt ON thtt.Ma = hs.MaTruongHop
                    {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoDto>(sql, request.PageSize, "CreatedOn desc", cancellationToken, request.PageNumber, request);
        return data;
    }
}
