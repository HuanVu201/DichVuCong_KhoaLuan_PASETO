using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Dtos;
using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Queries;
public class SearchDuThaoXuLyHoSoQuery : PaginationFilter, IRequest<PaginationResponse<DuThaoXuLyHoSoDto>> 
{
    public string? MaLinhVucChinh { get; set; }
    public string? TiepNhanFrom { get; set; }
    public string? TiepNhanTo { get; set; }
    public string? HenTraFrom { get; set; }
    public string? HenTraTo { get; set; }
    public string? MaTrangThai { get; set; }
    public string? SearchKeys { get; set; }
    public string? LoaiDuThao { get; set; }
    public string? TrangThaiDuThao { get; set; }
    public string? NguoiXuLy { get; set; }
    public string? LanhDaoThongQua { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
