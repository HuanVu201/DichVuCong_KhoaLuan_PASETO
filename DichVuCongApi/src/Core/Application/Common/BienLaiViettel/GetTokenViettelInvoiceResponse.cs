using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.BienLaiViettel;
public class GetTokenViettelInvoiceResponse
{
    public string access_token { get; set; }
    public string token_type { get; set; }
    public string refresh_tokne { get; set; }
}
