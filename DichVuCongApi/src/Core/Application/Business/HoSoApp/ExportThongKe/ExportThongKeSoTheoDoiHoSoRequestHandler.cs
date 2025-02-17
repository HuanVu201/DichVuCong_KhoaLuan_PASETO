using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.ExportThongKe.Statistics;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan.Command;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchSoTheoDoi;
using MediatR;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;
using TD.DichVuCongApi.Application.Common.ExportThongKe.Business;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.ExportThongKe;
public class ExportThongKeSoTheoDoiHoSoRequestHandler : IRequestHandler<ExportThongKeSoTheoDoiHoSoRequest, string>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly IExportSoTheoDoiHoSo _exportThongKeService;
    private readonly ICacheService _cacheService;

    public ExportThongKeSoTheoDoiHoSoRequestHandler(IDapperRepository dapperRepository, IMediator mediator, IExportSoTheoDoiHoSo exportThongKeService, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _exportThongKeService = exportThongKeService;
        _cacheService = cacheService;
    }

    public async Task<string> Handle(ExportThongKeSoTheoDoiHoSoRequest request, CancellationToken cancellationToken)
    {
        SoTheoDoiHoSoParameters parameters = new SoTheoDoiHoSoParameters();
        if (!string.IsNullOrEmpty(request.GroupCode))
        {
            var group = await _mediator.Send(new GetByGroupCodeQuery(request.GroupCode));
            string groupName = group.Data.GroupName;
            if (!string.IsNullOrEmpty(groupName))
            {
                parameters.GroupName = groupName;
            }
        }

        if (!string.IsNullOrEmpty(request.TrangThaiHoSoId))
        {
            string tenTrangThai = HoSoEventUtils.GetTenTrangThaiHoSo(request.TrangThaiHoSoId);
            if (!string.IsNullOrEmpty(tenTrangThai))
                parameters.TrangThaiHoSo = tenTrangThai;
        }

        if (request.TuNgay.HasValue)
            parameters.TuNgay = request.TuNgay.Value.ToString("dd/MM/yyyy");

        if (request.DenNgay.HasValue)
            parameters.DenNgay = request.DenNgay.Value.ToString("dd/MM/yyyy");

        var data = await _cacheService.GetOrSetAsync(request,
                async () => await _mediator.Send(new SearchSoTheoDoiHoSoRequest()
                {
                    TuNgay = request.TuNgay,
                    DenNgay = request.DenNgay,
                    TrangThaiHoSoId = request.TrangThaiHoSoId,
                    GroupCode = request.GroupCode,
                    DonViQuanLy = request.DonViQuanLy,
                    PageNumber = request.PageNumber,
                    PageSize = request.PageSize,
                }), TimeSpan.FromMinutes(1), cancellationToken);

        string urlPhoi = await _mediator.Send(new GetUrlMauPhoiQuery()
        {
            LoaiPhoi = $"mau-phoi-{request.TypeExport}",
            Code = $"{request.TypeExport}-so-theo-doi-ho-so",
        });

        if (string.IsNullOrEmpty(urlPhoi))
            throw new Exception("Không có thông tin mẫu phôi!");

        string pathReturn = string.Empty;

        if (request.TypeExport == "excel" && data.Data != null)
        {
            pathReturn = await _exportThongKeService.ExportExcelSoTheoDoiHoSo(data.Data, urlPhoi, parameters);
        }
        else if (request.TypeExport == "word")
        {
            pathReturn = await _exportThongKeService.ExportWordSoTheoDoiHoSo(data.Data, urlPhoi, parameters);
        }

        return pathReturn;
    }

    public class SoTheoDoiHoSoParameters
    {
        public string? TuNgay { get; set; }
        public string? DenNgay { get; set; }
        public string? TrangThaiHoSo { get; set; }
        public string? GroupName { get; set; }
    }
}
