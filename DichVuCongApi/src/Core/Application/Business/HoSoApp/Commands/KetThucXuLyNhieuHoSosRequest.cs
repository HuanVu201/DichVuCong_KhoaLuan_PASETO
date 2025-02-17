using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class KetThucXuLyNhieuHoSosRequest : IRequest<Result>
{
    public List<DefaultIdType> Ids { get;set; }
    public string TrangThaiHoSoId { get; set; }
    public string TrangThaiTraKq { get; set; }
    public DateTime? NgayKetThucXuLy { get; set; }
    public bool? SetDungHan { get; set; } = false;
}
