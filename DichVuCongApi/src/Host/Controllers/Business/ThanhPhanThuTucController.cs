using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Commands;
using TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class ThanhPhanThuTucController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một thành phần thủ tục", "")]
    public async Task<ActionResult> Add(AddThanhPhanThuTucCommand req)
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
    [HttpPost("UpdateThanhPhanThuTucCSDLTTHC")]
    [OpenApiOperation("Cập nhật thành phần thủ tục CSDLTTHC", "")]
    public async Task<ActionResult> UpdateThanhPhanThuTucCSDLTTHC(UpdateThanhPhanThuTucCSDLCommand req)
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
    [HttpPost("DeleteMultiThanhPhanThuTuc")]
    [OpenApiOperation("Xóa nhiều thành phần thủ tục", "")]
    public async Task<ActionResult> DeleteMultiThanhPhanThuTuc(DeleteMultiThanhPhanThuTucCommand req)
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
    [OpenApiOperation("Lấy dữ liệu thành phần thủ tục theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchThanhPhanThuTucQuery req)
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
    [OpenApiOperation("Lấy dữ liệu thành phần thủ tục theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetThanhPhanThuTucQuery(id));
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
    [OpenApiOperation("Sửa một thành phần thủ tục", "")]
    public async Task<ActionResult> Update(UpdateThanhPhanThuTucCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một thành phần thủ tục", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteThanhPhanThuTucCommand req, DefaultIdType id)
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
    [OpenApiOperation("khôi phục một thành phần thủ tục", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreThanhPhanThuTucCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
