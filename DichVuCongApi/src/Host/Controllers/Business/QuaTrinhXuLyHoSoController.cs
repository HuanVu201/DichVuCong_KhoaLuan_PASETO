using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.QuaTrinhXuLyHoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.QuaTrinhXuLyHoSoApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class QuaTrinhXuLyHoSoController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một quá trình xử lý hồ sơ ", "")]
    public async Task<ActionResult> Add(AddQuaTrinhXuLyHoSoCommand req)
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
    [OpenApiOperation("Lấy dữ liệu quá trình xử lý hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchQuaTrinhXuLyHoSoQuery req)
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
    [OpenApiOperation("Lấy dữ liệu quá trình xử lý hồ sơ theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetQuaTrinhXuLyHoSoQuery(id));
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
    [OpenApiOperation("Sửa một quá trình xử lý hồ sơ", "")]
    public async Task<ActionResult> Update(UpdateQuaTrinhXuLyHoSoCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một quá trình xử lý hồ sơ ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteQuaTrinhXuLyHoSoCommand req, DefaultIdType id)
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
    [OpenApiOperation("khôi phục một quá trình xử lý hồ sơ ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreQuaTrinhXuLyHoSoCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
