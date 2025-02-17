using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.TongHopThanhtoan;
public class TongHopThanhToanWhereBuilder
{
    private readonly string yeuCauThanhToanTable = "[Business].[YeuCauThanhToans]";
    private readonly YeuCauThanhToanConstants yeuCauThanhToanConstants;
    public string Phi { get; set; }
    public string LePhi { get; set; }
    public string TongSo { get; set; }
    public string TongTienMat { get; set; }
    public string TongTrucTuyen { get; set; }
    public string TongHinhThucThanhToanKhac { get; set; }
    public string HoSoDaThuPhi { get; set; }
    public TongHopThanhToanWhereBuilder()
    {
        yeuCauThanhToanConstants = new YeuCauThanhToanConstants();

        TongTienMat = $"{yeuCauThanhToanTable}.HinhThucThanhToan = '{yeuCauThanhToanConstants.HINH_THUC_THANH_TOAN.TIEN_MAT}' ";
        TongTrucTuyen = $"{yeuCauThanhToanTable}.HinhThucThanhToan = '{yeuCauThanhToanConstants.HINH_THUC_THANH_TOAN.TRUC_TUYEN}' ";
        TongHinhThucThanhToanKhac = $"{yeuCauThanhToanTable}.HinhThucThanhToan IS  NULL OR ({yeuCauThanhToanTable}.HinhThucThanhToan != '{yeuCauThanhToanConstants.HINH_THUC_THANH_TOAN.TRUC_TUYEN}' AND {yeuCauThanhToanTable}.HinhThucThanhToan != '{yeuCauThanhToanConstants.HINH_THUC_THANH_TOAN.TIEN_MAT}') ";
    }
}
