using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.TTHC;
public class ThongKeTTHCWhereBuilder
{
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
    public string TongTTHC { get; set; }
    public string TongTTHCTrucTuyen { get; set; }
    public string TTHCTrucTuyenToanTrinh { get; set; } 
    public string TTHCTrucTuyenMotPhan { get; set; } 
    public string TTHCConLai { get; set; } 
    public string TongTTHCThuPhi { get; set; } 
    public string TTHCThuPhiTrucTuyenToanTrinh { get; set; } 
    public string TTHCThuPhiTrucTuyenMotPhan { get; set; } 
    public string TTHCThuPhiConLai { get; set; }
    public string TongTTHCDvc { get; set; }
    public ThongKeTTHCWhereBuilder()
    {
        TongTTHCTrucTuyen = $"{thuTucTableName}.MucDo IN ( '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH}','{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN}' )";
        TongTTHCDvc = $"{thuTucTableName}.MucDo = '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.DVC}' ";
        TTHCTrucTuyenToanTrinh = $"{thuTucTableName}.MucDo = '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH}' ";
        TTHCTrucTuyenMotPhan = $"{thuTucTableName}.MucDo = '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN}' ";
        TTHCConLai = $"{thuTucTableName}.MucDo NOT IN ('{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.TOAN_TRINH}', '{_tiepNhanHoSoTrucTuyenConstants.MUC_DO.MOT_PHAN}')";
        TongTTHCThuPhi = $"{thuTucTableName}.TrangThaiPhiLePhi =1";
        TTHCThuPhiTrucTuyenToanTrinh = $"{TongTTHCThuPhi} AND {TTHCTrucTuyenToanTrinh}";
        TTHCThuPhiTrucTuyenMotPhan = $"{TongTTHCThuPhi} AND {TTHCTrucTuyenMotPhan}";
        TTHCThuPhiConLai = $"{TongTTHCThuPhi} AND {TTHCConLai}";
    }
}
