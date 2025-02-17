using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;
public sealed class DelMultiDonViThuTuc : ICommand
{

    public List<string> Ids { get; set; }
    public bool ForceDelete { get; set; }
}
