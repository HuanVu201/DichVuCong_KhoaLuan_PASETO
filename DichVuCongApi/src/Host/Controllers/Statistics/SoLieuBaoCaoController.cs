using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.Queries;
using TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.SoLieuBaoCaoHienTaiJob;
using TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.SoLieuBaoCaoTheoKyJob;
using static TD.DichVuCongApi.Application.Catalog.ThuTucApp.Service;
using static TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.SoLieuBaoCaoHienTaiJob.TaskSoLieuBaoCaoHienTaiService;
using static TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.SoLieuBaoCaoTheoKyJob.TaskSoLieuBaoCaoTheoKyService;

namespace TD.DichVuCongApi.Host.Controllers.Statistics;
public class SoLieuBaoCaoController : VersionedApiController
{
    [AllowAnonymous]
    [HttpGet("SoLieuThongKeDonViTheoKy")]
    [OpenApiOperation("Số liệu thống kê các đơn vị")]
    public async Task<ActionResult> SoLieuThongKeTheoDonVi([FromQuery] SoLieuThongKeDonViTheoKyRequest request)
    {
        try
        {
            var res = await Mediator.Send(request);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("SoLieuThongKeHienTaiTheoDonVi")]
    [OpenApiOperation("Số liệu thống kê hiện tại các đơn vị")]
    public async Task<ActionResult> SoLieuThongKeHienTaiTheoDonVi([FromQuery] SoLieuThongKeHienTaiTheoDonViRequest request)
    {
        try
        {
            var res = await Mediator.Send(request);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("TaskSoLieuThongKeTheoKy")]
    [OpenApiOperation("TaskSoLieuThongKeTheoKy", "")]
    public async Task<ActionResult> TaskSoLieuThongKeTheoKy([FromQuery] TaskSoLieuThongKeTheoKy req)
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
    [HttpPost("TaskSoLieuThongKeHienTai")]
    [OpenApiOperation("TaskSoLieuThongKeHienTai", "")]
    public async Task<ActionResult> TaskSoLieuThongKeHienTai([FromQuery] TaskSoLieuThongKeHienTai req)
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
    [HttpGet("SearchSoLieuBaoCaoTheoKy")]
    [OpenApiOperation("Lấy dữ liệu báo cáo theo kỳ theo bộ lọc", "")]
    public async Task<ActionResult> SearchSoLieuBaoCaoTheoKyQuery([FromQuery] SearchSoLieuBaoCaoTheoKyQuery req)
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
    [HttpGet("GetCoordinates")]
    [OpenApiOperation("Lấy dữ liệu Coordinates theo bộ lọc", "")]
    public async Task<ActionResult> GetCoordinatesQuery([FromQuery] GetCoordinatesQuery req)
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
    [HttpGet("SearchSoLieuBaoCaoHienTai")]
    [OpenApiOperation("Lấy dữ liệu báo cáo hiện tại theo bộ lọc", "")]
    public async Task<ActionResult> SearchSoLieuBaoCaoHienTaiQuery([FromQuery] SearchSoLieuBaoCaoHienTaiQuery req)
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
