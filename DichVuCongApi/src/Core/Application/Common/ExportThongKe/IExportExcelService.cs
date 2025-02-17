using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp;
using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Portal.ThongKeKhoTaiLieuApp;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

namespace TD.DichVuCongApi.Application.Common.ExportExcel;
public interface IExportExcelService : IScopedService
{
    public Task<StreamDataFile> ExportToExcelBaoCao01(List<BaoCao01Dto> data, string quy, string nam, string donVi);
}
