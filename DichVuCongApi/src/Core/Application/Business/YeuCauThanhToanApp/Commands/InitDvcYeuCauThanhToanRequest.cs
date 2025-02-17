using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public class InitDvcYeuCauThanhToanRequest : ICommand<InitDvcYeuCauThanhToanResponse>
{
    public DefaultIdType Id { get;set; }
    public string NguoiNopTienBienLai { get; set; }
    public string? MaSoThueBienLai { get; set; }
    public string DiaChiBienLai { get; set; }
    public string? SoGiayToNguoiNopTienBienLai { get; set; }
    public string? EmailNguoiNopTienBienLai { get; set; }
    public string? SoTaiKhoanHoanPhi { get; set; }
    public string? TenTaiKhoanHoanPhi { get; set; }
    public string? TenNganHangHoanPhi { get; set; }
    

}
