using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Business.LogSendEmailApp.Queries;


public class SearchLogSendEmail : PaginationFilter, IRequest<PaginationResponse<LogSendEmailDto>>
{
    public string? Service { get; set; }
    public string? Sender { get; set; }
    public string? Receiver { get; set; }
    public bool? IsSucceed { get; set; }
    public string? Request { get; set; }
    public string? Response { get; set; }
    public string MaHoSo { get; set; }

    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
