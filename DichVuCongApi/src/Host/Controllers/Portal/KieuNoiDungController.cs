
using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Portal.KieuNoiDungApp.Commands;
using TD.DichVuCongApi.Application.Portal.KieuNoiDungApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApiation.Portal.KieuNoiDungApp.Commands;

namespace TD.DichVuCongApi.Host.Controllers.CataLog;
public class KieuNoiDungController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một kiểu nội dung ", "")]
    public async Task<ActionResult> Add(AddKieuNoiDungCommand req)
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
    [OpenApiOperation("Lấy dữ liệu kiểu nội dung theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchKieuNoiDungQuery req)
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
    [OpenApiOperation("Lấy dữ liệu kiểu nội dung theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetKieuNoiDungQuery(id));
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
    [OpenApiOperation("Sửa một kiểu nội dung", "")]
    public async Task<ActionResult> Update(UpdateKieuNoiDungCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một kiểu nội dung ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteKieuNoiDungCommand req, Guid id)
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
    [OpenApiOperation("khôi phục một kiểu nội dung ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreKieuNoiDungCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
