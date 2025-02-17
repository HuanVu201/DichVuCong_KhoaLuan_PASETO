using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Dtos;

public class StatisticHoSoChungThucBaseDto : IDto
{
    public StatisticHoSoChungThucBaseDto()
    {
        data = new List<StatisticHoSoChungThucDto>();
    }
    public StatisticHoSoChungThucBaseDto(List<StatisticHoSoChungThucDto> data)
    {
        this.data = data;
    }

    public List<StatisticHoSoChungThucDto> data { get; set; }
    public int TotalCount { get; set; }
}
public class StatisticHoSoChungThucDto 

{
    public int TongSoHoSo { get; set; }
    public int BanGiay { get; set; }
    public int BanDienTu { get; set; }
    public string DonViId { get; set; }
    public string TenDonVi { get;set; }


}
