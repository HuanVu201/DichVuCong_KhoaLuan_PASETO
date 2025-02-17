using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
public class SoBienNhanDto
{
    public Guid TTHCId { get; set; }
    public string TenTTHC { get; set; }
    public string ChuHoSo { get; set; }
    public string SoDinhDanh { get; set; }
    public string TenDonVi { get; set; }
    public string DonViId { get; set; }
    public string MaHoSo { get; set; }
    public string SoDienThoaiChuHoSo { get; set; }
    public string SoGiayToChuHoSo { get; set; }
    public string NgayNopHoSo { get; set; }
    public string EmailChuHoSo { get; set; }
    public string TrichYeuHoSo { get; set; }
}
