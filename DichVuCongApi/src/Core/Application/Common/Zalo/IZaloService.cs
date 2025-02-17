using TD.DichVuCongApi.Application.Catalog.ConfigApp;
using TD.DichVuCongApi.Application.Common.ServiceLogger;

namespace TD.DichVuCongApi.Application.Common.Zalo;
public interface IZaloService : ITransientService, IEnableServiceLogger
{
    public Task SendTextAsync(ZaloRequest zaloRequest, CancellationToken cancellationToken);
    public Task SendTemplateAsync(SendTemplateZalo zaloRequest, CancellationToken cancellationToken);
    public Task RefreshTokenZalo();
    string GetZaloCtaLink(string path);
    public Task SendTemplateOrTextAsync(ZaloRequest zaloRequest, SendTemplateZalo sendTemplateZalo, CancellationToken cancellationToken);

}
