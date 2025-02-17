using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Portal.PhanAnhKienNghiApp.Commands;
using TD.DichVuCongApi.Application.Portal.PhanAnhKienNghiApp.Queies;
using TD.DichVuCongApi.Application.Portal.PhanAnhKienNghiApp.Queries;

namespace TD.DichVuCongApi.Host.Controllers.Portal;
public class PhanAnhKienNghiController : VersionedApiController
{
    [AllowAnonymous]
    [HttpPost]
    [OpenApiOperation("Thêm một PhanAnhKienNghi ", "")]
    public async Task<ActionResult> Add(AddPhanAnhKienNghiCommand req)
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
    [OpenApiOperation("Lấy dữ liệu PhanAnhKienNghi theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchPhanAnhKienNghiQuery req)
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
    [OpenApiOperation("Lấy dữ liệu PhanAnhKienNghi theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetPhanAnhKienNghiQuery(id));
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

    [AllowAnonymous]
    [HttpPut("{id:guid}")]
    [OpenApiOperation("Sửa một PhanAnhKienNghi", "")]
    public async Task<ActionResult> Update(UpdatePhanAnhKienNghiCommand req, DefaultIdType id)
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

    [AllowAnonymous]
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một PhanAnhKienNghi ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeletePhanAnhKienNghiCommand req, DefaultIdType id)
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

    [AllowAnonymous]
    [HttpPatch("{id:guid}")]
    [OpenApiOperation("khôi phục một PhanAnhKienNghi ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestorePhanAnhKienNghiCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
