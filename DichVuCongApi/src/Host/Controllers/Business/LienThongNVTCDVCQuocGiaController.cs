using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.LienThongNVTCDVCQuocGiaApp.LienThongNVTCDVCQG;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
using static TD.DichVuCongApi.Application.Business.LienThongNVTCDVCQuocGiaApp.ChungTuThueApp.ImportChungTuThueService;
using static TD.DichVuCongApi.Application.Business.LienThongNVTCDVCQuocGiaApp.ThongBaoThueApp.ImportThongBaoThueService;
using static TD.DichVuCongApi.Application.Catalog.LinhVucApp.Service;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class LienThongNVTCDVCQuocGiaController : VersionedApiController
{
    [AllowAnonymous]
    [HttpPost]
    [OpenApiOperation("Thêm thông tin liên thông NVT cổng DVC Quốc gia ", "")]
    public async Task<ActionResult> Add(AddLienThongNVTCDVCQuocGiaCommand req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("ImportThongBaoThueFromDVCQG")]
    [OpenApiOperation("ImportThongBaoThueServiceCommand ", "")]
    public async Task<ActionResult> ImportThongBaoThueServiceCommand(ImportThongBaoThueServiceCommand req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("ImportChungTuThueFromDVCQG")]
    [OpenApiOperation("ImportChungTuThueServiceCommand ", "")]
    public async Task<ActionResult> ImportChungTuThueServiceCommand(ImportChungTuThueServiceCommand req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

}
