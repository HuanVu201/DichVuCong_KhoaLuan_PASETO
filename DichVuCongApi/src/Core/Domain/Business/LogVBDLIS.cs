namespace TD.DichVuCongApi.Domain.Business;
public class LogVBDLIS : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    public LogVBDLIS(string api, string maHoSo, string body, string? response = null)
    {
        Api = api;
        MaHoSo = maHoSo;
        Body = body;
        Response = response;
    }

    public string Api { get; set; }
    public string MaHoSo { get; set; }
    public string Body { get; set; }
    public string? Response { get; set; }
    public static LogVBDLIS Create(string api, string maHoSo, string body, string? response = null)
    {
        return new LogVBDLIS(api, maHoSo, body, response);

    }
}
