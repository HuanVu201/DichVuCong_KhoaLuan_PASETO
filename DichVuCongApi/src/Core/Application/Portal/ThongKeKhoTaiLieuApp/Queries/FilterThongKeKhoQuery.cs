using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

namespace TD.DichVuCongApi.Application.Portal.ThongKeKhoTaiLieuApp.Queries;
public class FilterThongKeKhoQuery : PaginationFilter, IRequest<PaginationResponse<ThongKeKhoTaiLieuDto>>
{
    public string? DoiTuong { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? UserName { get; set; }
    public string? FullName { get; set; }
    public string? PhoneNumber { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }

    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
