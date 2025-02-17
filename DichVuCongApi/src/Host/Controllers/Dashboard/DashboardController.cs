using DocumentFormat.OpenXml.Bibliography;
using MediatR;
using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Dashboard;
using TD.DichVuCongApi.Application.Portal.BannerApp.Queries;
using TD.DichVuCongApi.Application.Statistics.TongHopDonVi;

namespace TD.DichVuCongApi.Host.Controllers.Dashboard;

public class DashboardController : VersionedApiController
{
    private readonly IMediator _mediator;
    private readonly IInjectConfiguration _iInjectConfiguration;
    private readonly string _tenTinhThanh;

    public DashboardController(IMediator mediator, IInjectConfiguration iInjectConfiguration)
    {
        _mediator = mediator;
        _iInjectConfiguration = iInjectConfiguration;
        _tenTinhThanh = iInjectConfiguration.GetValue<string>("GLOBAL_CONFIG:Ten_Tinh_Thanh") ?? string.Empty;
    }

    [HttpGet]
    [MustHavePermission(TDAction.View, TDResource.Dashboard)]
    [OpenApiOperation("Get statistics for the dashboard.", "")]
    public Task<StatsDto> GetAsync()
    {
        return Mediator.Send(new GetStatsRequest());
    }

    [AllowAnonymous]
    [HttpGet("/ServerStatus")]
    //[MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Xem thông số hệ thống sử dụng: CPU, RAM, ...", "")]
    public IActionResult ServerStatus()
    {
        return View("~/Views/Dashboard/ServerStatus.cshtml");
    }

    [AllowAnonymous]
    [HttpGet("/portaldvc/guest/thong-ke-thang-hcc")]
    public async Task<IActionResult> HccThongKeThang([FromQuery] string? Catalog, [FromQuery] int? Thang, [FromQuery] int? Nam, [FromQuery] string? MaDinhDanh)
    {
        var currentDate = DateTime.Now;
        int month = Thang ?? currentDate.Month;
        int year = Nam ?? currentDate.Year;

        var firstDay = new DateTime(year, month, 1);
        var lastDay = new DateTime();
        if (Thang.HasValue || Nam.HasValue)
        {
            lastDay = firstDay.AddMonths(1).AddDays(-1);
        }
        else
        {
            lastDay = new DateTime(year, month, currentDate.Day);
        }

        var baoCaoData = await _mediator.Send(new TongHopDonViRequest()
        {
            cache = true,
            Catalog = Catalog,
            TuNgay = firstDay,
            DenNgay = lastDay,
            MaDinhDanhCha = MaDinhDanh,
        });

        ViewBag.BaoCaoData = baoCaoData.data.ToList();
        ViewBag.Month = month;
        ViewBag.Year = year;
        ViewBag.Title = "Hệ thống thông tin giải quyết thủ tục hành chính";

        return View("~/Views/Dashboard/hcc-thong-ke-thang.cshtml");
    }

    [AllowAnonymous]
    [HttpGet("/portaldvc/guest/thong-ke-hcc")]
    public async Task<IActionResult> HccThongKe([FromQuery] string? Catalog, [FromQuery] string? MaDinhDanh)
    {
        var currentDate = DateTime.Now;
        int year = currentDate.Year;

        var firstDay = new DateTime(year, 1, 1);
        var lastDay = new DateTime(year, currentDate.Month, currentDate.Day);

        var baoCaoData = await _mediator.Send(new TongHopDonViRequest()
        {
            cache = true,
            Catalog = Catalog,
            TuNgay = firstDay,
            DenNgay = lastDay,
            MaDinhDanhCha = MaDinhDanh,
        });

        ViewBag.BaoCaoData = baoCaoData.data.ToList();
        ViewBag.Year = year;
        ViewBag.TenTinh = _tenTinhThanh.ToUpper();
        ViewBag.Title = "Hệ thống thông tin giải quyết thủ tục hành chính";

        return View("~/Views/Dashboard/hcc-thong-ke.cshtml");
    }
}