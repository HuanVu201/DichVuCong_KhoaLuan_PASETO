using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.LienThongNVTCDVCQuocGiaApp.ChungTuThueApp;
public class AddChungTuThueCommand : ICommand<Guid>
{
    public DefaultIdType HoSoId { get; set; }
    public string Nguon { get; set; } = string.Empty;
    public string MaSoThue { get; set; } = string.Empty;
    public double SoTien { get; set; }
    public string NoiDungThanhToan { get; set; } = string.Empty;
    public DateTime ThoiGianThanhToan { get; set; }
    public string MaThongBaoThue { get; set; } = string.Empty;
    public bool TrangThaiThanhToan { get; set; }
    public string BienLai { get; set; } = string.Empty;
    public string SoCMTNguoiNopTien { get; set; } = string.Empty;
    public string HoTenNguoiNopTien { get; set; } = string.Empty;
    public string TinhNguoiNopTien { get; set; } = string.Empty;
    public string HuyenNguoiNopTien { get; set; } = string.Empty;
    public string XaNguoiNopTien { get; set; } = string.Empty;
    public string DiaChiNguoiNopTien { get; set; } = string.Empty;
}
