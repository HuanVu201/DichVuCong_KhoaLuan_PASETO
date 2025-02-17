using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
public class GetUrlMauPhoiDefaultQuery : IRequest<string>
{
    public string? LoaiPhoi { get; set; } = "mau-phoi-phieu";
    public string? Code { get; set; }
}