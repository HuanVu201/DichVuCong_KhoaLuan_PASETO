using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class YeuCauThanhToanController : VersionedApiController
{
    private IYeuCauThanhToanServices _yeuCauThanhToanServices;
    public YeuCauThanhToanController(IYeuCauThanhToanServices yeuCauThanhToanServices)
    {
        _yeuCauThanhToanServices = yeuCauThanhToanServices;
    }
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một yêu cầu thanh toán ", "")]
    public async Task<ActionResult> Add(AddYeuCauThanhToanCommand req)
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
    [Authorize]
    [HttpPost("YeuCauThuSau")]
    [OpenApiOperation("Thu sau một yêu cầu thanh toán ", "")]
    public async Task<ActionResult> AddThuSauYeuCauThanhToan(AddThuSauYeuCauThanhToan req)
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
    [HttpPost("InitDvcPayment")]
    [OpenApiOperation("Khởi tạo yêu cầu thanh toán trên cổng dịch vụ công quốc gia ", "")]
    public async Task<ActionResult> InitPaymentDVC(InitDvcYeuCauThanhToanRequest model)
    {
        try
        {
            var res = await _yeuCauThanhToanServices.InitDvcPayment(model);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex?.InnerException?.Message ?? ex.Message);
        }
    }
    [AllowAnonymous]
    [HttpPost("/DvcPayment/Confirm")]
    [OpenApiOperation("API Nhận kết quả giao dịch thanh toán trên cổng dịch vụ công quốc gia ", "")]
    public async Task<ActionResult> ConfirmPaymentDVC(ConfirmDvcPaymentCommand model)
    {
        try
        {
            var res = await Mediator.Send(model);
            return StatusCode(200, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.InnerException.Message);
        }
    }
    [Authorize]
    [HttpPost("UpdateBienLai")]
    [OpenApiOperation("Update biên lai điện tử", "")]
    public async Task<ActionResult> UpdateBienLaiDienTu(UpdateBienLaiDienTu model)
    {
        try
        {
            var res = await Mediator.Send(model);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPost("EditBienLai")]
    [OpenApiOperation("Edit Unconfirm biên lai điện tử", "")]
    public async Task<ActionResult> EditBienLaiDienTu(EditBienLaiDienTu model)
    {
        try
        {
            var res = await Mediator.Send(model);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("InitBienLai")]
    [OpenApiOperation("Khởi tạo biên lai điện tử", "")]
    public async Task<ActionResult> InitBienLaiDienTu(InitBienLaiDienTuQuery model)
    {
        try
        {
            var res = await Mediator.Send(model);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPost("InitMultiBienLai")]
    [OpenApiOperation("Khởi tạo biên lai điện tử", "")]
    public async Task<ActionResult> InitMultiBienLaiDienTu(InitMultiBienLaiDienTu model)
    {
        try
        {
            var res = await Mediator.Send(model);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [AllowAnonymous]
    [HttpPost("GetBienLai")]
    [OpenApiOperation("Lấy thông tin tạo biên lai điện tử", "")]
    public async Task<ActionResult> GetBienLaiDienTu(GetBienLaiDienTuQuery model)
    {
        try
        {
            var res = await Mediator.Send(model);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPost("CancelBienLai")]
    [OpenApiOperation("Hủy thông tin tạo biên lai điện tử", "")]
    public async Task<ActionResult> GetBienLaiDienTu(CancelBienLaiDienTuCommand model)
    {
        try
        {
            var res = await Mediator.Send(model);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPost("CancelMultiBienLai")]
    [OpenApiOperation("Hủy thông tin nhiều biên lai điện tử", "")]
    public async Task<ActionResult> CancelBienLaiDienTus(CancelMultiBienLaiDienTusCommand model)
    {
        try
        {
            var res = await Mediator.Send(model);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [AllowAnonymous]
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu yêu cầu thanh toán theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchYeuCauThanhToanQuery req)
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
    [HttpGet("SearchThongKeThuPhiLePhi")]
    [OpenApiOperation("Lấy dữ liệu yêu cầu thanh toán theo bộ lọc", "")]
    public async Task<ActionResult> SearchThongKeThuPhiLePhi([FromQuery] SearchBaoCaoThuPhiLePhi req)
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
    [HttpGet("thanhToanPortal")]
    [OpenApiOperation("Lấy dữ liệu yêu cầu thanh toán ngoài cổng", "")]
    public async Task<ActionResult> SearchPortal([FromQuery] SearchYeuCauThanhToanPortalQuery req)
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
    [HttpGet("SearchTheoBaoCaoTTTT")]
    [OpenApiOperation("Lấy dữ liệu yêu cầu thanh toán theo báo cáo đôn đốc thanh toán trực tuyến", "")]
    public async Task<ActionResult> Search([FromQuery] SearchHoSoTheoBaoCaoTTTTQuery req)
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
    [HttpGet("{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu yêu cầu thanh toán theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetYeuCauThanhToanQuery(id));
            return Ok(res);
        }
        catch (NotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    [SwaggerIgnore]
    [OpenApiOperation("Sửa một yêu cầu thanh toán", "")]
    public async Task<ActionResult> Update(UpdateYeuCauThanhToanCommand req, DefaultIdType id)
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
    [HttpPut("edit/{id:guid}")]
    [OpenApiOperation("Chỉnh sửa một yêu cầu thanh toán", "")]
    public async Task<ActionResult> Edit(EditYeuCauThanhToanCommand req, DefaultIdType id)
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
    [HttpPost("pay")]
    [OpenApiOperation("Thanh toán một/nhiều yêu cầu thanh toán", "")]
    public async Task<ActionResult> Pay(PayYeuCauThanhToanCommand req)
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
    [HttpPut("YeuCauLai")]
    [OpenApiOperation("Yêu cầu lại yêu cầu thanh toán", "")]
    public async Task<ActionResult> YeuCauLai(YeuCauThanhToanLaiCommand req)
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
    [OpenApiIgnore]
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một yêu cầu thanh toán ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteYeuCauThanhToanCommand req, DefaultIdType id)
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
    [OpenApiIgnore]
    [HttpPatch("{id:guid}")]
    [OpenApiOperation("khôi phục một yêu cầu thanh toán ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreYeuCauThanhToanCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
