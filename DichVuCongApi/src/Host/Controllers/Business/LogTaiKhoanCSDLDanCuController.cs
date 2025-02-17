using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.LogCSDLDanCuDoanhNghiepApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class LogTaiKhoanCSDLDanCuDoanhNghiepController : VersionedApiController
{
    [Authorize]
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu theo LogTaiKhoanCSDLDanCu theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchLogCSDLDanCuDoanhNghiep req)
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
    [OpenApiOperation("Lấy dữ liệu theo LogTaiKhoanCSDLDanCu theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetLogCSDLDanCuDoanhNghiepQuery(id));
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
    [HttpGet("Statistic")]
    [OpenApiOperation("Thống kê số lượng nhóm theo đơn vị", "")]
    public async Task<ActionResult> Statistic([FromQuery] StatisticLogCSDLDanCuDoanhNghiepQuery req)
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
