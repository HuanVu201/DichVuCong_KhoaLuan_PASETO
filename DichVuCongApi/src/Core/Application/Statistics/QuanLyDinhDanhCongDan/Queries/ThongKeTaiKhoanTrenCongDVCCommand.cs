using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

public class ThongKeTaiKhoanTrenCongDVCCommand : PaginationFilter, IRequest<PaginationResponse<UserAppDto>>
{
    public bool? DaDinhDanh { get; set; }
    public string? GioiTinh { get; set; }
    public string? DoTuoi { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 1000;
    public new int PageNumber { get; set; } = 1;
}