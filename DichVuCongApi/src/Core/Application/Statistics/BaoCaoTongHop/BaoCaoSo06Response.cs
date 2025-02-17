using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class BaoCaoSo06Response<T>
    where T : class
{
   
    public BaoCaoSo06Response(List<T> result)
    {
        this.data = result;
    }

    public List<T> data { get; set; }
}
public class BaoCaoSo06ElementResponse : BaoCaoTongHopBaseElementResponse
{
}
