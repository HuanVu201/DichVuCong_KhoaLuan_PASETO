using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Common;
public interface IGenerateMaHoSo : IScopedService
{
    Task<string> GenerateMaHoSo(string madinhDanh, CancellationToken cancellationToken);
}
