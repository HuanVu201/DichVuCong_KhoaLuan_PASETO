using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class KetThucHoSoThongBaoKhuyenMaiCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? TrangThaiHoSoId { get; set; }
    public string? DinhKemKetQua { get; set; }
    public DateTime? NgayKetThucXuLy {  get; set; }
    public DateTime? NgayTra {  get; set; }


}
