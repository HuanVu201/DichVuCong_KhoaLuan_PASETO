using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuTTTT;
public class QuyetDinh766ChiTieuTTTTWhereBuilder
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly string yeuCauThanhToanTableName = "Business.YeuCauThanhToans";
    private readonly YeuCauThanhToanConstants _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
    public string ThuTucCoPhi { get; set; }
    public string ThuTucCoPhiPhatSinhHoSo { get; set; }
    public string ThuTucPhatSinhThanhToan { get; set; }
    public string ThuTucPhatSinhTTTT { get; set; }
    public string HoSoThuocThuTucCoPhi { get; set; }
    public string HoSoThuocThuTucCoPhiDaTTTT { get; set; }
    public QuyetDinh766ChiTieuTTTTWhereBuilder() {
        ThuTucCoPhi = string.Empty;
        ThuTucCoPhiPhatSinhHoSo = $"{hoSoTableName}.MaHoSo IS NOT NULL";
        ThuTucPhatSinhThanhToan = $"{yeuCauThanhToanTableName}.TrangThai = N'{_yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN}'";
        ThuTucPhatSinhTTTT = $"{yeuCauThanhToanTableName}.TrangThai = N'{_yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN}' AND  {yeuCauThanhToanTableName}.HinhThucThanhToan = N'{_yeuCauThanhToanConstants.HINH_THUC_THANH_TOAN.TRUC_TUYEN}'";
        HoSoThuocThuTucCoPhi = $"{hoSoTableName}.MaHoSo IS NOT NULL";
        HoSoThuocThuTucCoPhiDaTTTT= $"{yeuCauThanhToanTableName}.TrangThai = N'{_yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN}' AND  {yeuCauThanhToanTableName}.HinhThucThanhToan = '{_yeuCauThanhToanConstants.HINH_THUC_THANH_TOAN.TRUC_TUYEN}'";
    }
}
