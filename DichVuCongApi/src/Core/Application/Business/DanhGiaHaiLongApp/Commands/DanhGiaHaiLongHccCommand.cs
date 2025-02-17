using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Commands;
public class DanhGiaHaiLongHccCommand : ICommand
{
    public string? DanhGia { get; set; }
}
