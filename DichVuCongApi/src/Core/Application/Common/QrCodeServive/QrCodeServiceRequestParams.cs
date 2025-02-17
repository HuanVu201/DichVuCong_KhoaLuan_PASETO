using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.QrCodeServive;
public class QrCodeServiceRequestParams
{
    public string? Id { get; set; }
    public string? Content { get; set; }
    public DateTime? Expiry { get; set; }
}
