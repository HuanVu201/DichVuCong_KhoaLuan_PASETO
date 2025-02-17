using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.LogDGHLCongDanApp.Commands;
public class LogThongKeDGHLCommand : ICommand<DefaultIdType>
{
    public string? DonVi { get;  set; }
    public string? NgayTao { get;  set; }
    public string? MaHoSo { get;  set; }
    public string? NguoiDanhGia { get;  set; }
    public string? TraLoi1 { get;  set; }
    public string? TraLoi2 { get;  set; }
    public string? TraLoi3 { get;  set; }
    public string? TraLoi4 { get;  set; }
    public string? TraLoi5 { get;  set; }
    public string? TraLoi6 { get;  set; }
    public string? TraLoi7 { get;  set; }
    public string? TraLoi8 { get;  set; }
    public string? TraLoi9 { get;  set; }
    public string? TraLoi10 { get;  set; }
    public string? TraLoi11 { get;  set; }
    public bool? HoanThanhDanhGia { get;  set; }
}
