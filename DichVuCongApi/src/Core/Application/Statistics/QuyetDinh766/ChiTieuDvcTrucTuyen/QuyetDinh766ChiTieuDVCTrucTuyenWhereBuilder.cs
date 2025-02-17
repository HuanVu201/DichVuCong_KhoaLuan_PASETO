using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuDvcTrucTuyen;
public class QuyetDinh766ChiTieuDVCTrucTuyenWhereBuilder
{
    private readonly string donViThuTucTableName = "Catalog.DonViThuTucs";

    public readonly string TRANG_THAI_TIEP_NHAN = "'2','4','5','6','8','7','9','10'";
    private readonly TiepNhanHoSoTrucTuyenConstants tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
    public string TongSoThuTuc { get; set; }
    public string ThuTucDvcTrucTuyen { get; set; }
    public string ThuTucDvcTrucTuyenToanTrinh { get; set; }
    public string ThuTucDvcTrucTuyenMotPhan { get; set; }
    public string ThuTucPhatSinhHoSo { get; set; }
    public string TongHoSoPhatSinh { get; set; }
    public string ThuTucTrucTuyenPhatSinhHoSo { get; set; }
    public string HoSoPhatSinhTrongThuTucTrucTuyen { get; set; }
    public string HoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen { get; set; }
    public string ThuTucToanTrinhPhatSinhHoSo { get; set; }
    public string HoSoPhatSinhTrongThuTucToanTrinh { get; set; }
    public string HoSoPhatSinhTrucTuyenTrongThuTucToanTrinh { get; set; }
    public string ThuTucMotPhanPhatSinhHoSo { get; set; }
    public string HoSoPhatSinhTrongThuTucMotPhan { get; set; }
    public string HoSoPhatSinhTrucTuyenTrongThuTucMotPhan { get; set; }
    public string ThuTucDvc { get; set; }
    public string ThuTucDvcPhatSinhHoSo { get; set; }
    public string HoSoPhatSinhTrongThuTucDvc { get; set; }
    public QuyetDinh766ChiTieuDVCTrucTuyenWhereBuilder(string hoSoTableName)
    {
        ThuTucDvcTrucTuyen = $"{donViThuTucTableName}.MucDo IN ('{tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN}','{tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH}') ";
        ThuTucDvcTrucTuyenMotPhan = $"{donViThuTucTableName}.MucDo = '{tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN}' ";
        ThuTucDvcTrucTuyenToanTrinh = $"{donViThuTucTableName}.MucDo = '{tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH}' ";

        ThuTucPhatSinhHoSo = $"{hoSoTableName}.MaTTHC IS NOT NULL ";
        TongHoSoPhatSinh = $"{hoSoTableName}.KenhThucHien IN ('{tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TIEP}', '{tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN}') ";

        ThuTucTrucTuyenPhatSinhHoSo = $"{donViThuTucTableName}.MucDo IN ('{tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN}','{tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH}') ";
        HoSoPhatSinhTrongThuTucTrucTuyen = $"{ThuTucTrucTuyenPhatSinhHoSo} AND {hoSoTableName}.KenhThucHien IN ('{tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TIEP}', '{tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN}') ";
        HoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen = $"{ThuTucTrucTuyenPhatSinhHoSo} AND {hoSoTableName}.KenhThucHien = '{tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN}' ";

        ThuTucToanTrinhPhatSinhHoSo = $"{donViThuTucTableName}.MucDo = '{tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH}' ";
        HoSoPhatSinhTrongThuTucToanTrinh = $"{ThuTucToanTrinhPhatSinhHoSo} AND {hoSoTableName}.KenhThucHien IN ('{tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TIEP}', '{tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN}') ";
        HoSoPhatSinhTrucTuyenTrongThuTucToanTrinh = $"{ThuTucToanTrinhPhatSinhHoSo} AND {hoSoTableName}.KenhThucHien = '{tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN}' ";

        ThuTucMotPhanPhatSinhHoSo = $"{donViThuTucTableName}.MucDo = '{tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN}' ";
        HoSoPhatSinhTrongThuTucMotPhan = $"{ThuTucMotPhanPhatSinhHoSo} AND {hoSoTableName}.KenhThucHien IN ('{tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TIEP}', '{tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN}') ";
        HoSoPhatSinhTrucTuyenTrongThuTucMotPhan = $"{ThuTucMotPhanPhatSinhHoSo} AND {hoSoTableName}.KenhThucHien = '{tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN}' ";

        ThuTucDvc = $"{donViThuTucTableName}.MucDo = '{tiepNhanHoSoTrucTuyenConstants.MUC_DO.DVC}' ";
        ThuTucDvcPhatSinhHoSo = $"{donViThuTucTableName}.MucDo = '{tiepNhanHoSoTrucTuyenConstants.MUC_DO.DVC}' ";
        HoSoPhatSinhTrongThuTucDvc = $"{donViThuTucTableName}.MucDo = '{tiepNhanHoSoTrucTuyenConstants.MUC_DO.DVC}' ";
    }
}
