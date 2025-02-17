using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.KhoLuuTruCongDanApp.Commands;
public class UpdateKhoLuuTruCongDanCommand : ICommand<Guid>
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public double? DungLuong { get; set; }
    public int? SoLuong { get; set; }
    public DefaultIdType? KhoLuuTruId { get; set; }
}