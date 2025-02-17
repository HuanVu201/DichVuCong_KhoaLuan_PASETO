using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.VnPost;
public class OrderLGSPWithItemCode
{
    public string CustomerCode { get; set; }
    public string ItemCode { get; set; }
    public string OrderNumber { get; set; }
    public int CODAmount { get; set; } = 0;
    public int SenderProvince { get; set; }
    public int SenderDistrict { get; set; }
    public string SenderAddress { get; set; }
    public string SenderName { get; set; }
    public string SenderEmail { get; set; } = "dvc @gmail.com";
    public string SenderTel { get; set; }
    public string SenderDesc { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ReceiverName { get; set; }
    public string ReceiverAddress { get; set; }
    public string ReceiverTel { get; set; }
    public int ReceiverProvince { get; set; } = 0;
    public int ReceiverDistrict { get; set; } = 0;
    public string ReceiverEmail { get; set; }
    public int FlagConfig { get; set; } = 2;
}

public class RespondLGSP
{
    public string Status { get; set; }
    public string Message { get; set; }

    public string ToString()
    {
        return JsonConvert.SerializeObject(this);
    }
}