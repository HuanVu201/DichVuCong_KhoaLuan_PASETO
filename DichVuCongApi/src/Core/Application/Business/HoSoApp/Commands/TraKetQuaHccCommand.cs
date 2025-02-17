using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class TraKetQuaHccCommand : ICommand
{
    public List<string> Ids { get; set; }
    public string? LoaiNguoiNhanKetQua { get; set; }
    public string? HoTenNguoiNhanKetQua { get; set; }
    public string? BanGocThuLai { get; set; }
    public string? SoLuongBanGocThuLai { get; set; }
    public string? DinhKemNhanKetQua { get; set; }
    public string? ChuKyNguoiNhanKetQua { get; set; }
    public string? DinhKemKetQua { get; set; }
    public string? TrichYeuKetQua { get; set; }
}
