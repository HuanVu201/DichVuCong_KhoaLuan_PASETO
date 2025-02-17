using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.Extensions;
public static class DateTimeExtension
{
    public static double TotimeStamp(DateTime input)
    {
        return input.Subtract(new DateTime(1970, 1, 1)).TotalMilliseconds;
    }
}
