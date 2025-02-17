using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Infrastructure.KetNoi.BGTVT;
public class GPLXSetting
{
    public string MaDonVi { get; set; }
    public string SyncApiUrl { get; set; }
    public string UserName { get; set; }
    public string? Token { get; set; }
    public string Password { get; set; }
    public string MaDonViXuLy { get; set; }
    public bool Enable { get; set; }
}
