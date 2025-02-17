using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Queries;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan.Command;
using TD.DichVuCongApi.Application.Statistics.TongHopDonVi;

namespace TD.DichVuCongApi.Host.Controllers.Statistics;
public class DinhDanhCongDanController : VersionedApiController
{

    [Authorize]
    [HttpGet("danhSachTaiKhoan")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Danh sách tài khoản công dân", "")]
    public async Task<ActionResult> SearchTaiKhoanCongDan([FromQuery] SearchTaiKhoanQuery req)
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
    [HttpGet("DetailTaiKhoanCongDan")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Chi tiết tài khoản công dân")]
    public async Task<ActionResult> GetTaiKhoanTaiKhoanCongDan([FromQuery] GetTaiKhoanQuery request)
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

    [Authorize]
    [HttpGet("DataChartDinhDanhCongDan")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Dữ liệu biểu đồ quản lý định danh công dân", "")]
    public async Task<ActionResult> getDataChart([FromQuery] GetDataChartQuery req)
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
    [HttpGet("thongKeTrenCongDVCtinh")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Thống kê tài khoản công dân trên cổng DVC tỉnh", "")]
    public async Task<ActionResult> ThongKeTaiKhoanCongDanCongDVC([FromQuery] ThongKeTaiKhoanTrenCongDVCCommand req)
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
    [HttpPatch("DeleteSoDinhDanh{id:guid}")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Xóa số định danh của người dùng", "")]
    public async Task<ActionResult> DeleteDinhDanhUser(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new DeleteDinhDanhUserCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPatch("ToggleLockoutUser{id:guid}")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Bật/Xóa quyền truy cập người dùng", "")]
    public async Task<ActionResult> ToggleLockoutUser(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new LockoutUserCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("ExportExcelThongKeDinhDanh")]
    [OpenApiOperation("Xuất excel thống kê định danh công dân", "")]
    public async Task<ActionResult> ExportExcelDinhDanhCongDanCommand([FromQuery] ExportExcelDinhDanhCongDanCommand req)
    {
        try
        {
            string res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
