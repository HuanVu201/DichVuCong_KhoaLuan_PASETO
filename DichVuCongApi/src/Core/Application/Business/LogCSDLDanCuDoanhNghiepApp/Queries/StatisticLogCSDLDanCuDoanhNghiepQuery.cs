using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Statistics.HoSo;

namespace TD.DichVuCongApi.Application.Business.LogCSDLDanCuDoanhNghiepApp.Queries;
public class StatisticLogCSDLDanCuDoanhNghiepQuery : PaginationFilter, IRequest<PaginationResponse<StatisticLogCSDLDanCuDoanhNghiepDto>>
{
    public string? TaiKhoan {  get; set; }
    public string? DonViId {  get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}

