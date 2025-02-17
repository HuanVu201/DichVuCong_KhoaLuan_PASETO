using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.LienThongNVTCDVCQuocGiaApp.ThongBaoThueApp;
public class AddThongBaoThueCommand : ICommand<Guid>
{
    public DefaultIdType HoSoId { get; set; }
    public string Nguon { get; set; } = string.Empty;
    public string MaSoThue { get; set; } = string.Empty;
    public double SoTien { get; set; }
    public string SoQuyetDinh { get; set; } = string.Empty;
    public DateTime NgayQuyetDinh { get; set; }
    public string TenTieuMuc { get; set; } = string.Empty;
}
