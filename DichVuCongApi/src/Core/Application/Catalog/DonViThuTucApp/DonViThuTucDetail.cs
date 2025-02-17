using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp;
public class DonViThuTucDetail
{
    public Guid? Id { get; set; }
    public string? MaTTHC { get; set; }
    public string? DonViId { get; set; }
    public string? NguoiTiepNhanId { get; set; }
    public Guid? TaiKhoanThuHuongId { get; set; }
    public string? GroupName { get; set; }
    public string? UrlRedirect { get; set; }
    public bool? BatBuoc { get; set; }
    public string? MucDo { get; set; }
    public string? MaSoThue { get; set; }
    public string? DonViMaSoThue { get; set; }
    public string? TKThuHuong { get; set; }
    public string? MaNHThuHuong { get; set; }
    public string? TenTKThuHuong { get; set; }
}
