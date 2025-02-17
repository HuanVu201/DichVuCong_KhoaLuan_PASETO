using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;


namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public class EditBienLaiDienTu : ICommand
{
    public Guid? IdYeuCauThanhToan { get; set; }
    public int? Phi { get; set; }
    public int? LePhi { get; set; }
    public string? LoaiPhi { get; set; }
    public string? NguoiNopTienBienLai { get; set; }
    public string? DiaChiBienLai { get; set; }
    public string? MaSoThueBienLai { get; set; }
    public string? HinhThucThanhToan { get; set; }
    public string? TenPhiBienLai { get; set; }
    public string? TenLePhiBienLai { get; set; }
    public string? EmailNguoiNopTienBienLai { get; set; }
}
