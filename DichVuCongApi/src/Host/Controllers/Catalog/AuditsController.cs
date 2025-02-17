using TD.DichVuCongApi.Application.Auditing;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;

public class AuditsController : VersionedApiController
{
    private readonly IAuditService _auditService;
    public AuditsController(IAuditService auditService) => _auditService = auditService;

    [HttpPost("search")]
    [OpenApiOperation("Danh sách nhat ky he thong.", "")]
    public Task<PaginationResponse<AuditDto>> SearchAsync(AuditListFilter request, CancellationToken cancellationToken)
    {
        return _auditService.SearchAsync(request, cancellationToken);
    }

    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa nhat ky he thong.", "")]
    public Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        return _auditService.DeleteAsync(id, cancellationToken);
    }
}