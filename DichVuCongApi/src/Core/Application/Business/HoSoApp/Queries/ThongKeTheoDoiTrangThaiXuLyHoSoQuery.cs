using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using Newtonsoft.Json;


namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class ThongKeTheoDoiTrangThaiXuLyHoSoQuery : PaginationFilter, IRequest<PaginationResponse<ThongKeTheoDoiTrangThaiXuLyHoSoDto>>
{
    public DateTime? NopHoSoTuNgay { get; set; }
    public DateTime? NopHoSoDenNgay { get; set; }
    public DateTime? TiepNhanTuNgay { get; set; }
    public DateTime? TiepNhanDenNgay { get; set; }
    public string? Catalog { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? KenhThucHien { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public bool? Removed { get; set; } = false;

    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
