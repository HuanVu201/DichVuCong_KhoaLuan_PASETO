using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Portal.LoaiNhomGiayToCaNhanApp.Commands;
using TD.DichVuCongApi.Application.Portal.LoaiNhomGiayToCaNhanApp.Queries;

namespace TD.DichVuCongApi.Host.Controllers.Portal;
public class LoaiNhomGiayToCaNhanController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một LoaiNhomGiayToCaNhan ", "")]
    public async Task<ActionResult> Add(AddLoaiNhomGiayToCaNhanCommand req)
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
    [OpenApiOperation("Lấy dữ liệu LoaiNhomGiayToCaNhan theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchLoaiNhomGiayToCaNhanQuery req)
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
    [OpenApiOperation("Lấy dữ liệu LoaiNhomGiayToCaNhan theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetLoaiNhomGiayToCaNhanQuery(id));
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
    [OpenApiOperation("Sửa một LoaiNhomGiayToCaNhan", "")]
    public async Task<ActionResult> Update(UpdateLoaiNhomGiayToCaNhanCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một LoaiNhomGiayToCaNhan ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteLoaiNhomGiayToCaNhanCommand req, DefaultIdType id)
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

}
