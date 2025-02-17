using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class ThanhPhanHoSoController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một thành phần hồ sơ", "")]
    public async Task<ActionResult> Add(AddThanhPhanHoSoCommand req)
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
    [OpenApiOperation("Lấy dữ liệu thành phần hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchThanhPhanHoSoQuery req)
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
    [HttpGet("ThanhPhanChungThucs")]
    [OpenApiOperation("Cập nhật trạng thái duyệt ký số chứng thực hồ sơ", "")]
    public async Task<ActionResult> ThanhPhanChungThuc([FromQuery] SearchThanhPhanChungThucQuery req)
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
    [HttpPut("CapNhatTrangThaiKySoChungThuc")]
    [OpenApiOperation("Cập nhật trạng thái duyệt ký số chứng thực hồ sơ", "")]
    public async Task<ActionResult> CapNhatThanhPhanHoSoChungThuc(UpdateThanhPhanChungThucHoSoCommand req)
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
    [HttpPut("CapSoVaDongDauChungThuc")]
    [OpenApiOperation("Cấp số và đóng dấu chứng thực hồ sơ", "")]
    public async Task<ActionResult> CapSoVaDongDauChungThuc(CapSoVaDongDauThanhPhanChungThucHoSoCommand req)
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
    [OpenApiOperation("Lấy dữ liệu thành phần hồ sơ theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetThanhPhanHoSoQuery(id));
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
    [OpenApiOperation("Sửa một thành phần hồ sơ", "")]
    public async Task<ActionResult> Update(UpdateThanhPhanHoSoCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một thành phần hồ sơ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteThanhPhanHoSoCommand req, DefaultIdType id)
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
    [OpenApiOperation("khôi phục một thành phần hồ sơ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreThanhPhanHoSoCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
