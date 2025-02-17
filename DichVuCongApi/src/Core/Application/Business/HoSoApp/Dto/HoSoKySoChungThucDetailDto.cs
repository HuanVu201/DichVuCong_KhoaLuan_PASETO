namespace TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
public class HoSoKySoChungThucDetailDto : HoSoPer
{
    public HoSoKySoChungThucDetailDto()
    {
        ThanhPhanHoSos = new List<HoSoKySoChungThucDetail_ThanhPhanHoSo>();
    }
    public Guid Id { get; set; }
    public string MaHoSo { get; set; }
    public string MaTTHC { get; set; }
    public string DonViId { get; set; }
    public string NguoiDaXuLy { get; set; }
    public string ChuHoSo { get; set; }
    public string DinhKemKetQua { get; set; }
    public string TrangThaiHoSoId { get; set; }
    public string DinhKemYKienNguoiChuyenXuLy { get; set; }
    public string TrichYeuKetQua { get; set; }
    public string YKienNguoiChuyenXuLy { get; set; }
    public string MaTruongHop { get; set; }
    public string BuocHienTai { get; set; }
    public string NguoiNhanHoSo { get; set; }
    public string FullName { get; set; }
    public string EdgeQuyTrinh { get; set; }
    public string NodeQuyTrinh { get; set; }
    public string EForm { get; set; }
    public double ThoiGianThucHien { get; set; }
    public string LoaiThoiGianThucHien { get; set; }

    public List<HoSoKySoChungThucDetail_ThanhPhanHoSo> ThanhPhanHoSos { get; set; }
}

public class HoSoKySoChungThucDetail_ThanhPhanHoSo
{
    public Guid Id { get; set; }
    public string Ten { get; set; }
    public string TenGiayTo { get; set; }
    public string MaGiayTo { get; set; }
    public int SoTrang { get; set; }
    public int SoBanGiay { get; set; }
    public string DinhKem { get; set; }
    public string DinhKemGoc { get; set; }
    public bool DaChungThucDienTu { get; set; }
    public bool KyDienTuBanGiay { get; set; }
    public string TrangThaiDuyet { get; set; }
    public int? SoChungThucDienTu { get; set; }
    public string? SoChungThucDT { get; set; }
    public int? SoChungThucGiay { get; set; }
    public string? SoChungThucG { get; set; }
    public int TongTien { get; set; }
}
