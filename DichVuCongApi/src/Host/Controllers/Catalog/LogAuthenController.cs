using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Catalog.LogAuthen.Queries;
using TD.DichVuCongApi.Application.Portal.CountAccessPortal;
using TD.DichVuCongApi.Catalog.Catalog.LogAuthen.Queries;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class LogAuthenController : VersionedApiController
{
    [Authorize]
    [HttpGet]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Lấy dữ liệu LogAuthen theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchLogAuthenQuery req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("Detail")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Lấy thông tin người dùng với userName", "")]
    public async Task<ActionResult> GetAuthen([FromQuery] GetLogAuthenQuery req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("CountAccessPortal")]
    [OpenApiOperation("Lấy thông tin lượt truy cập trên cổng (1 tiếng)", "")]
    public async Task<ActionResult> CountAccessPortal([FromQuery] CountAccessCommand req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
