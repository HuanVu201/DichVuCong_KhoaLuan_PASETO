using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Statistics.TiepNhanHoSo;
public class TiepNhanHoSoTrucTuyenResponse
{
    public TiepNhanHoSoTrucTuyenResponse()
    {
        data = new List<TiepNhanHoSoTrucTuyenElm>();
    }
    public TiepNhanHoSoTrucTuyenResponse(List<TiepNhanHoSoTrucTuyenElm> _data)
    {
        data = _data;
    }
    public List<TiepNhanHoSoTrucTuyenElm> data { get; set; }
}
public class TiepNhanHoSoTrucTuyenElm
{
    public TiepNhanHoSoTrucTuyenElm()
    {
    }

    public TiepNhanHoSoTrucTuyenElm(string maDonVi, string tenDonVi)
    {
        MaDonVi = maDonVi;
        TenDonVi = tenDonVi;
    }

    public TiepNhanHoSoTrucTuyenElm(string maDonVi, string mucDo, int tongTrucTiep, int tongTrucTuyen, int tongBCCI, int tongSo)
    {
        MaDonVi = maDonVi;
        MucDo = mucDo;
        TongSo = tongSo;
        TongTrucTuyen = tongTrucTuyen;
        TongTrucTiep = tongTrucTiep;
        TongBCCI = tongBCCI;
    }
    public string MaDonVi { get; set; }
    public string TenDonVi { get; set; }
    public string? Catalog { get; set; }
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
    public int TongDvc { get; set; } = 0;
    public int TongDvcTrucTuyen { get; set; } = 0;
    public int TongDvcTrucTiep { get; set; } = 0;
    public int TongDvcBCCI { get; set; } = 0;
    [JsonIgnore]
    public string? MucDo { get; set; }

}
