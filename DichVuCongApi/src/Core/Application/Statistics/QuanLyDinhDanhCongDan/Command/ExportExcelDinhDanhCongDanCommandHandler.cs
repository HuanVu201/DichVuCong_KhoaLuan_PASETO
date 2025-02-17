using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchSoTheoDoi;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.ExportThongKe.Statistics;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Common.Zalo;

namespace TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan.Command;

public class ValueClass
{
    public string Where { get; set; }
    public string Parameter { get; set; }
}
public class ExportExcelDdcdCommandWhereBuilder
{
    public static ValueClass Build(ExportExcelDinhDanhCongDanCommand req)
    {
        string parameters = string.Empty;
        ValueClass data = new ValueClass();

        if (!string.IsNullOrEmpty(req.DoiTuong))
        {
            if (req.DoiTuong.ToLower().Contains("congdan"))
            {
                parameters += "Đối tượng: Công dân\n";
            }
            else
            {
                parameters += "Đối tượng: Tổ chức/Doanh nghiệp\n";
            }
        }

        if (req.DaDinhDanh == true)
        {
            parameters += "Tài khoản: Đã định danh\n";
        }
        else if (req.DaDinhDanh == false)
        {
            parameters += "Tài khoản: Chưa định danh\n";
        }

        if (!string.IsNullOrEmpty(req.GioiTinh))
        {
            if (req.GioiTinh == "1")
            {
                parameters += "Giới tính: Nam\n";
            }
            else
            {
                parameters += "Giới tính: Nữ\n";
            }
        }

        if (!string.IsNullOrEmpty(req.DoTuoi))
        {
            string[] value = req.DoTuoi.Split("##");
            string startAge = value[0];
            string endAge = value[1];
            int currentYear = DateTime.Now.Year;

            parameters += $"Độ tuổi: {req.DoTuoi.Replace("##", " - ")}";
        }

        data.Parameter = parameters;
        return data;
    }
}

public class ExportExcelDinhDanhCongDanCommandHandler : IRequestHandler<ExportExcelDinhDanhCongDanCommand, string>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly IExportThongKeDinhDanhCongDan _exportExcelService;
    private readonly ICacheService _cacheService;

    public ExportExcelDinhDanhCongDanCommandHandler(IDapperRepository dapperRepository, IMediator mediator, IExportThongKeDinhDanhCongDan exportExcelService, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _exportExcelService = exportExcelService;
        _cacheService = cacheService;
    }

    public async Task<string> Handle(ExportExcelDinhDanhCongDanCommand request, CancellationToken cancellationToken)
    {
        string where = ExportExcelDdcdCommandWhereBuilder.Build(request).Where;
        string parameters = ExportExcelDdcdCommandWhereBuilder.Build(request).Parameter;
        var data = await _cacheService.GetOrSetAsync(request,
              async () => await _mediator.Send(new SearchTaiKhoanQuery()
              {
                  DaDinhDanh = request.DaDinhDanh,
                  FullName = request.FullName,
                  UserName = request.UserName,
                  Email = request.Email,
                  PhoneNumber = request.PhoneNumber,
                  DoiTuong = request.DoiTuong,
                  DoTuoi = request.DoTuoi,
                  GioiTinh = request.GioiTinh,
                  PageNumber = request.PageNumber,
                  PageSize = request.PageSize,
              }), TimeSpan.FromMinutes(1), cancellationToken);

        string urlPhoiExcel = await _mediator.Send(new GetUrlMauPhoiQuery()
        {
            LoaiPhoi = $"mau-phoi-{request.TypeExport}",
            Code = $"{request.TypeExport}-thong-ke-dinh-danh-cong-dan",
        });
        string pathExcel = await _exportExcelService.ExportExcelThongKeDinhDanhCongDan(data.Data, urlPhoiExcel, parameters);

        return pathExcel;
    }
}