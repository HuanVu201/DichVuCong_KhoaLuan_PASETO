using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
public class HoSoTheoCanBoXuLyDto 
{
    public Guid TTHCId { get; set; }
    public string TenTTHC { get; set; }
    public string ChuHoSo { get; set; }
    public string SoDinhDanh { get; set; }
    public string TenDonVi { get; set; }
    public string DonViId { get; set; }
}
