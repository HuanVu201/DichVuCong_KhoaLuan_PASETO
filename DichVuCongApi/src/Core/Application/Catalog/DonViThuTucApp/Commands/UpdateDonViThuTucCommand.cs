using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;
public sealed class UpdateDonViThuTucCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? MaTTHC { get; set; }
    public string? DonViId { get; set; }
    public string? NguoiTiepNhanId { get; set; }
    public Guid? TaiKhoanThuHuongId { get; set; }
    public string? MucDo { get; set; }
    public string? UrlRedirect { get; set; }
    public string? MaSoThue { get; set; }
    public string? DonViMaSoThue { get; set; }
}
