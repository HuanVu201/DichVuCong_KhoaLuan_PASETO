using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class BaoCaoTongHopResponse<T> where T : class
{
    public BaoCaoTongHopResponse(List<T> result)
    {
        this.data = result;
    }

    public List<T> data { get; set; }
}