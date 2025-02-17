using TD.DichVuCongApi.Application.Business.ActionApp.Queries;
using TD.DichVuCongApi.Application.Business.VBDLIS.CapNhatKetQuaTraHoSoGuiVBDLIS;
using TD.DichVuCongApi.Application.Business.VBDLIS.CapNhatTrangThaiBoSungHoSo;
using TD.DichVuCongApi.Application.Business.VBDLIS.DanhMucNguoiDung;
using TD.DichVuCongApi.Application.Business.VBDLIS.DanhMucThuTuc;
using TD.DichVuCongApi.Application.Business.VBDLIS.DanhMucTrangThai;
using TD.DichVuCongApi.Application.Business.VBDLIS.PhanHoiHoSoSaiKetQuaGuiVBDLIS;
using TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
using TD.DichVuCongApi.Application.Business.VBDLIS.TiepNhanHoSoGuiVBDLIS;

namespace TD.DichVuCongApi.Host.Controllers.Business;

public class VBDLISController : VersionedApiController
{
    [AllowAnonymous]
    [HttpGet("GetDanhMucNguoiDung")]
    [OpenApiOperation("Danh mục người dùng VBDLIS")]
    public async Task<ActionResult> Search([FromQuery] DanhMucNguoiDungVBDLISRequest req)
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
    [HttpGet("GetDanhMucThuTuc")]
    [OpenApiOperation("Danh mục thủ tục VBDLIS")]
    public async Task<ActionResult> SearchThuTuc([FromQuery] DanhMucThuTucVBDLISRequest req)
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
    [HttpGet("GetDanhMucTrangThai")]
    [OpenApiOperation("Danh mục trạng thái hồ sơ VBDLIS")]
    public async Task<ActionResult> SearchTrangThai([FromQuery] DanhMucTrangThaiVBDLISRequest req)
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

    // API cung cấp cho hệ thống VBDLIS
    [AllowAnonymous]
    [HttpPost("ChuyenHoSo/{securityCode}")]
    [OpenApiOperation("Tiếp nhận hồ sơ gửi VBDLIS")]
    public async Task<ActionResult> TiepNhanGuiVBDLIS(string securityCode, [FromBody] VBDLISDongBoTrangThaiLuanChuyenHoSoRequest req)
    {
        try
        {
            req.SecurityCode = securityCode;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("YeuCauBoSungHoSo/{securityCode}")]
    [OpenApiOperation("API đồng bộ trạng thái chờ bổ sung")]
    public async Task<ActionResult> VBDLISDongBoTrangThaiChoBoSung(string securityCode, [FromBody] VBDLISDongBoTrangThaiChoBoSungRequest req)
    {
        try
        {
            req.SecurityCode = securityCode;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("NhanBoSungHoSo/{securityCode}")]
    [OpenApiOperation("API đồng bộ trạng thái đã nhận bổ sung và ngày hẹn trả mới")]
    public async Task<ActionResult> VBDLISDongBoTrangThaiDaBoSung(string securityCode, [FromBody] VBDLISDongBoTrangThaiDaBoSungRequest req)
    {
        try
        {
            req.SecurityCode = securityCode;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("GuiKetQuaThue/{securityCode}")]
    [OpenApiOperation("API đồng bộ kết quả thuế")]
    public async Task<ActionResult> VBDLISDongBoKetQuaThue(string securityCode, [FromBody] VBDLISDongBoKetQuaThueRequest req)
    {
        try
        {
            req.SecurityCode = securityCode;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("KetThucHoSo/{securityCode}")]
    [OpenApiOperation("API đồng bộ trạng thái kết thúc")]
    public async Task<ActionResult> VBDLISDongBoTrangThaiKetThuc(string securityCode, [FromBody] VBDLISDongBoTrangThaiKetThucRequest req)
    {
        try
        {
            req.SecurityCode = securityCode;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("TiepNhanHoSoChoMotCua/{securityCode}")]
    [OpenApiOperation("API cung cấp số biên nhận")]
    public async Task<ActionResult> VBDLISCungCapSoBienNhan(string securityCode, [FromBody] VBDLISCungCapSoBienNhanRequest req)
    {
        try
        {
            req.SecurityCode = securityCode;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500,ex?.InnerException?.Message ?? ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("YeuCauCapNhatHoSo/{securityCode}")]
    [OpenApiOperation("Tiếp nhận hồ sơ gửi VBDLIS")]
    public async Task<ActionResult> YeuCauCapNhatHoSoVBDLIS(string securityCode, [FromBody] VBDLISYeuCauCapNhatHoSoRequest req)
    {
        try
        {
            req.SecurityCode = securityCode;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    // API xử lý hồ sơ gửi VBDLIS

    [Authorize]
    [HttpPost("TiepNhanGuiVBDLIS")]
    [OpenApiOperation("API đồng bộ trạng thái luân chuyển hồ sơ")]
    public async Task<ActionResult> TiepNhanGuiVBDLIS([FromBody]TiepNhanHoSoGuiVBDLISRequest req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex?.InnerException?.Message ?? ex.Message);
        }
    }

    [Authorize]
    [HttpPost("CapNhatKetQuaTraHoSoGuiVBDLIS")]
    [OpenApiOperation("Cập nhật kết quả trả hồ sơ gửi VBDLIS")]
    public async Task<ActionResult> CapNhatKetQuaTraHoSoGuiVBDLIS(CapNhatKetQuaTraHoSoGuiVBDLISRequest req)
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
    [HttpPost("CapNhatTrangThaiBoSungHoSoGuiVBDLIS")]
    [OpenApiOperation("Cập nhật trạng thái bổ sung hồ sơ gửi VBDLIS")]
    public async Task<ActionResult> CapNhatTrangThaiBoSungHoSoGuiVBDLIS(CapNhatTrangThaiBoSungHoSoGuiVBDLISRequest req)
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
    [HttpPost("PhanHoiHoSoSaiKetQuaGuiVBDLIS")]
    [OpenApiOperation("Phản hồi hồ sơ sai kết quả gửi VBDLIS")]
    public async Task<ActionResult> PhanHoiHoSoSaiKetQuaGuiVBDLIS(PhanHoiHoSoSaiKetQuaGuiVBDLISRequest req)
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
