using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuSoHoa;
public class QuyetDinh766ChiTieuSoHoaWhereBuilder
{
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly string thanhPhanHoSoTableName = "[Business].[ThanhPhanHoSos]";
    public readonly string TRANG_THAI_TIEP_NHAN = "'2','4','5','6','8','7','9','10'";
    public readonly string TRANG_THAI_DA_XU_LY = "'7','9','10'";
    public readonly string TRANG_THAI_SO_HOA = "'2','3'";
    public string TiepNhan { get; set; }
    public string ChuaSoHoaTPHS { get; set; }
    public string CoSoHoaTPHS { get; set; }
    public string CoTaiSuDungTPHS { get; set; }
    public string CoTaiSuDungTPHSTuDvcQg { get; set; }
    public string DaGiaiQuyet { get; set; }
    public string DaGiaiQuyetChuaSoHoa { get; set; }
    public string DaGiaiQuyetDaSoHoa { get; set; }
    public QuyetDinh766ChiTieuSoHoaWhereBuilder(string hoSoTableName)
    {
        TiepNhan = $"{hoSoTableName}.TrangThaiHoSoId IN ({TRANG_THAI_TIEP_NHAN}) ";
        ChuaSoHoaTPHS = $"{TiepNhan} AND {thanhPhanHoSoTableName}.HoSo IS NULL ";
        CoSoHoaTPHS = $"{TiepNhan} AND {thanhPhanHoSoTableName}.HoSo IS NOT NULL ";
        CoTaiSuDungTPHS = $"{CoSoHoaTPHS} AND {thanhPhanHoSoTableName}.TrangThaiSoHoa IN ({TRANG_THAI_SO_HOA}) ";
        CoTaiSuDungTPHSTuDvcQg = $"{CoTaiSuDungTPHS} AND {thanhPhanHoSoTableName}.DuocLayTuKhoDMQuocGia = 1 ";
        DaGiaiQuyet = $"{hoSoTableName}.TrangThaiHoSoId IN ({TRANG_THAI_DA_XU_LY}) ";
        DaGiaiQuyetChuaSoHoa = $"{DaGiaiQuyet} AND ({hoSoTableName}.DinhKemKetQua IS NULL OR {hoSoTableName}.DinhKemKetQua = '' ) ";
        DaGiaiQuyetDaSoHoa = $"{DaGiaiQuyet} AND (({hoSoTableName}.DinhKemKetQua IS NOT NULL AND {hoSoTableName}.DinhKemKetQua != '') OR ({thuTucTableName}.ThuTucKhongCoKetQua = 1))";
    }
}
