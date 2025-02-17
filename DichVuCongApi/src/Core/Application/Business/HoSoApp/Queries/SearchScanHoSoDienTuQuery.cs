using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class SearchScanHoSoDienTuQuery : PaginationFilter, IRequest<PaginationResponse<HoSoDto>>
{
    public string? SearchKeys {  get; set; }
    public bool? chuaDinhKemThanhPhan {  get; set; }
    public string? ThuTucId {  get; set; }
    public bool? daKySo {  get; set; }
    public DateTime? NopHoSoTuNgay { get; set; }
    public DateTime? NopHoSoDenNgay { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
