namespace TD.DichVuCongApi.Application.Common.KetNoi.BGTVT;
public interface IGPLXService :ITransientService
{
    Task<Result<string>> AddGPLX(GPLXParams req, CancellationToken cancellationToken = default);
    Task SyncGPLX();
    Task SyncDataManual(SyncDataManualRequest req);
}
