using TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Commands;
using TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class DanhGiaHaiLongController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một đánh giá hài lòng ", "")]
    public async Task<ActionResult> Add(AddDanhGiaHaiLongCommand req)
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
    [OpenApiOperation("Lấy dữ liệu đánh giá hài lòng theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchDanhGiaHaiLongQuery req)
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
    [HttpGet("{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu đánh giá hài lòng theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetDanhGiaHaiLongQuery(id));
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
    [HttpGet("DGHTByMaHoSo")]
    [OpenApiOperation("Lấy dữ liệu đánh giá hài lòng theo mã hồ sơ", "")]
    public async Task<ActionResult> Get(string maHoSo)
    {
        try
        {
            var res = await Mediator.Send(new GetDanhGiaHaiLongByMaHoSo(maHoSo));
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
    [HttpGet("CheckDGHL/{id:guid}")]
    [OpenApiOperation("Kiểm tra dánh giá hài lòng Id", "")]
    public async Task<ActionResult> CheckDanhGiaHaiLongQuery(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new CheckDanhGiaHaiLongQuery(id));
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
    [OpenApiOperation("Sửa một đánh giá hài lòng", "")]
    public async Task<ActionResult> Update(UpdateDanhGiaHaiLongCommand req, DefaultIdType id)
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
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một đánh giá hài lòng ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteDanhGiaHaiLongCommand req, DefaultIdType id)
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
    [HttpPatch("{id:guid}")]
    [OpenApiOperation("khôi phục một đánh giá hài lòng ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreDanhGiaHaiLongCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("DanhGiaHaiLongHCC")]
    [OpenApiOperation("Đánh giá hài lòng HCC ", "")]
    public async Task<ActionResult> DanhGiaHaiLongHCC([FromBody] DanhGiaHaiLongHccCommand req)
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
}
