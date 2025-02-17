using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DichVuCongApi.Domain.Business;
public class HoSoLienThong : BaseEntity, IAggregateRoot
{
    [MaxLength(50)]
    public string MaHoSo { get; private set; }

    public string Data { get; private set; }
    public bool? DaChuyenThanhCong { get; private set; }
    public HoSoLienThong() { }
    public HoSoLienThong(string maHoSo, string data)
    {
        MaHoSo = maHoSo;
        Data = data;
    }
    public HoSoLienThong SetJsonData(string data)
    {
        Data = data;
        return this;
    }
    public void SetDaChuyenThanhCong()
    {
        DaChuyenThanhCong = true;
    }
}
