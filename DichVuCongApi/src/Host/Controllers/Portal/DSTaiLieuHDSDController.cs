using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Portal.DSTaiLieuHDSDApp.Commands;
using TD.DichVuCongApi.Application.Portal.DSTaiLieuHDSDApp.Queries;

namespace TD.DichVuCongApi.Host.Controllers.Portal;
public class DSTaiLieuHDSDController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một DSTaiLieuHDSD ", "")]
    public async Task<ActionResult> Add(AddDSTaiLieuHDSDCommand req)
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
    [OpenApiOperation("Lấy dữ liệu DSTaiLieuHDSD theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchDSTaiLieuHDSDQuery req)
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
    [OpenApiOperation("Lấy dữ liệu DSTaiLieuHDSD theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetDSTaiLieuHDSDQuery(id));
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
    [OpenApiOperation("Sửa một DSTaiLieuHDSD", "")]
    public async Task<ActionResult> Update(UpdateDSTaiLieuHDSDCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một DSTaiLieuHDSD ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteDSTaiLieuHDSDCommand req, DefaultIdType id)
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
    [OpenApiOperation("khôi phục một DSTaiLieuHDSD ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreDSTaiLieuHDSDCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
