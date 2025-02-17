using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;
public class UpdateMultiDonViThuTuc : ICommand
{
    public List<string>? Ids { get; set; }
    public string? NguoiTiepNhanId { get; set; }
    public string? MucDo { get; set; }
    public Guid? TaiKhoanThuHuongId { get; set; }
    public bool? LaBoSungNguoiTiepNhan { get; set; }
    public bool? LaBoNguoiTiepNhan { get; set; }
}
