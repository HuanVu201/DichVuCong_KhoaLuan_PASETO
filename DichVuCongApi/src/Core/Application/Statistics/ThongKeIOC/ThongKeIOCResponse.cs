using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.ThongKeIOC;
public class ThongKeIOCResponse<T>
    where T : class
{
  
    public ThongKeIOCResponse(List<T> result)
    {
        this.data = result;
    }
   
    public List<T> data { get; set; }

}