using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.LogCSDLDanCuDoanhNghiepApp.Queries;
using TD.DichVuCongApi.Application.Business.LogDeletedUserApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class LogDeletedUserController : VersionedApiController
{

    [Authorize]
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu theo LogDeletedUser theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchLogDeletedUserQuery req)
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
