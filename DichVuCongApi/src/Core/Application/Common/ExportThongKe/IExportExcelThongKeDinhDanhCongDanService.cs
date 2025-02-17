using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

namespace TD.DichVuCongApi.Application.Common.ExportExcel;
public interface IExportExcelThongKeDinhDanhCongDanService : IScopedService
{
    public Task<StreamDataFile> ThongKeDinhDanhCongDan(List<UserAppDto> data, string parameters);
}
