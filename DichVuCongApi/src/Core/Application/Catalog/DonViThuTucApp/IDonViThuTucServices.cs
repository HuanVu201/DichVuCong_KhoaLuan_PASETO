

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp;
public interface IDonViThuTucServices : ITransientService
{
    Task<DonViThuTucDetail> GetBy(string donViId, string maTTHC);
}
