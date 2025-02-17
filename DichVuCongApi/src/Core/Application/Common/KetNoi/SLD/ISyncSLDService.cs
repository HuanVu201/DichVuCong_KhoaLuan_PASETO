using TD.DichVuCongApi.Application.Common.ServiceLogger;

namespace TD.DichVuCongApi.Application.Common.KetNoi.SLD;
public interface ISyncSLDService : ITransientService, IEnableServiceLogger
{
    Task PullData();
    Task Push1Data(string maHoSo);
    Task PushData();

}
