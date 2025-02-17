using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.LogCSDLDanCuDoanhNghiepApp;
using Newtonsoft.Json;


namespace TD.DichVuCongApi.Application.Business.LogDeletedUserApp.Queries;
public class SearchLogDeletedUserQuery : PaginationFilter, IRequest<PaginationResponse<LogDeletedUserDto>>
{
    public string? FullName { get; set; }
    public string? UserName { get; set; }
    public string? Id { get; set; }
    public DateTime? ThoiGian { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }

    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
