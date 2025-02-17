using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Statistics.HoSo;
public class NhacViecPortalQuery : IQuery<NhacViecPortalDto>
{
    public bool NguoiGui {  get; set; }
}

public class NhacViecPortalDto : IDto
{
    public int DuocTiepNhan { get; set; }
    public int KhongDuocTiepNhan { get; set; }
    public int ChoThanhToan { get; set; }  
    public int YeuCauBoSung { get; set; }  
    public int DaCoKetQua { get; set; }
    public int TongXuLy { get; set; }


}