using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Admin;
public class AdminQueryRequest : IRequest<object> 
{
    public string query { get; set; }
}
