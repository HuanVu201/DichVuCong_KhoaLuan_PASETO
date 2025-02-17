using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Domain.Business.Events.HoSo;
public class ThongBaoNopPhiEvent : HoSoEvent
{
    public string NgayThangNam { get; set; }
    public string HoTenNguoiNop { get; set; }
    public string HinhThucPhi { get; set; }
    public int SoTienPhi { get; set; }
    public int SoTienLePhi { get; set; }
    public string TenNguoiTiepNhan { get; set; }
    public string TenDonViCha { get; set; }
    public string TenDonViCon { get; set; }
    public string GroupCatalog { get; set; }
    public string SoDienThoaiHoTro { get; set; }
    public string TenDiaDanh { get; set; }
    public string BoPhanTiepNhanVaTraKetQua { get; set; }
    public string IdCongDan { get; set; }
    public string YeuCauThanhToanId { get; set; }

    public ThongBaoNopPhiEvent(HoSoQLVB hoSo, string hinhThucPhi, int soTienPhi, int soTienLePhi, string tenNguoiTiepNhan, string tenDonViCha, string groupCatalog, string tenTinhThanh, string soDienThoaiHoTro, string yeuCauThanhToanId) : base(hoSo)
    {
        TenDiaDanh = HoSoEventUtils.GetTenDiaDanh(tenDonViCha, groupCatalog, tenTinhThanh);
        DateTime now = DateTime.Now;
        NgayThangNam = HoSoEventUtils.GetFormatedNgayThangNam(now);
        HoTenNguoiNop = hoSo.UyQuyen == true ? hoSo.NguoiUyQuyen : hoSo.ChuHoSo;
        HinhThucPhi = hinhThucPhi;
        SoTienPhi = soTienPhi;
        SoTienLePhi = soTienLePhi;
        SoDienThoaiHoTro = soDienThoaiHoTro;
        TenNguoiTiepNhan = tenNguoiTiepNhan;
        if (groupCatalog == GroupContants.XA_PHUONG || groupCatalog == GroupContants.QUAN_HUYEN)
        {
            TenDonViCha = tenDonViCha.ToUpper();
            TenDonViCon = HoSoEventUtils.BoPhanTiepNhanVaTraKetQua + hoSo.GroupName;
            BoPhanTiepNhanVaTraKetQua = "<strong>" + HoSoEventUtils.BoPhanTiepNhanVaTraKetQua.ToUpper() + "</strong>";
        } else if (groupCatalog == GroupContants.SO_BAN_NGANH)
        {
            TenDonViCha = HoSoEventUtils.TrungTamPhucVuHanhChinhCong.ToUpper() + "</br>" + "<strong>" + "TỈNH " + tenTinhThanh.ToUpper() + "</strong>";
            TenDonViCon = HoSoEventUtils.TrungTamPhucVuHanhChinhCong + tenTinhThanh;
            BoPhanTiepNhanVaTraKetQua = "";
        } else if (groupCatalog == GroupContants.CNVPDK)
        {
            if (hoSo.OfGroupName.Contains("UBND"))
            {
                hoSo.OfGroupName = hoSo.OfGroupName.Replace("UBND", "");
            }
            TenDonViCha = HoSoEventUtils.ChiNhanhVanPhongDangKyDatDai.ToUpper() + " " + hoSo.OfGroupName.ToUpper();

            BoPhanTiepNhanVaTraKetQua = "<strong>" + HoSoEventUtils.BoPhanTiepNhanVaTraKetQua.ToUpper() + "</strong>";
            TenDonViCon = hoSo.OfGroupName;
        }
        IdCongDan = hoSo.UyQuyen == true ? hoSo.SoGiayToNguoiUyQuyen : hoSo.SoGiayToChuHoSo;
        YeuCauThanhToanId = yeuCauThanhToanId;
        GroupCatalog = groupCatalog;
    }
}
