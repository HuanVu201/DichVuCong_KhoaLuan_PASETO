using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.VBDLIS;
public class VBDLISBaseResponse<T>
{
    public VBDLISBaseResponse<T> Success(T data)
    {

        this.Result = 1;
        this.Data = data;
        return this;
    }

    public VBDLISBaseResponse<T> Fail()
    {
        this.Result = 0;
        return this;
    }

    public int Result { get; set; }
    public string Message { get; set; }
    public T Data { get; set; }
}
