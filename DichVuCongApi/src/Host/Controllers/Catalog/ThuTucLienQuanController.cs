using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Catalog.ThuTucLienQuanApp.Commands;
using TD.DichVuCongApi.Application.Catalog.ThuTucLienQuanApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class ThuTucLienQuanController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một thủ tục liên quan ", "")]
    public async Task<ActionResult> Add(AddThuTucLienQuanCommand req)
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
    [OpenApiOperation("Lấy dữ liệu thủ tục liên quan theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchThuTucLienQuanQuery req)
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
    [HttpGet("ThuTucLienQuanPortal")]
    [OpenApiOperation("Lấy dữ liệu thủ tục liên quan portal", "")]
    public async Task<ActionResult> SearchThuTucLienQuanPortalQuery([FromQuery] SearchThuTucLienQuanPortalQuery req)
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
    [OpenApiOperation("Lấy dữ liệu thủ tục liên quan theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetThuTucLienQuanQuery(id));
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
    [OpenApiOperation("Sửa một thủ tục liên quan", "")]
    public async Task<ActionResult> Update(UpdateThuTucLienQuanCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một thủ tục liên quan", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteThuTucLienQuanCommand req, Guid id)
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
    [OpenApiOperation("khôi phục một thủ tục liên quan ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreThuTucLienQuanCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
