
using TD.DichVuCongApi.Application.Portal.TrangThaiApp.Commands;
using TD.DichVuCongApi.Application.Portal.TrangThaiApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.CataLog;
public class TrangThaiController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một trạng thái ", "")]
    public async Task<ActionResult> Add(AddTrangThaiCommand req)
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
    [OpenApiOperation("Lấy dữ liệu trạng thái theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery]SearchTrangThaiQuery req)
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
    [HttpGet("{id}")]
    [OpenApiOperation("Lấy dữ liệu trạng thái theo id", "")]
    public async Task<ActionResult> Get(string id)
    {
        try
        {
            var res = await Mediator.Send(new GetTrangThaiQuery(id));
            return Ok(res);
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
    [OpenApiOperation("Sửa một trạng thái", "")]
    public async Task<ActionResult> Update(UpdateTrangThaiCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một trạng thái ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteTrangThaiCommand req, Guid id)
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
    [OpenApiOperation("khôi phục một trạng thái ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreTrangThaiCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}