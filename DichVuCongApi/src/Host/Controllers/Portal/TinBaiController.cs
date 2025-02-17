using Org.BouncyCastle.Ocsp;
using TD.DichVuCongApi.Application.Portal.KenhTinApp.Commands;
using TD.DichVuCongApi.Application.Portal.TinBaiApp.Commands;
using TD.DichVuCongApi.Application.Portal.TinBaiApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.CataLog;
public class TinBaiController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một tin bài ", "")]
    public async Task<ActionResult> Add(AddTinBaiCommand req)
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
    [OpenApiOperation("Lấy dữ liệu tin bài theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery]SearchTinBaiQuery req)
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
    [OpenApiOperation("Lấy dữ liệu tin bài theo mã Id", "")]
    public async Task<ActionResult> Get(string id)
    {
        try
        {
            var res = await Mediator.Send(new GetTinBaiQuery(id));
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
    [OpenApiOperation("Sửa một tin bài", "")]
    public async Task<ActionResult> Update(UpdateTinBaiCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một tin bài ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteTinBaiCommand req, Guid id)
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
    [OpenApiOperation("khôi phục một tin bài ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreTinBaiCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
