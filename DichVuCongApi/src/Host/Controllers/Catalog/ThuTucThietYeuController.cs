using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Catalog.ThuTucThietYeuApp.Commands;
using TD.DichVuCongApi.Application.Catalog.ThuTucThietYeuApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class ThuTucThietYeuController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một thủ tục thiết yếu ", "")]
    public async Task<ActionResult> Add(AddThuTucThietYeuCommand req)
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
    [OpenApiOperation("Lấy dữ liệu thủ tục thiết yếu theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchThuTucThietYeuQuery req)
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
    [HttpGet("ThuTucThietYeuPortal")]
    [OpenApiOperation("Lấy dữ liệu thủ tục thiết yếu portal", "")]
    public async Task<ActionResult> SearchThuTucThietYeuPortalQuery([FromQuery] SearchThuTucThietYeuPortalQuery req)
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
    [OpenApiOperation("Lấy dữ liệu thủ tục thiết yếu theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetThuTucThietYeuQuery(id));
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
    [OpenApiOperation("Sửa một thủ tục thiết yếu", "")]
    public async Task<ActionResult> Update(UpdateThuTucThietYeuCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một thủ tục thiết yếu", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteThuTucThietYeuCommand req, Guid id)
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
    [OpenApiOperation("khôi phục một thủ tục thiết yếu ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreThuTucThietYeuCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
