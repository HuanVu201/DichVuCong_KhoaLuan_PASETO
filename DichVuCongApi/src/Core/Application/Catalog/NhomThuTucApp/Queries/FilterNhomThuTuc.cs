using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.NhomThuTucApp;
using Newtonsoft.Json;


namespace TD.DichVuCongApi.Application.Catalog.NhomThuTucApp.Queries;
public class FilterNhomThuTuc : PaginationFilter, IRequest<PaginationResponse<FilterNhomThuTucDto>>
{
    public string? MaNhomThuTuc { get; set; }
    public bool? HasThuTuc { get; set; }
    public bool? HasThuTucCapTinh { get; set; }
    public bool? HasThuTucCapHuyen { get; set; }
    public bool? HasThuTucCapXa { get; set; }
    public string? DonViId { get; set; }
    public string? DoiTuongThucHien { get; set; }
    public string? MucDo { get; set; }
    public string? TuKhoa { get; set; }
    public bool? ThucHienTaiBoPhanMotCua { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;


}
