using TD.DichVuCongApi.Application.Business.LogDGHLCongDanApp.Commands;
using TD.DichVuCongApi.Application.Business.LogDGHLCongDanApp.Queries;
using TD.DichVuCongApi.Application.Business.LogThongKeDGHLApp.Commands;
using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Commands;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class LogThongKeDGHLCongDanController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một đánh giá hài lòng ", "")]
    public async Task<ActionResult> Add(LogThongKeDGHLCommand req)
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
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu đánh giá hài lòng theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchLogThongKeDGHLQuery req)
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
    [OpenApiOperation("Lấy dữ liệu đánh giá hài lòng theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetLogThongKeDGHLQuery(id));
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
    [HttpPut]
    [OpenApiOperation("Sửa một đánh giá hài lòng theo mã hồ sơ", "")]
    public async Task<ActionResult> Update(UpdateLogThongKeDGHLCommand req, string maHoSo)
    {
        try
        {
            req.MaHoSo = maHoSo;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }


}
