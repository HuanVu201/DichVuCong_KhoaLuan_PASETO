using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.ThongKeIOC;
public class ThongKeHoSoTheoNgayResponse<T>
    where T : class
{
    public ThongKeHoSoTheoNgayResponse()
    {
    }
   
    public ThongKeHoSoTheoNgayResponse(IReadOnlyList<T> result)
    {
        this.data = result;
    }

    public IReadOnlyList<T> data { get; set; } 

}
