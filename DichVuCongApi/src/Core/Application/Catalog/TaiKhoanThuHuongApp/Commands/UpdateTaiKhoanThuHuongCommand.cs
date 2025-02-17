using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.TaiKhoanThuHuongApp.Commands;
public sealed class UpdateTaiKhoanThuHuongCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? TKThuHuong { get; set; }
    public string? DonViId { get; set; }
    public string? MaNHThuHuong { get; set; }
    public string? TenTKThuHuong { get; set; }
    public string? MoTa { get; set; }
}
