using TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp.Commands;
using TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp.Queries;
using TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Commands;
using TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class DanhGiaCoQuanController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một đánh giá cơ quan ", "")]
    public async Task<ActionResult> Add(AddDanhGiaCoQuanCommand req)
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
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu đánh giá cơ quan theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchDanhGiaCoQuanQuery req)
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
    [HttpGet("searchbaocao02")]
    [OpenApiOperation("Lấy dữ liệu mẫu báo cáo 02 theo bộ lọc", "")]
    public async Task<ActionResult> SearchBaoCao02([FromQuery] SearchBaoCao02Query req)
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
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một đánh giá cơ quan ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteDanhGiaCoQuanCommand req, DefaultIdType id)
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
    [HttpPut("{id:guid}")]
    [OpenApiOperation("Sửa một đánh giá cơ quan", "")]
    public async Task<ActionResult> Update(UpdateDanhGiaCoQuanCommand req, DefaultIdType id)
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
    [HttpGet("{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu đánh giá cơ quan theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetDanhGiaCoQuanQuery(id));
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

}
