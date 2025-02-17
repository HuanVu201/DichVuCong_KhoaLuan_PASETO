using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Commands;
public class AddPhieuKhaoSatCommand : ICommand<Guid>
{
    public string? donVi {  get; set; }
    public string? donViText {  get; set; }
    public string? MaHoSo {  get; set; }
    public DateTime? NgayTao { get; set; }
    public string? traLoi1 { get; set; }
    public string? traLoi2 { get; set; }
    public string? traLoi3 { get; set; }
    public string? traLoi4 { get; set; }
    public string? traLoi5 { get; set; }
    public string? traLoi6 { get; set; }
    public string? traLoi7 { get; set; }
    public string? traLoi8 { get; set; }
    public string? traLoi9 { get; set; }
    public string? traLoi10 { get; set; }
    public string? traLoi11 { get; set; }
    public string? hinhThucDanhGia { get; set; }
    public string? mucDoRHL { get; set; }
    public string? mucDoHL { get; set; }
    public string? mucDoBT { get; set; }
    public string? mucDoKHL { get; set; }
    public string? mucDoRKHL { get; set; }
    public string? nguoiNhapDanhGia { get; set; }
    public string? nguoiNhapDanhGiaText { get; set; }
    public string? loaiNhom { get; set; }
    public string? phongBan { get; set; }
    public string? phongBanText { get; set; }
    public bool? hoanThanhDanhGia { get; set; }
    public string? tongDiem { get; set; }
    public string? xepLoai { get; set; }
}
