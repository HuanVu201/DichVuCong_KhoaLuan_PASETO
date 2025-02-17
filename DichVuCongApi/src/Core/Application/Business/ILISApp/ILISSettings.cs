using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.ILISApp;
public class ILISSettings
{
    public string? SecurityCode { get; set; }
    public string? DownloadFileUrl { get; set; }
    public string? BaseUrl { get; set; }
    public string? GetTokenUrl { get; set; }
    public string? ClientSecret { get; set; }
    public string? ClientId { get; set; }
    public string? UserName { get; set; }
    public string? Password { get; set; }
}
