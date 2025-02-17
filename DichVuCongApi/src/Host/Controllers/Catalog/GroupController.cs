using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Commands;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;
using static TD.DichVuCongApi.Application.Catalog.GroupApp.CoordinatesService;
using static TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.SoLieuBaoCaoTheoKyJob.TaskSoLieuBaoCaoTheoKyService;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class GroupController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một cơ cấu tổ chức ", "")]
    public async Task<ActionResult> Add(AddGroupCommand req)
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
    [OpenApiOperation("Lấy dữ liệu cơ cấu tổ chức theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchGroupQuery req)
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
    [HttpGet("PortalSearch")]
    [OpenApiOperation("Lấy dữ liệu cơ cấu tổ chức theo bộ lọc", "")]
    public async Task<ActionResult> PortalSearch([FromQuery] SearchPortalGroupQuery req)
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
    [OpenApiOperation("Lấy dữ liệu cơ cấu tổ chức theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetGroupQuery(id));
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
    [HttpGet("ByGroupCode/{groupCode}")]
    [OpenApiOperation("Lấy dữ liệu cơ cấu tổ chức theo groupcode", "")]
    public async Task<ActionResult> GetByGroupCode(string groupCode)
    {
        try
        {
            var res = await Mediator.Send(new GetByGroupCodeQuery(groupCode));
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
    [OpenApiOperation("Sửa một cơ cấu tổ chức", "")]
    public async Task<ActionResult> Update(UpdateGroupCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một cơ cấu tổ chức ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteGroupCommand req, Guid id)
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
    [HttpDelete("DelGroupsChild")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn danh sách cơ cấu tổ chức con ", "")]
    public async Task<ActionResult> SoftDeleteChildGroup([FromBody] DeleteChildrenGroup req)
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
    [HttpPatch("{id:guid}")]
    [OpenApiOperation("khôi phục một cơ cấu tổ chức ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreGroupCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("TaskCoordinates")]
    [OpenApiOperation("TaskCoordinates", "")]
    public async Task<ActionResult> TaskCoordinates(TaskCoordinates req)
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
