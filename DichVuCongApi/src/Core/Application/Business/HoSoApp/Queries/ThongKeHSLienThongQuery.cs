using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;


namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class ThongKeHSLienThongQuery : PaginationFilter, IRequest<PaginationResponse<ThongKeHSLienThongDto>>
{
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public string? Catalog { get; set; }
    public bool? BaoGomDonViCon { get; set; } = false;
    public bool? ChiBaoGomDonViCon { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public bool? Removed { get; set; } = false;

    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
