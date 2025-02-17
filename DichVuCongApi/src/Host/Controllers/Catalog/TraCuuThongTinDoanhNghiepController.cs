using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Catalog.TraCuuThongTinDoanhNghiepApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class TraCuuThongTinDoanhNghiepController : VersionedApiController
{
    

    [Authorize]
    [HttpGet("{id}")]
    [OpenApiOperation("Lấy dữ liệu thủ tục liên quan theo mã Id", "")]
    public async Task<ActionResult> Get(string id)
    {
        try
        {
           // var res = await Mediator.Send(new GetTraCuuThongTinDoanhNghiepQuery(id));
            var query = new GetTraCuuThongTinDoanhNghiepQuery(id);
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
