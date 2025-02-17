using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
public class YeuCauThanhToanConstants
{
    public TrangThaiYeuCauThanhToanConstants TRANG_THAI { get; set; } = new TrangThaiYeuCauThanhToanConstants();
    public MaLoiDvcPayment MA_LOI { get; set; } = new MaLoiDvcPayment();
    public HinhThucThanhToan HINH_THUC_THANH_TOAN { get; set; } = new HinhThucThanhToan();
    public HinhThucThu HINH_THUC_THU { get; set; } = new HinhThucThu();
    public LoaiBienLai LOAI_BIEN_LAI { get; set; } = new LoaiBienLai();
}
public sealed class TrangThaiYeuCauThanhToanConstants
{
    public readonly string DA_THANH_TOAN = "Đã thanh toán";
    public readonly string HOAN_PHI = "Đã hoàn phí";
    public readonly string HUY = "Hủy thanh toán";
    public readonly string CHO_THANH_TOAN = "Chờ thanh toán";
    public readonly string CHUA_THANH_TOAN = "Chưa thanh toán";
}
public sealed class MaLoiDvcPayment
{
    public readonly string THANH_CONG = "00";
}
public sealed class HinhThucThanhToan
{
    public readonly string TRUC_TUYEN = "truc-tuyen";
    public readonly string TIEN_MAT = "tien-mat";
    public readonly string CHUYEN_KHOAN = "chuyen-khoan";
}
public sealed class HinhThucThu
{
    public readonly string THU_SAU = "Thu sau";
    public readonly string THU_TRUOC = "Thu trước";
    public readonly string DOI_TUONG_MIEN_PHI = "Đối tượng miễn phí";

}
public sealed class LoaiBienLai
{
    public readonly string VNPT = "vnpt";
    public readonly string VIETTEL = "viettel";
    public readonly string LOCAL = "local";
}