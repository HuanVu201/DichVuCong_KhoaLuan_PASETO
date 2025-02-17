using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class DatLaiNgayHenTraCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public DateTime NgayHenTra { get; set; }
}
