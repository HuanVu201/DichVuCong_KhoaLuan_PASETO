using TD.DichVuCongApi.Application.Common.ServiceLogger;

namespace TD.DichVuCongApi.Application.Common.Mailing;

public interface IMailService : ITransientService, IEnableServiceLogger
{
    Task SendAsync(MailRequest request, CancellationToken ct);
    string FormatContentWithEntity(object entity, string content);
}