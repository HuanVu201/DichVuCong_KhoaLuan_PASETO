namespace TD.DichVuCongApi.Application.Business.HoSoApp;
public class HoSoQueryBuilder 
{
    public HoSoSelectResponse select { get; private set; }
    public HoSoQueryBuilder()
    {
        select = BuildSelect();
    }
    public HoSoSelectResponse BuildSelect()
    {
        var getHoSoSql = @"SELECT Top 1 hs.*, tt.TenTTHC, GroupName as TenDonVi, tt.TrangThaiPhiLePhi,
                            g.MaDinhDanh as MaDinhDanhDonVi, g.Catalog, g.GroupName, g.OfGroupName, g.SoDienThoai FROM Business.HoSos hs inner join Catalog.Groups g on hs.DonViId = g.GroupCode inner join Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
                            where hs.Id = @Id";
        var getHoSoQLVBSql = @"SELECT Top 1 hs.NguoiXuLyTiep, hs.BuocXuLyTiep, hs.MaHoSo, hs.BuocHienTai, hs.NgayHenTraCaNhan, hs.TrangThaiHoSoId, hs.DinhKemKetQua, hs.TrichYeuKetQua,
                            hs.SoKyHieuKetQua, hs.LoaiVanBanKetQua, hs.NguoiKyKetQua,
                            hs.CoQuanBanHanhKetQua, hs.NgayBanHanhKetQua, hs.NgayKyKetQua, hs.Id, hs.NguoiDangXuLy, hs.NgayHenTra, hs.NgayTiepNhan, hs.TrichYeuHoSo, hs.NguoiXuLyTruoc,
                            hs.MaTruongHop, hs.BuocXuLyTruoc, hs.ChuyenNoiBo, hs.NguoiNhanHoSo, hs.NguoiDaXuLy, hs.NgayTiepNhanCaNhan, hs.KenhThucHien, hs.NgayYeuCauBoSung, hs.ChoBanHanh,
                            hs.DonViId, hs.ChuHoSo, hs.SoGiayToChuHoSo, hs.SoDienThoaiChuHoSo, hs.DiaChiChuHoSo, hs.NguoiUyQuyen, hs.SoGiayToNguoiUyQuyen, hs.SoDienThoaiNguoiUyQuyen,
                            hs.DiaChiNguoiUyQuyen, hs.UyQuyen, hs.ThongBaoEmail, hs.EmailNguoiUyQuyen, hs.EmailChuHoSo, hs.MaTTHC, hs.MucDo, hs.ThongBaoZalo, hs.LoaiDuLieuKetNoi, hs.TrangThaiBoSung, hs.TrangThaiTraKq, tt.TenTTHC, GroupName as TenDonVi,
                            g.MaDinhDanh as MaDinhDanhDonVi, g.Catalog, g.GroupName, g.OfGroupName, g.SoDienThoai FROM Business.HoSos hs inner join Catalog.Groups g on hs.DonViId = g.GroupCode inner join Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
                            where hs.Id = @Id AND hs.ChoBanHanh = 1";
        var getHoSoByMaHoSoSql = @"SELECT Top 1 hs.*, tt.TenTTHC, GroupName as TenDonVi, tt.TrangThaiPhiLePhi,
                            g.MaDinhDanh as MaDinhDanhDonVi, g.Catalog, g.GroupName, g.OfGroupName, g.SoDienThoai FROM Business.HoSos hs inner join Catalog.Groups g on hs.DonViId = g.GroupCode inner join Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
                            where hs.MaHoSo = @MaHoSo";
        var getHoSoSqls = @"SELECT hs.*, tt.TenTTHC, GroupName as TenDonVi, tt.TrangThaiPhiLePhi,
                            g.MaDinhDanh as MaDinhDanhDonVi FROM Business.HoSos hs inner join Catalog.Groups g on hs.DonViId = g.GroupCode inner join Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
                            where hs.Id IN @Ids";
        var getNguoiTiepNhanSql = @"SELECT STRING_AGG (CONVERT(NVARCHAR(1000),NguoiTiepNhanId) , '##') as TaiKhoanTiepNhan FROM [Catalog].[DonViThuTucs]
            where MaTTHC = @MaTTHC and DeletedOn is null and DonViId = @DonViId";
        return new HoSoSelectResponse()
        {
            GetHoSo = getHoSoSql,
            GetHoSos = getHoSoSqls,
            GetNguoiTiepNhanSql = getNguoiTiepNhanSql,
            GetHoSoByMaHoSoSql = getHoSoByMaHoSoSql,
            GetHoSoQLVBSql = getHoSoQLVBSql,
        };
    }
}


public class HoSoSelectResponse
{
    public string GetHoSo { get; set; }
    public string GetHoSos { get; set; }
    public string GetNguoiTiepNhanSql { get; set; }
    public string GetHoSoByMaHoSoSql { get; set; }
    public string GetHoSoQLVBSql { get; set; }
}