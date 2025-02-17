using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.BaoCaoTongHop06aCacCap;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.BaoCaoTongHop07b;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.HoSoLoiThongKe;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeLinhVucTheoDonVi;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeNguoiNopHoSo;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeThanhToan;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeTheoTruongHop;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.TongHopHoSoTheoTrangThai;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.TongHopThuTuc;
using TD.DichVuCongApi.Application.Statistics.ThongKeDonVi;
using TD.DichVuCongApi.Application.Statistics.TiepNhanBuuChinh;
using TD.DichVuCongApi.Application.Statistics.TongHopDonVi;

namespace TD.DichVuCongApi.Host.Controllers.Statistics;

public class BaoCaoTongHopController : VersionedApiController
{
    [AllowAnonymous]
    [HttpPost("DonVi")]
    [OpenApiOperation("Thống kê báo cáo tổng hợp theo đơn vị")]
    public async Task<ActionResult> BaoCaoTongHopDonVi(TongHopDonViRequest request)
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
    [HttpGet("HoSoGayLoiThongKe")]
    [OpenApiOperation("Thống kê báo cáo tổng hợp theo đơn vị")]
    public async Task<ActionResult> HoSoGayLoiThongKe([FromQuery] HoSoGayLoiThongKeRequest request)
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
    [HttpPost("TruongHop")]
    [OpenApiOperation("Thống kê báo cáo tổng hợp theo trường hợp")]
    public async Task<ActionResult> BaoCaoTongHopTheoTruongHop(ThongKeTheoTruongHopRequest request)
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
    [HttpPost("ThongKeDonVi")]
    [OpenApiOperation("Thống kê báo cáo theo đơn vị (api riêng")]
    public async Task<ActionResult> ThongKeDonViRequest(ThongKeDonViRequest request)
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
    [HttpPost("HoSoNopTuCongDVC")]
    [OpenApiOperation("Báo cáo tổng hợp hồ sơ nộp từ cổng DVC ")]
    public async Task<ActionResult> BaoCaoHoSoNopTuCongDVC(BaoCaoHoSoNopTuCongDVCRequest request)
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
    [HttpGet("TiepNhanBuuChinh")]
    [OpenApiOperation("THỐNG KÊ TIẾP NHẬN HỒ SƠ VÀ TRẢ KẾT QUẢ QUA DỊCH VỤ BƯU CHÍNH ", "")]
    public async Task<ActionResult> ThongKeHSLienThong([FromQuery] TiepNhanBuuChinhQuery req)
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
    [HttpPost("ThuTuc")]
    [OpenApiOperation("Thống kê báo cáo tổng hợp theo thủ tục")]
    public async Task<ActionResult> BaoCaoTongHopThuTuc(TongHopThuTucRequest request)
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
    [HttpPost("ThuTucTheoDonVi")]
    [OpenApiOperation("Thống kê báo cáo tổng hợp theo thủ tục")]
    public async Task<ActionResult> BaoCaoTongHopThuTucTheoDonVi(TongHopThuTucTheoDonViRequest request)
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
    [HttpPost("LinhVuc")]
    [OpenApiOperation("Thống kê báo cáo tổng hợp theo lĩnh vực")]
    public async Task<ActionResult> BaoCaoTongHopLinhVuc(TongHopLinhVucRequest request)
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
    [HttpPost("LinhVucTheoDonVi")]
    [OpenApiOperation("Thống kê báo cáo tổng hợp theo đơn vị lĩnh vực")]
    public async Task<ActionResult> ThongKeLinhVucTheoDonVi(ThongKeLinhVucTheoDonViRequest request)
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
    [HttpPost("BaoCao07b")]
    [OpenApiOperation("Thống kê báo cáo tổng hợp số 07b")]
    public async Task<ActionResult> BaoCaoTongHopSo07b(BaoCaoTongHop07bRequest request)
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
    [HttpPost("BaoCao06a")]
    [OpenApiOperation("Thống kê báo cáo tổng hợp số 06a")]
    public async Task<ActionResult> BaoCaoTongHopSo06(BaoCaoSo06aRequest request)
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
    [HttpPost("BaoCao06CacCap")]
    [OpenApiOperation("Thống kê báo cáo tổng hợp số 06a")]
    public async Task<ActionResult> BaoCaoTongHopSo06CacCap(BaoCaoSo06aCacCapRequest request)
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
    [HttpPost("BaoCao06b")]
    [OpenApiOperation("Thống kê báo cáo tổng hợp số 06b")]
    public async Task<ActionResult> BaoCaoTongHopSo06b(BaoCaoSo06bRequest request)
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
    [HttpPost("BaoCao07a")]
    [OpenApiOperation("Thống kê báo cáo tổng hợp số 07a")]
    public async Task<ActionResult> BaoCaoTongHopSo07a(BaoCaoTongHop07aRequest request)
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
    [HttpPost("SoLuongTruyCapCSDLDanCu")]
    [OpenApiOperation("Thống kê báo cáo số lượt truy cập CSDL dân cư")]
    public async Task<ActionResult> BaoCaoSoLuongTruyCapCSDLDanCu(BaoCaoSoLuongTruyCapCSDLDanCuRequest request)
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
    [HttpPost("NguoiNopHoSo")]
    [OpenApiOperation("Thống kê báo cáo số lượt người nộp hồ sơ theo giai đoạn")]
    public async Task<ActionResult> BaoCaoSoLuongNguoiNopHoSo(ThongKeNguoiNopHoSoRequest request)
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
    [HttpPost("ThanhToan/TheoDonVi")]
    [OpenApiOperation("Thống kê báo cáo thu phí, lệ phí theo đơn vị")]
    public async Task<ActionResult> ThanhToanTheoDonVi(TongHopThanhToanTheoDonViRequest request)
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
    [HttpPost("ThanhToan/TheoThuTuc")]
    [OpenApiOperation("Thống kê báo cáo thu phí, lệ phí theo thủ tục")]
    public async Task<ActionResult> ThanhToanTheoThuTuc(TongHopThanhToanTheoThuTucRequest request)
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
    [HttpPost("ThanhToan/TheoLinhVuc")]
    [OpenApiOperation("Thống kê báo cáo thu phí, lệ phí theo lĩnh vực")]
    public async Task<ActionResult> ThanhToanTheoLinhVuc(TongHopThanhToanTheoLinhVucRequest request)
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
    [HttpPost("TongHopThuTuc/PhatSinhHoSo")]
    [OpenApiOperation("Thống kê tổng hợp thủ tục phát sinh hồ sơ")]
    public async Task<ActionResult> ThuTucThuPhiLePhi(TongHopThuTucPhatSinhHoSoRequest request)
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
    [HttpPost("TongHopTheoTrangThai")]
    [OpenApiOperation("Thống kê báo cáo tổng hợp theo trạng thái")]
    public async Task<ActionResult> TrangThaiTheoTrangThai(TongHopHoSoTheoTrangThaiRequest request)
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
