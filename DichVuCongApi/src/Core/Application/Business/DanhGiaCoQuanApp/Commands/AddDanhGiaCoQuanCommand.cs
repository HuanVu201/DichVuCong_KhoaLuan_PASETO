using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp.Commands;
public class AddDanhGiaCoQuanCommand : ICommand<Guid>
{
    public string? DonVi { get; set; }
    public string? DonViText { get; set; }
    public string? MaNhomCha { get; set; }
    public string? MaNhomChaText { get; set; }
    public bool? DongBo { get; set; }
    public string? Quy { get; set; }
    public string? Nam { get; set; }
    public string? TraLoi1 { get; set; }
    public string? TraLoi2 { get; set; }
    public string? TraLoi3 { get; set; }
    public string? TraLoi4 { get; set; }
    public string? TraLoi5 { get; set; }
    public string? TraLoi6 { get; set; }
    public string? TraLoi7 { get; set; }
    public string? TraLoi8 { get; set; }
    public string? TraLoi9 { get; set; }
    public string? TraLoi10 { get; set; }
    public string? TraLoi11 { get; set; }
    public string? SoPhieu { get; set; }
    public string? TongDiem { get; set; }
    public string? PhongBan { get; set; }
    public string? LyDoTruDiem { get; set; }
    public string? MaHoSo { get; set; }
    public string? HinhThucDanhGia { get; set; }
    public string? MucDoRHL { get; set; }
    public string? MucDoHL { get; set; }
    public string? MucDoBT { get; set; }
    public string? MucDoKHL { get; set; }
    public string? MucDoRKHL { get; set; }
    public string? ThamDinhTraLoi1 { get; set; }
    public string? ThamDinhTraLoi2 { get; set; }
    public string? ThamDinhTraLoi3 { get; set; }
    public string? ThamDinhTraLoi4 { get; set; }
    public string? ThamDinhTraLoi5 { get; set; }
    public string? ThamDinhTraLoi6 { get; set; }
    public string? ThamDinhTraLoi7 { get; set; }
    public string? ThamDinhTraLoi8 { get; set; }
    public string? ThamDinhTraLoi9 { get; set; }
    public string? ThamDinhTraLoi10 { get; set; }
    public string? ThamDinhTraLoi11 { get; set; }
    public string? XepLoai { get; set; }
    public string? XepHang { get; set; }
    public bool? TongDonViCon { get; set; }
}
