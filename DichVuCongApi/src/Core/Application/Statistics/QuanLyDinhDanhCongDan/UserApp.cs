using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;
public class UserApp
{
    public string? FullName { get; set; }
    public string? TypeUser { get; set; }
    public int UserOrder { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? SoCMND { get; set; }
    public string? GioiTinh { get; set; }
    public string? NamSinh { get; set; }
    public string? NgayThangNamSinh { get; set; }
    public string? DanToc { get; set; }
    public string? QuocTich { get; set; }
    public string? HoVaTen { get; set; }
    public string? UserInfoDVCQG { get; set; }
    public bool? TaiKhoanHeThongQLVB { get; set; } = false;
    public bool? DaXacThucCSDLDC { get; set; }
}
