namespace TD.DichVuCongApi.Application.Common.KetNoi.BGTVT;
public interface ISyncBGTVTService : ITransientService
{
    Task SyncData();
    Task SyncDataManual(SyncDataManualRequest req);
}

public class SyncDataManualRequest
{
    public string From { get; set; }
    public string To { get; set; }
}