using TD.DichVuCongApi.Application.Common.ServiceLogger;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Infrastructure.KetNoi.LienThongILIS;
using static TD.DichVuCongApi.Application.Common.KetNoi.LienThongILIS.LienThongILISParams;

namespace TD.DichVuCongApi.Application.Common.KetNoi.LienThongILIS;
public interface ILienThongILISService : ITransientService, IEnableServiceLogger
{
    Task<GetTokenResponse> GetToken(CancellationToken cancellationToken = default);
    Task<TiepNhanHoSoResponse> SendData(HoSo hoSo);
    Task CapNhatKetQua();
    void CheckConfig();
    Task Log(ServiceLoggerRequestParams req);
    Task<string> DownloadFile(string fileUrl);
    string GetCodeGet();
}
