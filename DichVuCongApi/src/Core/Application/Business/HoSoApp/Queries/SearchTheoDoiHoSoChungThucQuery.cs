using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class SearchTheoDoiHoSoChungThucQuery : PaginationFilter, IRequest<PaginationResponse<TheoDoiHoSoChungThucDto>>
{
    public string? MaChungThuc {  get; set; }
    public string? SoChungThuc {  get; set; }
    public string? LoaiDoiTuong {  get; set; }
    public string? SearchKeys {  get; set; }
    public string? SoCCCD {  get; set; }
    public string? TrangThai {  get; set; }
    public DateTime? NopHoSoTuNgay { get; set; }
    public DateTime? NopHoSoDenNgay { get; set; }
    public string? TTHC {  get; set; }
    public bool? Removed { get; set; } = false;

    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
