namespace TD.DichVuCongApi.Domain.Catalog;
public class BrandNameSMS : BaseEntity<DefaultIdType>, IAggregateRoot
{
    public string GroupCode { get; private set; }
    public bool IsDefault { get; private set; } = false;
}
