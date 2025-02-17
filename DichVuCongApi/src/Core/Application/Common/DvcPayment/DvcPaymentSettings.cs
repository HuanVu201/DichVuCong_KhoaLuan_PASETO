using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.DvcPayment;
public class DvcPaymentSettings
{
    public string InitUrl { get; set; }
    public string InitReceiptUrl { get; set; }
    public string CheckConfirmUrl { get; set; }
    public string ReceiptFolder { get; set; }
    public string AccessToken { get; set; }
    public string InitPaymentSecretKey { get; set; }
    public string InitPayMentParnerCode { get; set; }

}