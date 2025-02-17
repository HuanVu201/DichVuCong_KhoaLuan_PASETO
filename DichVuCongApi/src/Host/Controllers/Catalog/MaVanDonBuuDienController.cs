using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Commands;
using TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;


namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class MaVanDonBuuDienController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một mã vận đơn bưu điện ", "")]
    public async Task<ActionResult> Add(AddMaVanDonBuuDienCommand req)
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
    [OpenApiOperation("Lấy dữ liệu mã vận đơn bưu điện theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchMaVanDonBuuDienQuery req)
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
    [OpenApiOperation("Lấy dữ liệu mã vận đơn bưu điện theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetMaVanDonBuuDienQuery(id));
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
    [OpenApiOperation("Sửa một mã vận đơn bưu điện", "")]
    public async Task<ActionResult> Update(UpdateMaVanDonBuuDienCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn mộtmã vận đơn bưu điện ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteMaVanDonBuuDienCommand req, Guid id)
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
    [OpenApiOperation("khôi phục một mã vận đơn bưu điện ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreMaVanDonBuuDienCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
