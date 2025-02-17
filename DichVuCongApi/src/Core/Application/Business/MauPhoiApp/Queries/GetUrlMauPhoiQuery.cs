using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
public class GetUrlMauPhoiQuery : IRequest<string>
{
    public string? LoaiPhoi { get; set; } = "mau-phoi-phieu";
    public string? Code { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaLinhVuc { get; set; }
    public string? MaThuTuc { get; set; }
}
