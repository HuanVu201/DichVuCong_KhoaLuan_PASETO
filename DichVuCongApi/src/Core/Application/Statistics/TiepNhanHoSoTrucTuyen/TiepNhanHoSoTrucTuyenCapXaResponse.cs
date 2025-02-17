using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSo;

namespace TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;
public class TiepNhanHoSoTrucTuyenCapXaResponse
{
    public TiepNhanHoSoTrucTuyenCapXaResponse()
    {
        data = new List<TiepNhanHoSoTrucTuyenCapXaElm>();
    }
    public TiepNhanHoSoTrucTuyenCapXaResponse(List<TiepNhanHoSoTrucTuyenCapXaElm> _data)
    {
        data = _data;
    }
    public List<TiepNhanHoSoTrucTuyenCapXaElm> data { get; set; }
}
public class TiepNhanHoSoTrucTuyenCapXaElm
{
    public TiepNhanHoSoTrucTuyenCapXaElm()
    {
        ThanhPhan = new List<TiepNhanHoSoTrucTuyenCapXaElm>();
    }

    public TiepNhanHoSoTrucTuyenCapXaElm(string maDonVi, string tenDonVi)
    {
        MaDonVi = maDonVi;
        TenDonVi = tenDonVi;
        ThanhPhan = new List<TiepNhanHoSoTrucTuyenCapXaElm>();
    }

    public TiepNhanHoSoTrucTuyenCapXaElm(string maDonVi, string mucDo, int tongTrucTiep, int tongTrucTuyen, int tongBCCI, int tongSo)
    {
        MaDonVi = maDonVi;
        MucDo = mucDo;
        TongSo = tongSo;
        TongTrucTuyen = tongTrucTuyen;
        TongTrucTiep = tongTrucTiep;
        TongBCCI = tongBCCI;
        ThanhPhan = new List<TiepNhanHoSoTrucTuyenCapXaElm>();
    }
    public string MaDonVi { get; set; }
    public string TenDonVi { get; set; }
    public int TongSo { get; set; } = 0;
    public int TongTrucTuyen { get; set; } = 0;
    public int TongTrucTiep { get; set; } = 0;
    public int TongBCCI { get; set; } = 0;
    public int TongToanTrinh { get; set; } = 0;
    public int TongToanTrinhTrucTuyen { get; set; } = 0;
    public int TongToanTrinhTrucTiep { get; set; } = 0;
    public int TongToanTrinhBCCI { get; set; } = 0;
    public int TongMotPhan { get; set; } = 0;
    public int TongMotPhanTrucTuyen { get; set; } = 0;
    public int TongMotPhanTrucTiep { get; set; } = 0;
    public int TongMotPhanBCCI { get; set; } = 0;
    [JsonIgnore]
    public string? MucDo { get; set; }
    public List<TiepNhanHoSoTrucTuyenCapXaElm> ThanhPhan { get; set; }

}