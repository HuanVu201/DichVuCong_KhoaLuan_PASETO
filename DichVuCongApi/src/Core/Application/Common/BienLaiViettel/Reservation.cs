using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.BienLaiViettel;
public class Reservation
{
    public string errorCode { get; set; }
    public string description { get; set; }
    public string expiredDate { get; set; }
    public List<string> result { get; set; }
}
