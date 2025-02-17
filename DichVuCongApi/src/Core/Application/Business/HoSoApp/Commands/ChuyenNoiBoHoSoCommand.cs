using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ChuyenNoiBoHoSoCommand : ICommand
{
    [JsonIgnore]
    public Guid Id { get; set; }
    public string ChuyenToiNguoiDungIds { get; set; }
    public string? YKienNguoiChuyenXuLy { get; set; }
    public string? DinhKemYKienNguoiChuyenXuLy { get; set; }
}

