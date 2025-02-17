using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class ThanhPhanHuongDanNopHoSoController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một thành phần hướng dẫn nộp hồ sơ", "")]
    public async Task<ActionResult> Add(AddThanhPhanHuongDanNopHoSoCommand req)
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
    [OpenApiOperation("Lấy dữ liệu thành phần  hướng dẫn nộp hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchThanhPhanHuongDanNopHoSoQuery req)
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
    [OpenApiOperation("Lấy dữ liệu thành phần  hướng dẫn nộp hồ sơ theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetThanhPhanHuongDanNopHoSoQuery(id));
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
    [OpenApiOperation("Sửa một thành phần hướng dẫn nộp hồ sơ", "")]
    public async Task<ActionResult> Update(UpdateThanhPhanHuongDanNopHoSoCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một thành phần  hướng dẫn nộp hồ sơ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteThanhPhanHuongDanNopHoSoCommand req, DefaultIdType id)
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
    [OpenApiOperation("khôi phục một thành phần  hướng dẫn nộp hồ sơ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreThanhPhanHuongDanNopHoSoCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
