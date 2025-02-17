using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.GiayToHoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.GiayToHoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
using TD.DichVuCongApi.Application.Common.Exceptions;


namespace TD.DichVuCongApi.Host.Controllers.Business;
public class GiayToHoSoController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một Giấy tờ hồ sơ ", "")]
    public async Task<ActionResult> Add(AddGiayToHoSoCommand req)
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
    [OpenApiOperation("Lấy dữ liệu Giấy tờ hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchGiayToHoSoQuery req)
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
    [OpenApiOperation("Lấy dữ liệu Giấy tờ hồ sơ theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetGiayToHoSoQuery(id));
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
    [OpenApiOperation("Sửa Giấy tờ hồ sơ", "")]
    public async Task<ActionResult> Update(UpdateGiayToHoSoCommand req, Guid id)
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
    [HttpPut("updateWithMaGiayTo")]
    [OpenApiOperation("Sửa Giấy tờ hồ sơ với mã giấy tờ", "")]
    public async Task<ActionResult> UpdateWithMaGiayTo(UpdateGTHSWithMaGiayToCommand req)
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
}
