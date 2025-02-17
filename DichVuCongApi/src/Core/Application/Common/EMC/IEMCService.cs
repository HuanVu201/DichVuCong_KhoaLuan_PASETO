using TD.DichVuCongApi.Application.Common.ServiceLogger;

namespace TD.DichVuCongApi.Application.Common.EMC;
public interface IEMCService : ITransientService, IEnableServiceLogger
{
    Task SendAction(EMCRequestBody requestBody);
}
