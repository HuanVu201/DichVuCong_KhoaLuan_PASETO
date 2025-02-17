using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Common.NEAC;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class NeacController : VersionedApiController
{
    private readonly INEACService _nEACService;
    public NeacController(INEACService nEACService)
    {
        _nEACService = nEACService;
    }
    [Authorize]
    [HttpPost("GetCertificates")]
    [OpenApiOperation("API lấy danh sách chứng thư số của người dùng", "")]
    public async Task<ActionResult> GetCertificates(NEACGetCertificateRequest req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _nEACService.GetCertificate(req, cancellationToken);
            return StatusCode(200, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPost("SignFile")]
    [OpenApiOperation("API ký tài liệu", "")]
    public async Task<ActionResult> SignFile(NEACSignFileRequest req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _nEACService.SignFile(req, cancellationToken);
            return StatusCode(200, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("GetDatas")]
    [OpenApiOperation("Lấy danh sách file ký số", "")]
    public async Task<ActionResult> GetDatas([FromQuery] NeacGetDataRequest req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _nEACService.GetDatas(req, cancellationToken);
            return StatusCode(200, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
