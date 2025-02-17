using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Business.HuongDanNopHoSoApp.Queries;


public class SearchHuongDanNopHoSo : PaginationFilter, IRequest<PaginationResponse<HuongDanNopHoSoDto>>
{
   
    public string? TuKhoa { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
