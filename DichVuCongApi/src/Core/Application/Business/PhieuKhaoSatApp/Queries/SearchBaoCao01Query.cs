using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.PhiLePhiApp;
using Newtonsoft.Json;


namespace TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Queries;
public class SearchBaoCao01Query : PaginationFilter, IRequest<PaginationResponse<BaoCao01Dto>>
{
    public string? DonVi { get; set; }
    public string? Quy { get; set; }
    public string? Nam { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
