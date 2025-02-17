using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Dto;
namespace TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Queries;
public class SearchThanhPhanChungThucQuery : PaginationFilter, IRequest<PaginationResponse<ThanhPhanHoSoChungThucDto>>
{
    public string? Ten { get; set; }
    public string? HoSo { get; set; }
    public string? MaGiayToKhoQuocGia { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
