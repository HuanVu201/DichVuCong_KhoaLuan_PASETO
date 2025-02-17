using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaChiaSeApp.Commands;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaChiaSeApp.Queries;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class GiayToSoHoaChiaSeController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một giấy tờ số hóa chia sẻ ", "")]
    public async Task<ActionResult> Add(AddGiayToSoHoaChiaSeCommand req)
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
    [OpenApiOperation("Lấy dữ liệu giấy tờ số hóa chia sẻ theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchGiayToSoHoaChiaSeQuery req)
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
    [HttpPut("{id:guid}")]
    [OpenApiOperation("Sửa một giấy tờ số hóa chia sẻ", "")]
    public async Task<ActionResult> Update(UpdateGiayToSoHoaChiaSeCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một giấy tờ số hóa chia sẻ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteGiayToSoHoaChiaSeCommand req, Guid id)
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
    [OpenApiOperation("Khôi phục một giấy tờ số hóa chia sẻ ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreGiayToSoHoaChiaSeCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
