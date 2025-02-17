using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Statistics.ThongKeIOC.Dto;

namespace TD.DichVuCongApi.Application.Statistics.ThongKeIOC;
public class ThongKeHoSoTheoNgayQuery : IRequest<ThongKeHoSoTheoNgayResponse<ThongKeHoSoTheoNgayDto>>
{
    public DateTime? Ngay { get; set; }

    public string? Catalog { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? KenhThucHien { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 50;
    public new int PageNumber { get; set; } = 1;
}
