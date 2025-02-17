using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;
using static TD.DichVuCongApi.Application.Business.HoSoApp.ExportThongKe.ExportThongKeSoTheoDoiHoSoRequestHandler;

namespace TD.DichVuCongApi.Application.Common.ExportThongKe.Business;
public interface IExportSoTheoDoiHoSo : IScopedService
{
    public Task<string> ExportExcelSoTheoDoiHoSo(List<HoSoTiepNhanQuaHanDto> data, string urlPhoi, SoTheoDoiHoSoParameters? parameters);
    public Task<string> ExportWordSoTheoDoiHoSo(List<HoSoTiepNhanQuaHanDto> data, string urlPhoi, SoTheoDoiHoSoParameters? parameters);

}