using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class DatLaiQuyTrinhXuLyCommand : ICommand
{
    public string NodeQuyTrinhId { get; set; }
    public List<string> NguoiXuLys { get; set; }
    [JsonIgnore]
    public Guid? HoSoId { get; set; }

}
