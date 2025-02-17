using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Portal.TaiLieuGiayToCaNhanApp.Commands;
using TD.DichVuCongApi.Application.Portal.TaiLieuGiayToCaNhanApp.Queries;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

namespace TD.DichVuCongApi.Host.Controllers.Portal;
public class TaiLieuGiayToCaNhanController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một TaiLieuGiayToCaNhan ", "")]
    public async Task<ActionResult> Add(AddTaiLieuGiayToCaNhanCommand req)
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
    [OpenApiOperation("Lấy dữ liệu TaiLieuGiayToCaNhan theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchTaiLieuGiayToCaNhanQuery req)
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
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một TaiLieuGiayToCaNhan ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteTaiLieuGiayToCaNhanCommand req, DefaultIdType id)
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
    [HttpGet("GetDataChartTaiLieuCaNhan")]
    [OpenApiOperation("Dữ liệu biểu đồ quản lý tài liệu công dân", "")]
    public async Task<ActionResult> getDataChart([FromQuery] GetDataChartTaiLieuCaNhanQuery req)
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
