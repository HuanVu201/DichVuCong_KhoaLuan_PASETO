using System.ComponentModel.DataAnnotations;

namespace TD.DichVuCongApi.Domain.Identity;
public class UserVBDLIS : AuditableEntity<DefaultIdType>, IAggregateRoot
{

    [MaxLength(255)]
    public string UserName { get; set; }
    public string FullName { get; set; }
    public string? PositionCode { get; set; }
    [MaxLength(255)]
    public string? GroupCode { get; set; }
    public string? GroupName { get; set; }
}