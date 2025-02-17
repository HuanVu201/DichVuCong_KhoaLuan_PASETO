using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.HoSoTheoDonViMucDo34;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.HoSoTrucTuyenTheoThuTuc;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSo;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Host.Controllers.Statistics;

public class ThongKeHoSoTrucTuyenController : VersionedApiController
{
    [AllowAnonymous]
    [HttpGet("HoSo")]
    [OpenApiOperation("Thống kê hồ sơ trang chủ")]
    public async Task<ActionResult> ThongKeHoSoTrangChu([FromQuery] HoSoXuLyQuery request)
    {
        try
        {
            var res = await Mediator.Send(request);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("ThongKeTyLeXuLyDungHan")]
    [OpenApiOperation("Thống kê hồ sơ trang chủ với mã định danh")]
    public async Task<ActionResult> HoSoXuLyTrucTuyenWithMaDinhDanhQuery([FromQuery] HoSoXuLyTrucTuyenWithMaDinhDanhQuery request)
    {
        try
        {
            var res = await Mediator.Send(request);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("NhacViec")]
    [OpenApiOperation("Lấy dữ liệu nhắc việc của người dùng hiện tại")]
    public async Task<ActionResult> NhacViec([FromQuery] NhacViecQuery request)
    {
        try
        {
            var res = await Mediator.Send(request);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("NhacViecPortal")]
    [OpenApiOperation("Lấy dữ liệu nhắc việc của người dùng hiện tại ở ngoài cổng")]
    public async Task<ActionResult> NhacViecPortal([FromQuery] NhacViecPortalQuery request)
    {
        try
        {
            var res = await Mediator.Send(request);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("HoSoTheoKy")]
    [OpenApiOperation("Thống kê hồ sơ theo các kỳ")]
    public async Task<ActionResult> ThongKeHoSoTheoKy([FromQuery] DuLieuThongKeTheoThangQuery request)
    {
        try
        {
            var res = await Mediator.Send(request);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("DaTraKetQua")]
    [OpenApiOperation("Thống kê hồ sơ đã trả kết quả")]
    public async Task<ActionResult> ThongKeHoSoDaTraKetQua([FromQuery] DanhSachHoSoDaTraQuery request)
    {
        try
        {
            var res = await Mediator.Send(request);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("CapTinh")]
    [OpenApiOperation("THỐNG KÊ TIẾP NHẬN HỒ SƠ TRỰC TUYẾN TRÊN ĐỊA BÀN TỈNH")]
    public async Task<ActionResult> ThongKeCapTinh(HoSoTrucTuyenCapTinhRequest request)
    {
        try
        {
            var res = await Mediator.Send(request);
            return Ok(res);
        }catch(Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("TheoThuTuc")]
    [OpenApiOperation("THỐNG KÊ TIẾP NHẬN HỒ SƠ TRỰC TUYẾN THEO THỦ TỤC")]
    public async Task<ActionResult> ThongKeTheoThuTuc(HoSoTrucTuyenTheoThuTucRequest request)
    {
        try
        {
            var res = await Mediator.Send(request);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("CapHuyen")]
    [OpenApiOperation("THỐNG KÊ VIỆC TIẾP NHẬN HỒ SƠ TRỰC TUYẾN CỦA UBND CẤP QUẬN, HUYỆN")]
    public async Task<ActionResult> ThongKeCapHuyen(HoSoTrucTuyenCapHuyenRequest request)
    {
        try
        {
            var res = await Mediator.Send(request);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("TheoMucDo34")]
    [OpenApiOperation("THỐNG KÊ VIỆC TIẾP NHẬN HỒ SƠ TRỰC TUYẾN THEO MỨC ĐỘ 3,4")]
    public async Task<ActionResult> ThongKeTheoMucDo34(HoSoTheoDonViMucDo34Request request)
    {
        try
        {
            var res = await Mediator.Send(request);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("CapXa")]
    [OpenApiOperation("THỐNG KÊ VIỆC TIẾP NHẬN HỒ SƠ TRỰC TUYẾN CỦA UBND CẤP XÃ, PHƯỜNG")]
    public async Task<ActionResult> ThongKeCapXa(HoSoTrucTuyenCapXaRequest request)
    {
        try
        {
            var res = await Mediator.Send(request);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("HoSoQuaHan")]
    [OpenApiOperation("THỐNG KÊ VIỆC DANH SÁCH HỒ SƠ QUÁ HẠN")]
    public async Task<ActionResult> ThongKeHoSoQuaHan(ThongKeHoSoQuaHanRequest request)
    {
        try
        {
            var res = await Mediator.Send(request);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
