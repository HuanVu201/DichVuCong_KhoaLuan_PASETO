using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhXuLyHoSoApp.Queries;


public class SearchQuaTrinhXuLyHoSoQuery : PaginationFilter, IRequest<PaginationResponse<QuaTrinhXuLyHoSoDto>>
{
    public string? NguoiGui { get; set; }
    public string MaHoSo { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
