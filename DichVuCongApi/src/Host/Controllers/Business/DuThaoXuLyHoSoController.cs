using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class DuThaoXuLyHoSoController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một bổ sung dự thảo xử lý hồ sơ", "")]
    public async Task<ActionResult> BoSungDuThaoXuLyHoSo(AddDuThaoXuLyHoSoCommand req)
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
    [HttpPut("DuyetThongQua/{id:guid}")]
    [OpenApiOperation("Duyệt thông qua dự thảo xử lý hồ sơ", "")]
    public async Task<ActionResult> DuyetThongQuaDuThaoCommand(DuyetThongQuaDuThaoCommand req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
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
    [HttpPut("TuChoiDuThao/{id:guid}")]
    [OpenApiOperation("Duyệt thông qua dự thảo xử lý hồ sơ", "")]
    public async Task<ActionResult> TuChoiDuThaoCommand(TuChoiDuThaoCommand req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
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
    [HttpPut("TraLaiXinRutKhongKyDuyet/{id:guid}")]
    [OpenApiOperation("Trả lại xin rút không trình ký qua TDO", "")]
    public async Task<ActionResult> XinRutTraLaiKhongTrinhKy([FromBody] TraLaiXinRutKhongKyDuyetCommand req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
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
    [OpenApiOperation("Tìm kiếm dự thảo xử lý hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> SearchDuThaoXuLyHoSo([FromQuery] SearchDuThaoXuLyHoSoQuery req)
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
    [OpenApiOperation("Lấy dữ liệu dự thảo theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetDuThaoXuLyHoSoByIdQuery(id));
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
    [OpenApiOperation("Sửa một dự thảo", "")]
    public async Task<ActionResult> Update(UpdateDuThaoCommand req, Guid id)
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

}
