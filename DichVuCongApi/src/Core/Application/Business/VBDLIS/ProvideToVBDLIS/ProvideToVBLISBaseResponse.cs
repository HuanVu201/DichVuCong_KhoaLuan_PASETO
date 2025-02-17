using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
public class ProvideToVBLISBaseResponse
{
    public ProvideToVBLISBaseResponse()
    {

    }
    public ProvideToVBLISBaseResponse(int result, string message)
    {
        Result = result;
        Message = message;
    }

    public int Result { get; set; }
    public string Message { get; set; }
}
