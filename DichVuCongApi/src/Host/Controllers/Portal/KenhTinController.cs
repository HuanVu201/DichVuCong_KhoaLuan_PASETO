using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Portal.KenhTinApp.Commands;
using TD.DichVuCongApi.Application.Portal.KenhTinApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.CataLog;
public class KenhTinController : VersionedApiController
{
    [AllowAnonymous]
    [HttpGet("{id}")]
    [OpenApiOperation("Xem chi tiết kênh tin theo mã id", "")]
    public async Task<ActionResult> Get(string id)
    {
        try
        {
            var res = await Mediator.Send(new GetKenhTinQuery(id));
            return Ok(res);
        }catch (NotFoundException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [AllowAnonymous]
    [HttpGet]
    [OpenApiOperation("Lấy kênh tin theo mã bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchKenhTinQuery req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (InternalServerException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.Message);
        }
    }
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một kênh tin ", "")]
    public async Task<ActionResult> Add(AddKenhTinCommand req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return StatusCode(201, res);
        }
        catch (NotFoundException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPut("{id:guid}")]
    [OpenApiOperation("Sửa một kênh tin ", "")]
    public async Task<ActionResult> Update(UpdateKenhTinCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một kênh tin ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteKenhTinCommand req, Guid id)
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
    [OpenApiOperation("khôi phục một kênh tin ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreKenhTinCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
