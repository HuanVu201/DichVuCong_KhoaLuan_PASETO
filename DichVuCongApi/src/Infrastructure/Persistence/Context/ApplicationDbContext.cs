using Finbuckle.MultiTenant;
using TD.DichVuCongApi.Application.Common.Events;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Infrastructure.Persistence.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Infrastructure.Persistence.Context;

public class ApplicationDbContext : BaseDbContext
{
    public ApplicationDbContext(ITenantInfo currentTenant, DbContextOptions options, ICurrentUser currentUser, ISerializerService serializer, IOptions<DatabaseSettings> dbSettings, IEventPublisher events)
        : base(currentTenant, options, currentUser, serializer, dbSettings, events)
    {
    }
    public DbSet<LoaiPhiLePhi> LoaiPhiLePhis => Set<LoaiPhiLePhi>();
    public DbSet<ThanhPhanHoSo> ThanhPhanHoSos => Set<ThanhPhanHoSo>();
    public DbSet<QuanLyLienKet> QuanLyLienKets => Set<QuanLyLienKet>();
    public DbSet<Footer> Footers => Set<Footer>();
    public DbSet<HoiDap> HoiDaps => Set<HoiDap>();
    public DbSet<LogDeletedUser> LogDeletedUsers => Set<LogDeletedUser>();
    public DbSet<PhanAnhKienNghi> PhanAnhKienNghis => Set<PhanAnhKienNghi>();
    public DbSet<PhieuKhaoSat> PhieuKhaoSats => Set<PhieuKhaoSat>();
    public DbSet<HoSoNhap> HoSoNhaps => Set<HoSoNhap>();
    public DbSet<LogThongKeDGHLCongDan> LogThongKeDGHLCongDans => Set<LogThongKeDGHLCongDan>();
    public DbSet<DanhGiaCoQuan> DanhGiaCoQuans => Set<DanhGiaCoQuan>();
    public DbSet<HuongDanSuDung> HuongDanSuDungs => Set<HuongDanSuDung>();
    public DbSet<Banner> Banners => Set<Banner>();
    public DbSet<DSTaiLieuHDSD> DSTaiLieuHDSDs => Set<DSTaiLieuHDSD>();
    public DbSet<KenhTin> KenhTins => Set<KenhTin>();
    public DbSet<ThayDoiMucDoThuTuc> ThayDoiMucDoThuTucs => Set<ThayDoiMucDoThuTuc>();
    public DbSet<KieuNoiDung> KieuNoiDungs => Set<KieuNoiDung>();
    public DbSet<CauHoiPhoBien> CauHoiPhoBiens => Set<CauHoiPhoBien>();
    public DbSet<QuanLyVanBan> QuanLyVanBans => Set<QuanLyVanBan>();
    public DbSet<SoChungThuc> SoChungThucs => Set<SoChungThuc>();
    public DbSet<TinBai> TinBais => Set<TinBai>();
    public DbSet<TrangThai> TrangThais => Set<TrangThai>();
    public DbSet<GiayToHoSo> GiayToHoSos => Set<GiayToHoSo>();
    public DbSet<GiayToSoHoa> GiayToSoHoas => Set<GiayToSoHoa>();
    public DbSet<GiaoDichThanhToan> GiaoDichThanhToans => Set<GiaoDichThanhToan>();
    public DbSet<BuocXuLy> BuocXuLys => Set<BuocXuLy>();
    public DbSet<ThongBao> ThongBaos => Set<ThongBao>();

    public DbSet<DanhMucChung> DanhMucChungs => Set<DanhMucChung>();
    public DbSet<DiaBan> DiaBans => Set<DiaBan>();
    public DbSet<TaiKhoanThuHuong> TaiKhoanThuHuongs => Set<TaiKhoanThuHuong>();

    public DbSet<NgayNghi> NgayNghis => Set<NgayNghi>();
    public DbSet<Menu> Menus => Set<Menu>();
    public DbSet<Config> Configs => Set<Config>();
    public DbSet<Group> Groups => Set<Group>();
    public DbSet<LinhVuc> LinhVucs => Set<LinhVuc>();
    public DbSet<ThuTuc> ThuTucs => Set<ThuTuc>();
    public DbSet<ThuTucThietYeu> ThuTucThietYeus => Set<ThuTucThietYeu>();
    public DbSet<TruongHopThuTuc> TruongHopThuTucs => Set<TruongHopThuTuc>();
    public DbSet<PhiLePhi> PhiLePhis => Set<PhiLePhi>();
    public DbSet<ThanhPhanThuTuc> ThanhPhanThuTucs => Set<ThanhPhanThuTuc>();
    public DbSet<DonViThuTuc> DonViThuTucs => Set<DonViThuTuc>();
    public DbSet<HoSo> HoSos => Set<HoSo>();
    public DbSet<TrangThaiHoSo> TrangThaiHoSos => Set<TrangThaiHoSo>();
    public DbSet<NhomNguoiDung> NhomNguoiDungs => Set<NhomNguoiDung>();
    public DbSet<QuyTrinhXuLy> QuyTrinhXuLys => Set<QuyTrinhXuLy>();
    //public DbSet<Domain.Business.HuongDanNopHoSo> HuongDanNopHoSos => Set<HuongDanNopHoSo>();
    public DbSet<Domain.Business.Action> Actions => Set<Domain.Business.Action>();
    public DbSet<Screen> Screens => Set<Screen>();
    public DbSet<ScreenAction> ScreenActions => Set<ScreenAction>();
    public DbSet<YeuCauThanhToan> YeuCauThanhToans => Set<YeuCauThanhToan>();
    public DbSet<QuaTrinhXuLyHoSo> QuaTrinhXuLyHoSos => Set<QuaTrinhXuLyHoSo>();
    public DbSet<NguoiDungNhomNguoiDung> NguoiDungNhomNguoiDungs => Set<NguoiDungNhomNguoiDung>();
    public DbSet<HoSoBoSung> HoSoBoSungs => Set<HoSoBoSung>();
    public DbSet<LogCSDLDanCuDoanhNghiep> LogCSDLDanCuDoanhNghieps => Set<LogCSDLDanCuDoanhNghiep>();
    public DbSet<ThanhPhanHoSoBoSung> ThanhPhanHoSoBoSungs => Set<ThanhPhanHoSoBoSung>();
    public DbSet<DuLieuThongKeHoSo> DuLieuThongKeHoSos => Set<DuLieuThongKeHoSo>();
    public DbSet<DanhGiaHaiLong> DanhGiaHaiLongs => Set<DanhGiaHaiLong>();
    public DbSet<MauPhoi> MauPhois => Set<MauPhoi>();
    public DbSet<KhoTaiLieuDienTu> KhoTaiLieuDienTus => Set<KhoTaiLieuDienTu>();
    public DbSet<PhienBanGiayToSoHoaKhoTaiLieuDienTu> PhienBanGiayToSoHoaKhoTaiLieuDienTus => Set<PhienBanGiayToSoHoaKhoTaiLieuDienTu>();
    public DbSet<GiayToSoHoaChiaSe> GiayToSoHoaChiaSes => Set<GiayToSoHoaChiaSe>();
    public DbSet<ChuKySoCaNhan> ChuKySoCaNhans => Set<ChuKySoCaNhan>();
    public DbSet<QuaTrinhTraoDoiCongDan> QuaTrinhTraoDoiCongDans => Set<QuaTrinhTraoDoiCongDan>();
    public DbSet<KetQuaLienQuan> KetQuaLienQuans => Set<KetQuaLienQuan>();
    public DbSet<KetQuaThuTuc> KetQuaThuTucs => Set<KetQuaThuTuc>();
    public DbSet<MenuKetQuaThuTuc> MenuKetQuaThuTucs => Set<MenuKetQuaThuTuc>();
    public DbSet<HoSoChungThuc> HoSoChungThucs => Set<HoSoChungThuc>();
    public DbSet<DuThaoXuLyHoSo> DuThaoXuLyHoSos => Set<DuThaoXuLyHoSo>();
    public DbSet<DanhMucGiayToChungThuc> DanhMucGiayToChungThucs => Set<DanhMucGiayToChungThuc>();
    public DbSet<MaVanDonBuuDien> MaVanDonBuuDiens => Set<MaVanDonBuuDien>();
    public DbSet<QuanLyTaiNguyen> QuanLyTaiNguyens => Set<QuanLyTaiNguyen>();
    public DbSet<ThanhPhanHuongDanNopHoSo> ThanhPhanHuongDanNopHoSos => Set<ThanhPhanHuongDanNopHoSo>();
    public DbSet<HoSoLienThong> HoSoLienThongs => Set<HoSoLienThong>();
    public DbSet<TrangThaiHoSoLienThong> TrangThaiHoSoLienThongs => Set<TrangThaiHoSoLienThong>();
    public DbSet<APIChiaSe> APIChiaSes => Set<APIChiaSe>();
    public DbSet<LichSuAPIChiaSe> LichSuAPIChiaSes => Set<LichSuAPIChiaSe>();
    public DbSet<NhomThuTuc> NhomThuTucs => Set<NhomThuTuc>();
    public DbSet<LoaiThuTuc> LoaiThuTucs => Set<LoaiThuTuc>();
    public DbSet<ThuTucThuocLoai> ThuTucThuocLoais => Set<ThuTucThuocLoai>();
    public DbSet<KhoLuuTruCongDan> KhoLuuTruCongDans => Set<KhoLuuTruCongDan>();
    public DbSet<TaiLieuKhoLuuTruCongDan> TaiLieuKhoLuuTruCongDans => Set<TaiLieuKhoLuuTruCongDan>();
    public DbSet<ChiaSeTaiLieuKhoLuuTruCongDan> ChiaSeTaiLieuKhoLuuTruCongDans => Set<ChiaSeTaiLieuKhoLuuTruCongDan>();
    public DbSet<ThongBaoThue> ThongBaoThues => Set<ThongBaoThue>();
    public DbSet<ChungTuThue> ChungTuThues => Set<ChungTuThue>();
    public DbSet<LienThongNVTCDVCQuocGia> LienThongNVTCDVCQuocGias => Set<LienThongNVTCDVCQuocGia>();
    public DbSet<SoLieuBaoCaoHienTai> SoLieuBaoCaoHienTais => Set<SoLieuBaoCaoHienTai>();
    public DbSet<SoLieuBaoCaoTheoKy> SoLieuBaoCaoTheoKys => Set<SoLieuBaoCaoTheoKy>();
    public DbSet<HoSoLienThongLLTP> HoSoLienThongLLTPs => Set<HoSoLienThongLLTP>();
    public DbSet<ThuTucLienQuan> ThuTucLienQuans => Set<ThuTucLienQuan>();
    public DbSet<TrangThaiDongBoHoSoLLTP> TrangThaiDongBoHoSoLLTPs => Set<TrangThaiDongBoHoSoLLTP>();
    public DbSet<KySoNEAC> KySoNEACs => Set<KySoNEAC>();

    public DbSet<LoaiNhomGiayToCaNhan> LoaiNhomGiayToCaNhans => Set<LoaiNhomGiayToCaNhan>();
    public DbSet<TaiLieuGiayToCaNhan> TaiLieuGiayToCaNhans => Set<TaiLieuGiayToCaNhan>();
    public DbSet<NguoiXuLyHoSo> NguoiXuLyHoSos => Set<NguoiXuLyHoSo>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.HasDefaultSchema(SchemaNames.Catalog);
    }
}