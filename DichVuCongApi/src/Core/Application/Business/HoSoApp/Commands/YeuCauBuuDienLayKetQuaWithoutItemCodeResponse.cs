using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class YeuCauBuuDienLayKetQuaWithoutItemCodeResponse
{
    public YeuCauBuuDienLayKetQuaWithoutItemCodeResponse(DefaultIdType id, string? maHoSo, string? status, string message)
    {
        Id = id;
        MaHoSo = maHoSo;
        Status = status;
        Message = message;
    }
    public DefaultIdType? Id { get; set; }
    public string? MaHoSo { get; set; }
    public string? Status { get; set; }
    public string? Message { get; set; }
}
