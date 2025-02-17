using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.TongHopThuTuc;
public class TongHopThuTucPhatSinhHoSoWhereBuilder
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    public string TiepNhanTrucTiep { get; set; }

    public string TiepNhanTrucTuyen { get; set; }
    public string TiepNhanBCCI { get; set; }
    public string TraKetQuaQuaBCCI { get; set; }
    public string TongTiepNhan { get; set; }
    public TongHopThuTucPhatSinhHoSoWhereBuilder()
    {
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        TiepNhanTrucTiep = $" {hoSoTableName}.KenhThucHien = '{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TIEP}' ";
        TiepNhanTrucTuyen = $" {hoSoTableName}.KenhThucHien = '{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN}' ";
        TiepNhanBCCI = $" {hoSoTableName}.KenhThucHien = '{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.BCCI}' ";
        TraKetQuaQuaBCCI = $"{hoSoTableName}.DangKyNhanHoSoQuaBCCIData  IS NOT NULL AND {hoSoTableName}.DangKyNhanHoSoQuaBCCIData != '' ";
    }
}
