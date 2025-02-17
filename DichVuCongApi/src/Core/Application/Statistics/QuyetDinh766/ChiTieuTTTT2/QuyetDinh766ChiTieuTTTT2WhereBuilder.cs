using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuTTTT;
public class QuyetDinh766ChiTieuTTTT2WhereBuilder
{
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly string yeuCauThanhToanTableName = "Business.YeuCauThanhToans";
    private readonly YeuCauThanhToanConstants _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
    public string HoSoThuocDoiTuongMienPhi { get; set; }
    public string HoSoDaThuPhi { get; set; }
    public string HoSoDaThuPhiTrucTiep { get; set; }
    public string HoSoDaThuPhiTrucTuyen { get; set; }
    public string TongSoTienChuyenKhoan { get; set; }
    public string TongSoTienTrucTuyen { get; set; }
    public string TongSoTienTienMat { get; set; }
    public string TongSoTien { get; set; }
    public string TongPhi { get; set; }
    public string TongLePhi { get; set; }

    public QuyetDinh766ChiTieuTTTT2WhereBuilder() {
        HoSoThuocDoiTuongMienPhi = $"{yeuCauThanhToanTableName}.HinhThucThu = N'{_yeuCauThanhToanConstants.HINH_THUC_THU.DOI_TUONG_MIEN_PHI}'";
        HoSoDaThuPhi = $"{yeuCauThanhToanTableName}.HinhThucThu != N'{_yeuCauThanhToanConstants.HINH_THUC_THU.DOI_TUONG_MIEN_PHI}'";
        HoSoDaThuPhiTrucTiep = $" {yeuCauThanhToanTableName}.HinhThucThanhToan != N'{_yeuCauThanhToanConstants.HINH_THUC_THANH_TOAN.TRUC_TUYEN}' AND {HoSoDaThuPhi} ";
        HoSoDaThuPhiTrucTuyen = $" {yeuCauThanhToanTableName}.HinhThucThanhToan = '{_yeuCauThanhToanConstants.HINH_THUC_THANH_TOAN.TRUC_TUYEN}' AND {HoSoDaThuPhi} ";
        TongSoTienTienMat = $" {yeuCauThanhToanTableName}.HinhThucThanhToan = '{_yeuCauThanhToanConstants.HINH_THUC_THANH_TOAN.TIEN_MAT}'  AND {HoSoDaThuPhi}";
        TongSoTienChuyenKhoan = $" {yeuCauThanhToanTableName}.HinhThucThanhToan = '{_yeuCauThanhToanConstants.HINH_THUC_THANH_TOAN.CHUYEN_KHOAN}'  AND {HoSoDaThuPhi} ";
        TongSoTienTrucTuyen = $" {yeuCauThanhToanTableName}.HinhThucThanhToan = '{_yeuCauThanhToanConstants.HINH_THUC_THANH_TOAN.TRUC_TUYEN}'  AND {HoSoDaThuPhi} ";
    }
}
