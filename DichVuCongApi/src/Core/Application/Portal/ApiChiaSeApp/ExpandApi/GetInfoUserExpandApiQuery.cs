using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.ExpandApi;
public class GetInfoUserExpandApiQuery : IRequest<Result<GetInfoUserExResponse>>
{
    public string CCCD { get; set; }
    public string? SecurityKey { get; set; }
    public bool? Removed { get; set; } = false;
    public string? ApiEx { get; set; } = "GetInfoUser";
}

public class GetInfoUserExResponse
{
    public string? HoVaTen { get; set; }
    public string? CCCD { get; set; }
    public string? GioiTinh { get; set; }
}
