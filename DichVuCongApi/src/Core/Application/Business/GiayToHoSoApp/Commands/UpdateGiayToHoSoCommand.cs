using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.GiayToHoSoApp.Commands;
public class UpdateGiayToHoSoCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public bool? SuDung { get; set; }
    public string? PDFPhieu { get; set; }
    public string? DocxPhieu { get; set; }
    public string? HinhAnhChuKyCongDan { get; set; }
    public DateTime? NgayKySo { get; set; }
    public string? NguoiKySo { get; set; }
    public DateTime? NgayGuiCongDan { get; set; }
    public string? TrangThaiGuiCongDan { get; set; }
    public string? NguoiGuiCongDan { get; set; }
}
