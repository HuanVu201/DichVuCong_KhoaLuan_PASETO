using Mapster;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.CoQuanThucHienThuTuc;
using TD.DichVuCongApi.Application.Common.DvcPayment;
using TD.DichVuCongApi.Infrastructure.DvcPayment;

namespace TD.DichVuCongApi.Infrastructure.CoQuanThucHienThuTuc;
public class CoQuanThucHienThuTuc : ICoQuanThucHienThuTuc
{
    private ListCoQuanThucHienConfigs _settings;
    public CoQuanThucHienThuTuc(IOptions<ListCoQuanThucHienConfigs> settings)
    {
        _settings = settings.Value;

    }
    public ListCoQuanThucHienConfig getConfig()
    {
        ListCoQuanThucHienConfig res = new ListCoQuanThucHienConfig();

        return _settings.Adapt(res);
    }
} 