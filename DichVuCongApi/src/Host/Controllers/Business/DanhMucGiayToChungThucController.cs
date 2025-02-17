using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Portal.DanhMucGiayToChungThucApp.Commands;
using TD.DichVuCongApi.Application.Portal.DanhMucGiayToChungThucApp.Queries;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class DanhMucGiayToChungThucController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một danh mục giấy tờ chứng thực ", "")]
    public async Task<ActionResult> Add(AddDanhMucGiayToChungThucCommand req)
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
    [OpenApiOperation("Lấy dữ liệu danh mục giấy tờ chứng thực theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchDanhMucGiayToChungThucQuery req)
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
    [OpenApiOperation("Lấy dữ liệu danh mục giấy tờ chứng thực theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetDanhMucGiayToChungThucQuery(id));
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
    [OpenApiOperation("Sửa một danh mục giấy tờ chứng thực", "")]
    public async Task<ActionResult> Update(UpdateDanhMucGiayToChungThucCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một danh mục giấy tờ chứng thực ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteDanhMucGiayToChungThucCommand req, DefaultIdType id)
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
    [OpenApiOperation("khôi phục một danh mục giấy tờ chứng thực ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreDanhMucGiayToChungThucCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
