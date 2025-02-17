using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class GetThongTinTraKetQuaHccQuery : IQuery<object>
{
    [JsonIgnore]
    public DefaultIdType Id { get; set; }
}