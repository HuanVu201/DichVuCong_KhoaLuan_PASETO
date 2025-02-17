using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp;
public class TrangThaiHoSoDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string MaHoSo { get; set; }
    public string TrangThai { get; set; }
    public string TrangThaiHoSoId { get; set; }

}
