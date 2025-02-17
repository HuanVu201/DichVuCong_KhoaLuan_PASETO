using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.VariantTypes;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.LogCSDLDanCuDoanhNghiepApp.Queries;
using TD.DichVuCongApi.Application.Business.LogSendEmailApp;
using TD.DichVuCongApi.Application.Business.LogSendEmailApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Common.ServiceLogger;
using TD.DichVuCongApi.Infrastructure.Common.Services;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class LogSendEmailController : VersionedApiController
{
    private readonly IServiceLogger _serviceLogger;
    // Constructor Injection
    public LogSendEmailController(IServiceLogger serviceLogger)
    {
        _serviceLogger = serviceLogger;
    }
    [Authorize]
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu log gửi email", "")]
    public async Task<ActionResult> GetLogSendEmail([FromQuery] SearchLogSendEmail req)
    {
        try
        {
            // Gọi phương thức GetListAssync để lấy danh sách log
            var logs = await _serviceLogger.GetListAsync(req);

            // Trả về dữ liệu logs dưới dạng JSON
            return Ok(logs);

        }
        catch (Exception ex)
        {
            // Log exception if needed
            return StatusCode(500, $"Đã xảy ra lỗi: {ex.Message}");
        }
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu servicelogs theo id", "")]
    public async Task<ActionResult> GetLogSendEmailById(DefaultIdType id)
    {
        try
        {
            // Gọi phương thức GetListAssync để lấy danh sách log
            var logs = await _serviceLogger.GetServiceLogByIdAsync(id);

            // Trả về dữ liệu logs dưới dạng JSON
            return Ok(logs);

        }
        catch (Exception ex)
        {
            // Log exception if needed
            return StatusCode(500, $"Đã xảy ra lỗi: {ex.Message}");
        }
    }
}
