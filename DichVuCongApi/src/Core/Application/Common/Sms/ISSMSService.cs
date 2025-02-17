using TD.DichVuCongApi.Application.Common.Mailing;
using TD.DichVuCongApi.Application.Common.ServiceLogger;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Common.Sms;
public interface ISMSService: ITransientService, IEnableServiceLogger
{
    Task SendAsync(SMSRequest request, CancellationToken ct);
    Task SendJobWrapperAsync(SMSRequest request, string type, HoSo hoSo, CancellationToken ct);
}
