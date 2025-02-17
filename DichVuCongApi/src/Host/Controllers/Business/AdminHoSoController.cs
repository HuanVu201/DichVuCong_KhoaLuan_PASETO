using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;

namespace TD.DichVuCongApi.Host.Controllers.Business;

public class AdminHoSoController : VersionedApiController
{
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong + "," + TDResource.NhomQuanTriDonVi)]
    [Authorize]
    [OpenApiIgnore]
    [HttpPut("DatLaiNgayHenTra/{id:guid}")]

    [OpenApiOperation("Đặt lại ngày hẹn trả hồ sơ", "")]
    public async Task<ActionResult> Update(DatLaiNgayHenTraCommand req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req);
            if (res.Succeeded)
            {
                return Ok(res);
            }
            return BadRequest(new Result() { Message = res.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong + "," + TDResource.NhomQuanTriDonVi)]
    [Authorize]
    [OpenApiIgnore]
    [HttpPut("DatLaiQuyTrinhXuLy/{id:guid}")]

    [OpenApiOperation("Đặt lại ngày hẹn trả hồ sơ", "")]
    public async Task<ActionResult> UpdateQuyTrinh(DatLaiQuyTrinhXuLyCommand req, DefaultIdType id)
    {
        try
        {
            req.HoSoId = id;
            var res = await Mediator.Send(req);
            if (res.Succeeded)
            {
                return Ok(res);
            }
            return BadRequest(new Result() { Message = res.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [OpenApiIgnore]
    [HttpPut("Update/{id:guid}")]

    [OpenApiOperation("Update hồ sơ", "")]
    public async Task<ActionResult> AdminUpdateHoSos(AdminUpdateHoSo req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req);
            if (res.Succeeded)
            {
                return Ok(res);
            }
            return BadRequest(new Result() { Message = res.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [OpenApiIgnore]
    [HttpGet("{id}")]
    [OpenApiOperation("Admin lấy chi tiết hồ sơ", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {

        try
        {
            var res = await Mediator.Send(new AdminGetHoSo(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong + "," + TDResource.NhomQuanTriDonVi)]
    [Authorize]
    [OpenApiIgnore]
    [HttpGet("YeuCauThanhToan/{id}")]
    [OpenApiOperation("Admin lấy chi tiết yêu cầu thanh toán", "")]
    public async Task<ActionResult> GetYeuCauThanhToan(DefaultIdType id)
    {

        try
        {
            var res = await Mediator.Send(new AdminGetYeuCauThanhToan(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong + "," + TDResource.NhomQuanTriDonVi)]
    [Authorize]
    [OpenApiIgnore]
    [HttpPut("YeuCauThanhToan/Update/{id:guid}")]
    [OpenApiOperation("Admin cập nhật yêu cầu thanh toán", "")]
    public async Task<ActionResult> GetYeuCauThanhToan(AdminUpdateYeuCauThanhToan req, DefaultIdType id)
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
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong + "," + TDResource.NhomQuanTriDonVi)]
    [HttpPost("KetThucXuLyNhieuHoSos")]
    [OpenApiOperation("Admin kết thúc xử lý nhiều hồ sơ", "")]
    public async Task<ActionResult> KetThucXuLyNhieuHoSos(KetThucXuLyNhieuHoSosRequest req)
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
