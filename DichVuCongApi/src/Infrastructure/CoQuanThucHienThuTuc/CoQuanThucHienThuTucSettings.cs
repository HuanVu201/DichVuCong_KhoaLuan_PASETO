using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Infrastructure.CoQuanThucHienThuTuc;
public class ListCoQuanThucHienConfigs
{
    
    public List<CoQuanThucHienThuTucSettingElement> CoQuanThucHienConfigs { get; set; }
}
public class CoQuanThucHienThuTucSettingElement
{
    public string name { get; set; }
    public string code { get; set; }
}