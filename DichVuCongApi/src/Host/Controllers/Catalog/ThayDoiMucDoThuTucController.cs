using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Catalog.ThayDoiMucDoThuTucApp.Commands;
using TD.DichVuCongApi.Application.Catalog.ThayDoiMucDoThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class ThayDoiMucDoThuTucController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một thay đổi mức độ thủ tục ", "")]
    public async Task<ActionResult> Add(AddThayDoiThuTucCommand req)
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
    [OpenApiOperation("Lấy dữ liệu thay đôi mmức độ thủ tục bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchThayDoiThuTucQuery req)
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


    /* [AllowAnonymous]
     [HttpGet("{id:guid}")]
     [OpenApiOperation("Lấy dữ liệu cấu hình theo mã Id", "")]
     public async Task<ActionResult> Get(Guid id)
     {
         try
         {
             var res = await Mediator.Send(new GetThayDoiMucDoThuTucQuery(id));
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
 */
    [Authorize]
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một ThayDoiThuTuc ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteThayDoiThuTucCommand req, Guid id)
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

/*    [Authorize]
    [HttpPatch("{id:guid}")]
    [OpenApiOperation("khôi phục một cấu hình ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreThayDoiMucDoThuTucCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }*/
}
