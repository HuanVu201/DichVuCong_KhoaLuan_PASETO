using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
public class AddThanhPhanHoSoCommand : ICommand<DefaultIdType>
{
    public string? Ten { get; set; }
    public string? HoSo { get; set; }
    public string? MaGiayToKhoQuocGia { get; set; }
    public string? MaGiayToSoHoa { get; set; }
    public string? TrangThaiSoHoa { get; set; }
    public string? MaGiayTo { get; set; }
    public bool? DuocLayTuKhoDMQuocGia { get; set; }
    public string? MaKetQuaThayThe { get; set; }
    public string? DinhKem { get; set; }
    public bool? NhanBanGiay { get; set; } = false;
    public int? SoBanChinh { get; set; }
    public int? SoBanSao { get; set; }
    public int? SoTrang { get; set; }
    public int? SoBanGiay { get; set; }
    public bool? KyDienTuBanGiay { get; set; }
    public string? TrangThaiDuyet { get; set; }
}
