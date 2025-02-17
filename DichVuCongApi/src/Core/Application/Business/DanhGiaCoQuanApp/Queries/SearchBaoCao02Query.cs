using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp.Queries;
public class SearchBaoCao02Query : PaginationFilter, IRequest<PaginationResponse<DanhGiaCoQuanDto>>
{
    public string? Quy { get; set; }
    public string? Nam { get; set; }
    public string? DonVi { get; set; }
    public bool? Removed { get; set; } = false;

    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
