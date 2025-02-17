using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

namespace TD.DichVuCongApi.Application.Common.ExportThongKe.Statistics;
public interface IExportThongKeDinhDanhCongDan : IScopedService
{
    public Task<string> ExportExcelThongKeDinhDanhCongDan(List<UserAppDto> data, string urlPhoi, string? parameters);
}
