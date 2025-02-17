using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Commands;
using TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class DonViThuTucController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một đơn vị thủ tục ", "")]
    public async Task<ActionResult> Add(AddDonViThuTucCommand req)
    {
        try
        {
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
    [HttpPost("AddMulti")]
    [OpenApiOperation("Thêm nhiều đơn vị thủ tục ", "")]
    public async Task<ActionResult> AddMulti(AddMultiDonViThuTuc req)
    {
        try
        {
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
    [HttpPost("AddMultiByCapThucHien")]
    [OpenApiOperation("Thêm nhiều đơn vị thủ tục theo cấp thực hiện ", "")]
    public async Task<ActionResult> AddMultiByCapThucHien(AddDonViThuTucTheoCapThucHien req)
    {
        try
        {
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
    [HttpPost("DelMulti")]
    [OpenApiOperation("Thêm nhiều đơn vị thủ tục ", "")]
    public async Task<ActionResult> DelMulti(DelMultiDonViThuTuc req)
    {
        try
        {
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
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu đơn vị thủ tục theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchDonViThuTucQuery req)
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
    [HttpGet("public")]
    [OpenApiOperation("Lấy dữ liệu đơn vị thủ tục theo bộ lọc", "")]
    public async Task<ActionResult> SearchPubic([FromQuery] SearchDonViThuTucPublicQuery req)
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
    [OpenApiOperation("Lấy dữ liệu đơn vị thủ tục theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetDonViThuTucQuery(id));
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
    [OpenApiOperation("Sửa một đơn vị thủ tục", "")]
    public async Task<ActionResult> Update(UpdateDonViThuTucCommand req, Guid id)
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
    [HttpPut("UpdateMulti")]
    [OpenApiOperation("Sửa nhiều đơn vị thủ tục ", "")]
    public async Task<ActionResult> UpdateMulti(UpdateMultiDonViThuTuc req)
    {
        try
        {
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
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một đơn vị thủ tục ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteDonViThuTucCommand req, Guid id)
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
    [OpenApiOperation("khôi phục một đơn vị thủ tục ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreDonViThuTucCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
