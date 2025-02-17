using TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuDvcTrucTuyen;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuSoHoa;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuTienDo;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuTTTT;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766.TTHC;

namespace TD.DichVuCongApi.Host.Controllers.Statistics;

public class QuyetDinh766Controller : VersionedApiController
{
    [Authorize]
    [HttpPost("TienDoGiaiQuyet")]
    [OpenApiOperation("Thống kê báo cáo tiến độ giải quyết theo quyết định 766")]
    public async Task<ActionResult> BaoCaoTongHopTienDoGiaiQuyet(QuyetDinh766TienDoGiaiQuyetRequest request)
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
    [HttpPost("DVCTT")]
    [OpenApiOperation("Thống kê báo cáo dịch vụ công trực tuyến theo quyết định 766")]
    public async Task<ActionResult> BaoCaoTongHopDVCTT(QuyetDinh766DVCTTRequest request)
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
    [HttpPost("TTTT")]
    [OpenApiOperation("Thống kê báo cáo thanh toán trực tuyến theo quyết định 766")]
    public async Task<ActionResult> BaoCaoTongHopTTTT(QuyetDinh766TTTTRequest request)
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
    //[Authorize]
    [AllowAnonymous]
    [HttpPost("ChiTieuTTTT")]
    [OpenApiOperation("Thống kê báo cáo thanh toán trực tuyến theo quyết định 766")]
    public async Task<ActionResult> BaoCaoTongHopChiTieuTTTT(QuyetDinh766ChiTieuTTTTRequest request)
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
    //[Authorize]
    [AllowAnonymous]
    [HttpPost("ChiTieuTienDo")]
    [OpenApiOperation("Thống kê báo cáo tiến độ theo quyết định 766")]
    public async Task<ActionResult> BaoCaoTongHopChiTieuTienDo(QuyetDinh766ChiTieuTienDoRequest request)
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
    //[Authorize]
    [AllowAnonymous]
    [HttpPost("ChiTieuDvcTrucTuyen")]
    [OpenApiOperation("Thống kê báo cáo Dvc trực tuyến theo quyết định 766")]
    public async Task<ActionResult> BaoCaoTongHopChiTieuDvcTrucTuyen(QuyetDinh766ChiTieuDvcTrucTuyenRequest request)
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
    //[Authorize]
    [AllowAnonymous]
    [HttpPost("ChiTieuSoHoa")]
    [OpenApiOperation("Thống kê báo cáo tiến độ theo quyết định 766")]
    public async Task<ActionResult> BaoCaoTongHopChiTieuSoHoa(QuyetDinh766ChiTieuSoHoaRequest request)
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
    [HttpPost("ThongKeTTHC")]
    [OpenApiOperation("Thống kê báo cáo theo TTHC")]
    public async Task<ActionResult> ThongKeTTHC(ThongKeTTHCRequest request)
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
    //[Authorize]
    [AllowAnonymous]
    [HttpPost("ChiTieuTTTT2")]
    [OpenApiOperation("Thống kê báo cáo thanh toán trực tuyến theo quyết định 766 2")]
    public async Task<ActionResult> BaoCaoTongHopChiTieuTTTT2(QuyetDinh766ChiTieuTTTT2Request request)
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
