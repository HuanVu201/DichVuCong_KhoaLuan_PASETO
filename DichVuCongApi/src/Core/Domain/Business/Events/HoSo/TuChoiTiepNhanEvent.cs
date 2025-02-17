using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public class TuChoiTiepNhanTrucTuyenEvent : HoSoEvent
{
    public string NgayThangNam { get; set; }
    public string TenDonVi { get; set; }
    public string TenDonViCha { get; set; }
    public string HoTenNguoiNop { get; set; }
    public string DiaChiNguoiNop { get; set; }
    public string SoDienThoaiNguoiNop { get; set; }
    public string EmailNguoiNop { get; set; }
    public string LyDoTraLai { get; set; }
    public string TenNguoiTiepNhan { get; set; }
    public string SoDienThoaiHoTro { get; set; }
    public string GroupCatalog { get; set; }
    public string TenDiaDanh { get; set; }
    public string IdCongDan { get; set; }
    public string BoPhanTiepNhanVaTraKetQua { get; set; }
    public string TenHoSo { get; set; }

    public TuChoiTiepNhanTrucTuyenEvent(Business.HoSoQLVB hoSo, string tenNguoiTiepNhan, string tenDonVi, string lyDoTraLai, string tenDonViCha, string groupCatalog, string tenTinhThanh, string soDienThoaiHoTro) : base(hoSo)
    {
        NgayThangNam = HoSoEventUtils.GetFormatedNgayThangNam(hoSo.NgayTiepNhan);
        TenNguoiTiepNhan = tenNguoiTiepNhan;
        TenDonVi = tenDonVi;
        HoTenNguoiNop = (hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo) ?? "";
        DiaChiNguoiNop = (hoSo.UyQuyen == true ? hoSo.DiaChiNguoiUyQuyen : hoSo.DiaChiChuHoSo) ?? "";
        SoDienThoaiNguoiNop = (hoSo.UyQuyen == true ? hoSo.SoDienThoaiNguoiUyQuyen : hoSo.SoDienThoaiChuHoSo) ?? "";
        EmailNguoiNop = (hoSo.UyQuyen == true ? hoSo.EmailNguoiUyQuyen : hoSo.EmailChuHoSo) ?? "";
        LyDoTraLai = lyDoTraLai;
        TenHoSo = hoSo.TenTTHC;
        if (groupCatalog == GroupContants.XA_PHUONG || groupCatalog == GroupContants.QUAN_HUYEN)
        {
            TenDonViCha = tenDonViCha.ToUpper();
            BoPhanTiepNhanVaTraKetQua = "<strong>" + HoSoEventUtils.BoPhanTiepNhanVaTraKetQua.ToUpper() + "</strong>";
        }
        else if (groupCatalog == GroupContants.SO_BAN_NGANH)
        {
            TenDonViCha = HoSoEventUtils.TrungTamPhucVuHanhChinhCong.ToUpper() + "</br>" + "<strong>" + "TỈNH " + tenTinhThanh.ToUpper() + "</strong>";
            BoPhanTiepNhanVaTraKetQua = "";
        }
        else if (groupCatalog == GroupContants.CNVPDK)
        {
            if (hoSo.OfGroupName.Contains("UBND"))
            {
                hoSo.OfGroupName = hoSo.OfGroupName.Replace("UBND", "");
            }
            TenDonViCha = HoSoEventUtils.ChiNhanhVanPhongDangKyDatDai.ToUpper() + " " + hoSo.OfGroupName.ToUpper();
            BoPhanTiepNhanVaTraKetQua = "<strong>" + HoSoEventUtils.BoPhanTiepNhanVaTraKetQua.ToUpper() + "</strong>";
        }
        SoDienThoaiHoTro = soDienThoaiHoTro;
        IdCongDan = hoSo.UyQuyen == true ? hoSo.SoGiayToNguoiUyQuyen : hoSo.SoGiayToChuHoSo;
        GroupCatalog = groupCatalog;
    }
}
