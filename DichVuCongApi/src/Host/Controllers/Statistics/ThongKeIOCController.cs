using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.ThongKeIOC;
using TD.DichVuCongApi.Application.Statistics.TongHopDonVi;

namespace TD.DichVuCongApi.Host.Controllers.Statistics;
public class ThongKeIOCController : VersionedApiController
{
    [AllowAnonymous]
    [HttpGet("ThongKeTheoTrangThaiHoSo")]
    [OpenApiOperation("Thống kê danh sách hồ sơ theo trạng thái")]
    public async Task<ActionResult> DanhSachHoSoTheoTrangThaiQuery([FromQuery] DanhSachHoSoTheoTrangThaiQuery req)
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
    [HttpGet("ThongKeThangChiTiet")]
    [OpenApiOperation("Thống kê chi tiết theo tháng")]
    public async Task<ActionResult> ThongKeThangChiTietQuery([FromQuery] ThongKeThangChiTietQuery request)
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
    [HttpGet("ThongKeHoSoTheoNgay")]
    [OpenApiOperation("Thống kê hồ sơ theo ngày")]
    public async Task<ActionResult> ThongKeHoSoTheoNgayQuery([FromQuery] ThongKeHoSoTheoNgayQuery request)
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
    [HttpGet("ThongKeThang")]
    [OpenApiOperation("Thống kê theo tháng")]
    public async Task<ActionResult> ThongKeThangQuery([FromQuery] ThongKeThangQuery request)
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
    [HttpGet("ThongKeNam")]
    [OpenApiOperation("Thống kê theo năm")]
    public async Task<ActionResult> ThongKeNamQuery([FromQuery] ThongKeNamQuery request)
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
}
