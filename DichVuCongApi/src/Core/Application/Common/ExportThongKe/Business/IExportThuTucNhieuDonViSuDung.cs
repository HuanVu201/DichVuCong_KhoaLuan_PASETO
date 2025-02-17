using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static TD.DichVuCongApi.Application.Business.HoSoApp.ExportThongKe.ExportThongKeSoTheoDoiHoSoRequestHandler;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries.ThuTucNhieuDonViSuDung;

namespace TD.DichVuCongApi.Application.Common.ExportThongKe.Business;
public interface IExportThuTucNhieuDonViSuDung : IScopedService
{
    public Task<string> ExportExcelThuTucNhieuDonViSuDung(List<ThuTucNhieuDonViSuDungDto> data, string urlPhoi, ThuTucNhieuDonViSuDungParams? parameters);
}
