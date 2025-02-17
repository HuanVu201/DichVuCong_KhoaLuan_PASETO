using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.KhoTaiLieuDienTuApp.Commands;
public sealed class UpdateKhoTaiLieuDienTuCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? TenKhoTaiLieu { get; set; }
    public string? MoTa { get; set; }
    public double? DungLuong { get; set; }
    public int? SoLuong { get; set; }
}
