using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.PhienBanGiayToSoHoaKhoTaiLieuDienTuApp.Commands;
using TD.DichVuCongApi.Application.Business.PhienBanGiayToSoHoaKhoTaiLieuDienTuApp.Queries;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class PhienBanGiayToSoHoaKhoTaiLieuDienTu : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một kho tài liệu điện tử ", "")]
    public async Task<ActionResult> Add(AddPhienBanGiayToSoHoaKhoTaiLieuDienTuCommand req)
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
    [OpenApiOperation("Lấy dữ liệu kho tài liệu điện tử theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchPhienBanGiayToSoHoaKhoTaiLieuDienTuQuery req)
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
    [OpenApiOperation("Sửa một kho tài liệu điện tử", "")]
    public async Task<ActionResult> Update(UpdatePhienBanGiayToSoHoaKhoTaiLieuDienTuCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một kho tài liệu điện tử", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeletePhienBanGiayToSoHoaKhoTaiLieuDienTuCommand req, Guid id)
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
    [OpenApiOperation("Khôi phục một kho tài liệu điện tử ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestorePhienBanGiayToSoHoaKhoTaiLieuDienTuCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}

