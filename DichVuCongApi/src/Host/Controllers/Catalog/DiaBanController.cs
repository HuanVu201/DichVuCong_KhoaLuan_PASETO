using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp.Commands;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;
using static TD.DichVuCongApi.Application.Catalog.DiaBanApp.Service;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class DiaBanController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một địa bàn ", "")]
    public async Task<ActionResult> Add(AddDiaBanCommand req)
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
    [HttpPost("api/importDiaBans")]
    [OpenApiOperation("Import DiaBans ", "")]
    public async Task<ActionResult> ImportDiaBanFromDVCQuocGia(ImportDiaBanServiceCommand req)
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
    [OpenApiOperation("Lấy dữ liệu địa bàn theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchDiaBanQuery req)
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
    [HttpGet("search")]
    [OpenApiOperation("Lấy dữ liệu địa bàn theo mã tỉnh, huyện, xã", "")]
    public async Task<ActionResult> SearchByMa([FromQuery] GetDiaBanByMa req)
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
    [OpenApiOperation("Lấy dữ liệu địa bàn theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetDiaBanQuery(id));
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
    [OpenApiOperation("Sửa một địa bàn", "")]
    public async Task<ActionResult> Update(UpdateDiaBanCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một địa bàn ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteDiaBanCommand req, Guid id)
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
    [OpenApiOperation("khôi phục một địa bàn ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreDiaBanCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
