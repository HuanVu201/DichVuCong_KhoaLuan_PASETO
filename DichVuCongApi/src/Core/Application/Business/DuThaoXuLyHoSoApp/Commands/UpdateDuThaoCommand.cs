using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Commands;
public sealed class UpdateDuThaoCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? FileDinhKem { get; set; }
    public string? TrichYeu { get; set; }
    public DateTime? NgayHenTraMoi { get; set; }
    public string? TenLanhDaoKy { get; set; }
    public string? TaiKhoanLanhDaoKy { get; set; }

}