using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Catalog.LogAuthen.Queries;

public class GetLogAuthenQuery : IRequest<LogAuthenDetailDto>
{
    [JsonIgnore]
    public Guid Id { get; set; }
}