using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.Services;
public class GuiVBDLISBaseResponse
{
    public int data { get; set; }
    public BaseStatusVBDLISResponse status { get; set; }
}

public class BaseStatusVBDLISResponse
{
    public bool? success { get; set; }
    public int? code { get; set; }
    public string? type { get; set; }
    public DateTime? time { get; set; }
    public string? message { get; set; }
}