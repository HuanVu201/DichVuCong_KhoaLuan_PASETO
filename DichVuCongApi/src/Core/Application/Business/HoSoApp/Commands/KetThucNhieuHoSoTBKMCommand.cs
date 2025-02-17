using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class KetThucNhieuHoSoTBKMCommand : ICommand<Dictionary<string, string>>
{
    public List<Guid> Ids { get; set; }
    public string? TrangThaiHoSoId { get; set; }
    public DateTime? NgayKetThucXuLy { get; set; }
    public DateTime? NgayTra { get; set; }
}
