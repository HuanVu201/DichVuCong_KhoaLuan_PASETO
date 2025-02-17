using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Portal.CauHoiPhoBienApp.Commands;
using TD.DichVuCongApi.Application.Portal.CauHoiPhoBienApp.Queries;

namespace TD.DichVuCongApi.Host.Controllers.Portal;
public class CauHoiPhoBienController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một CauHoiPhoBien ", "")]
    public async Task<ActionResult> Add(AddCauHoiPhoBienCommand req)
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
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu CauHoiPhoBien theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchCauHoiPhoBienQuery req)
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
    [HttpGet("{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu CauHoiPhoBien theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetCauHoiPhoBienQuery(id));
            return Ok(res);
        }
        catch (NotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    [OpenApiOperation("Sửa một CauHoiPhoBien", "")]
    public async Task<ActionResult> Update(UpdateCauHoiPhoBienCommand req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một CauHoiPhoBien ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteCauHoiPhoBienCommand req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPatch("{id:guid}")]
    [OpenApiOperation("khôi phục một CauHoiPhoBien ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreCauHoiPhoBienCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
