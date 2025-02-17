using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Catalog.TraCuuHoKinhDoanhApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;
using System.IO;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Infrastructure.Minio;
using Microsoft.Extensions.Options;
using Org.BouncyCastle.Ocsp;
using TD.DichVuCongApi.Application.Catalog.FileApp.Commands;
using System.Text;
namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class TraCuuHoKinhDoanhController : VersionedApiController
{
    private readonly MinioSettings _minioSettings;
    private readonly IMinioService _minioService;
    private readonly string? _access_file_key;
    private readonly string? _public_api;
    private readonly string? _domain_name;
    private readonly string? FileUploadLocalPath;

    [Authorize]
    [HttpGet("{id}")]
    [OpenApiOperation("Lấy dữ liệu thủ tục liên quan theo mã Id", "")]
    public async Task<ActionResult> Get(string id)
    {
        try
        {
            var res = await Mediator.Send(new GetTraCuuHoKinhDoanhQuery(id));
            var query = new GetTraCuuHoKinhDoanhQuery(id);
            var result = await Mediator.Send(query);
            return Ok(result);
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

}


