using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.Commands;
using TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class QuaTrinhTraoDoiCongDanController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một quá trình trao đổi công dân ", "")]
    public async Task<ActionResult> Add(AddQuaTrinhTraoDoiCongDanCommand req)
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
    [OpenApiOperation("Lấy dữ liệu quá trình trao đổi công dân theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchQuaTrinhTraoDoiCongDanQuery req)
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
    [OpenApiOperation("Lấy dữ liệu quá trình trao đổi công dân theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetQuaTrinhTraoDoiCongDanQuery(id));
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
    [OpenApiOperation("Sửa một quá trình trao đổi công dân")]
    public async Task<ActionResult> Update(UpdateQuaTrinhTraoDoiCongDanCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa vĩnh viễn một quá trình trao đổi công dân", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteQuaTrinhTraoDoiCongDanCommand req, DefaultIdType id)
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
