using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Commands;
using TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class SoChungThucController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một SoChungThuc ", "")]
    public async Task<ActionResult> Add(AddSoChungThucCommand req)
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

    [Authorize]
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu SoChungThuc theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchSoChungThucQuery req)
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
    [HttpGet("{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu SoChungThuc theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetSoChungThucQuery(id));
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
    [OpenApiOperation("Sửa một SoChungThuc", "")]
    public async Task<ActionResult> Update(UpdateSoChungThucCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một SoChungThuc ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteSoChungThucCommand req, Guid id)
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
    [OpenApiOperation("khôi phục một SoChungThuc ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreSoChungThucCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
