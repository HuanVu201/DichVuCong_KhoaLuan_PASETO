﻿using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.ActionApp.Commands;
using TD.DichVuCongApi.Application.Business.ActionApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Common.KetNoi.BGTVT;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class ActionController : VersionedApiController
{
    private readonly ISyncBGTVTService _syncBGTVTService;
    public ActionController(ISyncBGTVTService syncBGTVTService)
    {
        _syncBGTVTService = syncBGTVTService;
    }
    //[AllowAnonymous]
    //[HttpPost("TestKN")]
    //[OpenApiOperation("FAKE API", "")]
    //public async Task<ActionResult> Add()
    //{
    //    try
    //    {
    //        await _syncBGTVTService.SyncData();
    //        return Ok();
    //    }
    //    catch (Exception ex)
    //    {
    //        return StatusCode(500, ex.Message);
    //    }
    //}

    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một trạng thái action ", "")]
    public async Task<ActionResult> Add(AddActionCommand req)
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
    [OpenApiOperation("Lấy dữ liệu trạng thái action theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchActionQuery req)
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
    [OpenApiOperation("Lấy dữ liệu trạng thái action theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetActionQuery(id));
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
    [OpenApiOperation("Sửa một trạng thái action", "")]
    public async Task<ActionResult> Update(UpdateActionCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một trạng thái action ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteActionCommand req, DefaultIdType id)
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
    [OpenApiOperation("khôi phục một trạng thái action ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreActionCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
