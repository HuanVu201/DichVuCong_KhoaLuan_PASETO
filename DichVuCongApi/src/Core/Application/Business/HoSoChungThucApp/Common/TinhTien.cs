using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Common;
public class TinhTien
{
    public static readonly int SoTien2TrangDau = 2000;
    public static readonly int SoTienTrang3TroDi = 1000;
    public static readonly int SoTienMax = 200000;

    private static int GetTongTienTheoSoTrang(int soTrang)
    {
        int tongTien = 0;
        if (soTrang <= 2)
        {
            tongTien = soTrang * SoTien2TrangDau;
        }
        else if (soTrang > 2)
        {
            int soTrangConLai = soTrang - 2;
            int tongSoTienSoTrangConLai = soTrangConLai * SoTienTrang3TroDi;
            int tongSoTien2TrangDau = 2 * SoTien2TrangDau;
            tongTien = tongSoTienSoTrangConLai + tongSoTien2TrangDau;
        }
        return tongTien;
    }
    public class TongTienThanhPhanChungThuc
    {
        public int TongTienG { get; set; }
        public int TongTienDT { get; set; }
        public int TongTien { get; set; }
    }
    public static TongTienThanhPhanChungThuc GetTongTienThanhPhanChungThuc(HoSoKySoChungThucDetail_ThanhPhanHoSo thanhPhanHoSo)
    {

        int tongTien = 0;
        int tongTienG = 0;
        int tongTienDT = 0;
        if (thanhPhanHoSo.SoBanGiay != null && thanhPhanHoSo.SoTrang != null)
        {
            var soTrangThanhPhanHoSo = thanhPhanHoSo.SoTrang == 0 ? 1: thanhPhanHoSo.SoTrang;
            var soBanGiayThanhPhanHoSo = (int)thanhPhanHoSo.SoBanGiay;
            int tongTienGiayTren1Ban = GetTongTienTheoSoTrang(soTrangThanhPhanHoSo);
            int newTongTienGiay = tongTienGiayTren1Ban > SoTienMax ? SoTienMax : tongTienGiayTren1Ban;
            tongTienDT = thanhPhanHoSo.KyDienTuBanGiay == false ? 0 : GetTongTienTheoSoTrang(soTrangThanhPhanHoSo);
            for (int i = 0; i < soBanGiayThanhPhanHoSo; i++)
            {
                #region Tiền bản giấy

                tongTienG += newTongTienGiay;
                #endregion
               
            }
        }
        tongTien = tongTienDT + tongTienG;
        return new TongTienThanhPhanChungThuc()
        {
            TongTien = tongTien,
            TongTienDT = tongTienDT,
            TongTienG = tongTienG,
        };
    }
}
