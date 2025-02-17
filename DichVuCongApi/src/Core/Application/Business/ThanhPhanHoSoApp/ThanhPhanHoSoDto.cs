

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp;


public class ThanhPhanHoSoDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public DefaultIdType Id { get; set; }
    public string Ten { get; set; }
    public string HoSo { get; set; }
    public bool NhanBanGiay { get; set; }
    public int SoBanChinh { get; set; }
    public int SoBanSao { get; set; }
    public string DinhKem { get; set; }
    public string MaGiayToKhoQuocGia { get; set; }
    public string MaGiayToSoHoa { get;  set; }
    public string TrangThaiSoHoa { get;  set; }
    public string MaGiayTo { get; set; }
    //public string DuocLayTuKhoDMQuocGia { get;  set; }
    public string MaKetQuaThayThe { get; set; }
    public string Created { get; set; }
    public string NoiDungBoSung { get; set; }
    public int SoTrang { get; set; }
    public int SoBanGiay { get; set; }
    public bool DaChungThucDienTu { get; set; }
    public bool KyDienTuBanGiay { get; set; }
    public string TrangThaiDuyet { get; set; }


    [JsonIgnore]
    public int TotalCount { get; set; }
}
