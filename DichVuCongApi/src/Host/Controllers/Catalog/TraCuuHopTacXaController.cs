using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Catalog.TraCuuHopTacXaApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class TraCuuHopTacXaController : VersionedApiController
{
    

    [Authorize]
    [HttpGet("{id}")]
    [OpenApiOperation("Lấy dữ liệu thủ tục liên quan theo mã Id", "")]
    public async Task<ActionResult> Get(string id)
    {
        try
        {
           // var res = await Mediator.Send(new GetTraCuuHopTacXaQuery(id));
            var query = new GetTraCuuHopTacXaQuery(id);
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
