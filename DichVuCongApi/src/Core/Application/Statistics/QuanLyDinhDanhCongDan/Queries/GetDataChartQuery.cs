using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;
public class GetDataChartQuery : IRequest<DataChart>
{
    public string? DoTuoi { get; set; } = "0#18#31#41#51#1000"; // Nhận dữ liệu vào các số bắt đầu của mốc dạng 18#31#41#51#1000
}
