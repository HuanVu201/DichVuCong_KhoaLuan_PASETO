using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Commands;
using TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class GiaoDichThanhToanController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một giao dịch thanh toán ", "")]
    public async Task<ActionResult> Add(AddGiaoDichThanhToanCommand req)
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
    [OpenApiOperation("Lấy dữ liệu giao dịch thanh toán theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchGiaoDichThanhToanQuery req)
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
    [HttpGet("CheckConfirmPayment/{id}")]
    [OpenApiOperation("check confirm dvc payment", "")]
    public async Task<ActionResult> CheckConfirmDvcPayment(DefaultIdType id)
    {
        try
        {
            CheckConfirmGiaoDichThanhToan req = new CheckConfirmGiaoDichThanhToan(id);
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
    [OpenApiOperation("Lấy dữ liệu giao dịch thanh toán theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetGiaoDichThanhToanQuery(id));
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
    [AllowAnonymous]
    [HttpGet("GetByMaThamChieu/{ma}")]
    [OpenApiOperation("Lấy dữ liệu giao dịch thanh toán theo mã tham chiếu", "")]
    public async Task<ActionResult> GetByMaThamChieu(string ma)
    {
        try
        {
            var res = await Mediator.Send(new GetByMaThamChieuQuery(ma));
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
    [OpenApiOperation("Sửa một giao dịch thanh toán", "")]
    public async Task<ActionResult> Update(UpdateGiaoDichThanhToanCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một giao dịch thanh toán ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteGiaoDichThanhToanCommand req, DefaultIdType id)
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
    [OpenApiOperation("khôi phục một giao dịch thanh toán ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreGiaoDichThanhToanCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
