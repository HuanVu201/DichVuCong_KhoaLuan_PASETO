using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public sealed class ConfirmDvcPaymentCommand : IRequest<ConfirmDvcPaymentResponse>
{
    public string LoaiBanTin { get; set; }
    public string MaLoi { get; set; }
    public string MaDoiTac { get; set; }
    public string MaThamChieu { get; set; }
    public int SoTien { get; set; }
    public string MaTienTe { get; set; }
    public string MaGiaoDich { get; set; }
    public string MaNganHang { get; set; }
    public string ThoiGianGD { get; set; }
    public string ThongTinGiaoDich { get; set; }
    public string MaXacThuc { get; set; }
    public bool? AutoCheck { get; set; } = false;
}
public sealed class ConfirmDvcPaymentResponse
{
    public string? MaLoi { get; set; }
    public string? MoTaLoi { get; set; }
    public string? MaDoiTac { get; set; }
    public string? MaThamChieu { get; set; }
    public string? ThoiGianGD { get; set; }
    public string? MaXacThuc { get; set; }
    public string? LoaiBanTin { get; set; }
    public int? SoTien { get; set; }
    public string? MaTienTe { get; set; }
    public string? MaGiaoDich { get; set; }
    public string? MaNganHang { get; set; }

    public string? ThongTinGiaoDich { get; set; }
    public string? TrangThaiGD { get; set; }


} 
public class CheckPaymentStatusRequest
{
    [MaxLength(50)]
    public string LoaiBanTin { get; set; } = "QUERY";
    public string PhienBan { get; set; } = "1.0.6";
    [MaxLength(50)]
    public string? MaDoiTac { get; set; }
    [MaxLength(255)]
    public string? MaThamChieu { get; set; }
   
    [MaxLength(50)]
    public string? ThoiGianGD { get; set; }
    [MaxLength(255)]
    public string? MaXacThuc { get; set; }
}