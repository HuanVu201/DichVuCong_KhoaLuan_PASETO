using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

namespace TD.DichVuCongApi.Application.Portal.ThongKeKhoTaiLieuApp.Commands;
public interface IExportExcelThongKeKhoTaiLieuService : IScopedService
{
    public Task<StreamDataFile> ThongKeSuDungKhoTaiLieu(List<ThongKeKhoTaiLieuDto> data, string parameters);

}
