using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.KetQuaThuTucApp.Commands;
public class AddKetQuaThuTucCommand : ICommand<DefaultIdType>
{
    public string? MaNhanDienOCR { get; set; }
    public string? MaKetQua { get; set; }
    public string? TenKetQua { get; set; }
    public string? TenTep { get; set; }
    public string? Url { get; set; }
    public string MaTTHC { get; set; }
    public string? EFormKetQua { get; set; }
    public int? ThoiHanMacDinh { get; set; } = 6;
    public string? LoaiThoiHan { get; set; }
    public bool? LaThuTucThongDung { get; set; }
}
