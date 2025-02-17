using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Dtos;
using Newtonsoft.Json;


namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Queries;
public class StatisticHoSoChungThucQuery : IRequest<StatisticHoSoChungThucBaseDto>
{
    public bool? KyDienTuBanGiay { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public string? DonViId { get; set; }
    public DateTime? NgayChungThuc { get; set; } 
    public string? MaDinhDanh { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public string? MaDonViCha { get; set; }
    public string? Catalog { get; set; }
    public string? DonViQuanLy { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
    public bool? LaDuLieuThongKeCacNam { get; set; }
}
