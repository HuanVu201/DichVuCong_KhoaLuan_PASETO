using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Commands;
using TD.DichVuCongApi.Application.Catalog.NotificationApp.Commands;
using TD.DichVuCongApi.Application.Catalog.NotificationApp.Queries;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class NotificationController : VersionedApiController
{
    [Authorize]
    [HttpGet]
    [OpenApiOperation("Tìm kiếm firebase notification", "")]
    public async Task<ActionResult> Search([FromQuery] SearchNotificationQuery req)
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
    [OpenApiOperation("Cập nhật đã đọc thông báo", "")]
    public async Task<ActionResult> UpdateIsRead([FromBody] UpdateIsReadNotificationCommand req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req);
            if (res.Succeeded)
            {
                return Ok(res);
            }
            return BadRequest(new Result() { Message = res.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm mới một thông báo", "")]
    public async Task<ActionResult> CreateNotification([FromBody] CreateFirebaseNotificationCommand req)
    {
        try
        {
            var res = await Mediator.Send(req);
            if (res.Succeeded)
            {
                return Ok(res);
            }
            return BadRequest(new Result() { Message = res.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
