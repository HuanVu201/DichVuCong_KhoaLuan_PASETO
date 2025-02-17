using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;


namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;
public class AddMultiDonViThuTuc : ICommand
{
    public List<string> IdDonVis { get; set; }
    public List<string> maTTHCs { get; set; }
    public string? MucDo { get; set; }
    public string? NguoiTiepNhanId { get; set; }
    public List<string>? nhomNguoiDungs { get; set; }
    public string? UrlRedirect { get; set; }
    public string? MaSoThue { get; set; }
    public string? DonViMaSoThue { get; set; }
    public DefaultIdType? TaiKhoanThuHuongId { get; set; }
}

