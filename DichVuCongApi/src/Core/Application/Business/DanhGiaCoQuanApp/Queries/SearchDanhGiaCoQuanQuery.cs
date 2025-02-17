using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp;
using Newtonsoft.Json;


namespace TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp.Queries;
public class SearchDanhGiaCoQuanQuery : PaginationFilter, IRequest<PaginationResponse<DanhGiaCoQuanDto>>
{
    public string? Quy { get;  set; }
    public string? Nam { get;  set; }
    public string? DonVi { get;  set; }
    public string? MaDinhDanh { get;  set; }
    public string? MaDinhDanhCha { get;  set; }
    public bool? LayDonViCon { get;  set; }
    public string? Catalog { get;  set; }
    public bool? Removed { get; set; } = false;

    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
