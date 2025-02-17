
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Common.NEAC;
public interface INEACService : ITransientService
{
    Task<NEACGetCertificateResponse?> GetCertificate(NEACGetCertificateRequest req, CancellationToken cancellationToken);
    Task<Result<string>?> SignFile(NEACSignFileRequest req, CancellationToken cancellationToken);
    Task<PaginationResponse<KySoNEAC>> GetDatas(NeacGetDataRequest request, CancellationToken cancellationToken);
}

public class NeacGetDataRequest : PaginationFilter
{
    public string? NgayKyFrom { get; set; }
    public string? NgayKyTo { get; set; }
    public string? CaName { get; set; }
}