using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Business.MauPhoiApp;
public class MauPhoiDto : IDto
{
    public Guid Id { get; set; }
    public string? LoaiPhoi { get; set; }
    public string? Code { get; set; }
    public string? TenMauPhoi { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaLinhVuc { get; set; }
    public string? MaThuTuc { get; set; }
    public string? UrlMauPhoi { get; set; }
    public string? HtmlPhoi { get; set; }
    public bool? LaPhoiEmail { get; set; }
    public bool? LaPhoiMacDinh { get; set; }
    public string? CustomerId { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}

