using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Commands;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Catalog.NgayNghiApp.Commands;
using TD.DichVuCongApi.Application.Catalog.NgayNghiApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class NgayNghiController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một ngày nghỉ ", "")]
    public async Task<ActionResult> Add(AddNgayNghiCommand req)
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
    [OpenApiOperation("Lấy dữ liệu ngày nghỉ theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchNgayNghiQuery req)
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
    [OpenApiOperation("Lấy dữ liệu ngày nghỉ theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetNgayNghiQuery(id));
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
    [OpenApiOperation("Sửa một ngày nghỉ", "")]
    public async Task<ActionResult> Update(UpdateNgayNghiCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một ngày nghỉ ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteNgayNghiCommand req, Guid id)
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
    [OpenApiOperation("khôi phục một ngày nghỉ ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreNgayNghiCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
