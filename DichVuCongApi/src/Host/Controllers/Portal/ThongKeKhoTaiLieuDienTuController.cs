using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Portal.ThongKeKhoTaiLieuApp.Commands;
using TD.DichVuCongApi.Application.Portal.ThongKeKhoTaiLieuApp.Queries;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan.Command;

namespace TD.DichVuCongApi.Host.Controllers.Portal;
public class ThongKeKhoTaiLieuDienTuController : VersionedApiController
{
    [Authorize]
    [HttpGet("FilterThongKeKhoTaiLieu")]
    //[MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Thống kê kho tài liệu điện tử theo bộ lọc", "")]
    public async Task<ActionResult> FilterThongKeKhoQuery([FromQuery] FilterThongKeKhoQuery req)
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
    [HttpGet("DataChartKhoTaiLieuDienTu")]
    //[MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Dữ liệu biểu đồ kho tài liệu điện tử", "")]
    public async Task<ActionResult> getDataChart([FromQuery] GetDataChartThongKeKhoTaiLieuQuery req)
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
    [HttpGet("ExportExcelThongKeKhoTaiLieu")]
    [OpenApiOperation("Xuất excel thống kê sử dụng kho tài liệu điện tử", "")]
    public async Task<ActionResult> ExportExcelThongKeSuDungKhoTaiLieuCommand([FromQuery] ExportExcelThongKeSuDungKhoTaiLieuCommand req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return new FileStreamResult(res.StreamData, res.ContentType);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
