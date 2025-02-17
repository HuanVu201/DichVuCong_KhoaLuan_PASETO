using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Application.Catalog.LinhVucApp;


namespace TD.DichVuCongApi.Application.Catalog.LinhVucApp.Queries;
public class SearchLinhVucTheoCanBoQuery : PaginationFilter, IRequest<PaginationResponse<LinhVucDto>>
{
    public string? NguoiTiepNhanId { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
