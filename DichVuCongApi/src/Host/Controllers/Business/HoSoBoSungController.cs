using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.HoSoBoSungApp.Queries;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class HoSoBoSungController : VersionedApiController
{
    [Authorize]
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu hồ sơ bổ sung theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchHoSoBoSungQuery req)
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

    //[Authorize]
    //[HttpGet("{id:guid}")]
    //[OpenApiOperation("Lấy dữ liệu hồ sơ bổ sung theo mã Id", "")]
    //public async Task<ActionResult> Get(DefaultIdType id)
    //{
    //    try
    //    {
    //        var res = await Mediator.Send(new G(id));
    //        return Ok(res);
    //    }
    //    catch (NotFoundException ex)
    //    {
    //        return NotFound(ex.Message);
    //    }
    //    catch (Exception ex)
    //    {
    //        return StatusCode(500, ex.Message);
    //    }
    //}

}
