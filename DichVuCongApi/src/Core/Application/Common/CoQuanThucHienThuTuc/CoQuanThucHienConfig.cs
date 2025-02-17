using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Common.CoQuanThucHienThuTuc;

public class ListCoQuanThucHienConfig
{
    public List<CoQuanThucHienConfigElement> CoQuanThucHienConfigs { get; set; } 
}
public class CoQuanThucHienConfigElement
{
    public string name { get; set; }
    public string code { get; set; }
}