using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.BienLaiViettel;
public class GetBienLaiViettelResponse
{
    public string errorCode { get; set; }
    public string description { get; set; }
    public string fileToBytes { get; set; }
    public string fileName { get; set; }
    public bool paymentStatus { get; set; }
}
