using TD.DichVuCongApi.Application.Abstractions.Messaging;
using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp.Commands;
public sealed class DeleteListNguoiDungNhomNguoiDungCommand : ICommand
{
    public List<DefaultIdType>? Ids { get; set; }
    public bool? ForceDelete { get; set; } = true;
}
