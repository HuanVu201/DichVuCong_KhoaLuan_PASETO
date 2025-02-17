using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.HoSoApp.ExportThongKe;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries.ThuTucNhieuDonViSuDung;

namespace TD.DichVuCongApi.Host.Controllers.Statistics;
public class ExportThongKeController : VersionedApiController
{
    [Authorize]
    [HttpGet("ExportThongKeSoTheoDoiHoSo")]
    [OpenApiOperation("Xuất thống kê Sổ theo dõi hồ sơ", "")]
    public async Task<ActionResult> ExportExcelSoTheoDoiHoSoRequest([FromQuery] ExportThongKeSoTheoDoiHoSoRequest req)
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

    [Authorize]
    [HttpGet("ExportThuTucNhieuDonViSuDung")]
    [OpenApiOperation("Xuất danh sách thủ tục nhiều đơn vị sử dụng", "")]
    public async Task<ActionResult> ExportThuTucNhieuDonViSuDung([FromQuery] XuatThuTucNhieuDonViSuDungRequest req)
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
