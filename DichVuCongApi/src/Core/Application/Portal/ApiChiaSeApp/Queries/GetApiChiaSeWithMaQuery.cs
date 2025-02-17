using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Queries;

public class GetApiChiaSeWithMaQuery : IRequest<Result<GetApiChiaSeWithMaResponse>>
{
    public string MaApi { get; set; }
}

public class GetApiChiaSeWithMaResponse : APIChiaSe
{
    public DefaultIdType Id { get; set; }
}