using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.ActionApp.Queries;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Commands;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Queries;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.HoSoNhapApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoNhapApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class HoSoNhapController : VersionedApiController
{
    [Authorize]
    [HttpPost("NopTrucTuyen/{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ nháp và đưa nó thành hồ sơ trực tuyến", "")]
    public async Task<ActionResult> NopTrucTuyen(NopHoSoCommand req, Guid id)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req);
            if (res.Succeeded)
            {
                return Ok(res);
            }
            return BadRequest(new Result() { Message = res.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpGet("{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ nháp theo mã Id", "")]
    public async Task<ActionResult> Get([FromQuery] GetHoSoNhapQuery req)
    {
        try
        {
            var res = await Mediator.Send(req);
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
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu hồ sơ nháp theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchHoSoNhapQuery req)
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
    [HttpPost]
    [OpenApiOperation("Thêm một hồ sơ nháp ", "")]
    public async Task<ActionResult> Add(AddHoSoNhapCommand req)
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
    [HttpPut("{id:guid}")]
    [OpenApiOperation("Sửa một hồ sơ nháp ", "")]
    public async Task<ActionResult> Update(UpdateHoSoNhapCommand req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

  
    [Authorize]
    [HttpDelete]
    [OpenApiOperation("Xóa vĩnh viễn một hồ sơ nháp ", "")]
    public async Task<ActionResult> Delete([FromBody] DeleteHoSoNhapCommand req)
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
