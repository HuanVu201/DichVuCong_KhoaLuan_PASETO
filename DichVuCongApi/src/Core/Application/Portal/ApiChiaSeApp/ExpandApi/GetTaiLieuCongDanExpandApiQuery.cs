using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.ExpandApi;
public class GetTaiLieuCongDanExpandApiQuery : PaginationFilter, IRequest<Result<PaginationResponse<TaiLieuCongDanExpandApiResponse>>>
{
    public string CCCD { get; set; }
    public string? SecurityKey { get; set; }
    public bool? Removed { get; set; } = false;
    public string? ApiEx { get; set; } = "DanhSachTaiLieuCongDan";
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10000;
    public new int PageNumber { get; set; } = 1;
}

public class TaiLieuCongDanExpandApiResponse : IDto
{
    public DefaultIdType Id { get; set; }
    public string? TenGiayTo { get; set; }
    public double DungLuong { get; set; }
    public string? DuongDan { get; set; }
    public DateTime ThoiGianTao { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
