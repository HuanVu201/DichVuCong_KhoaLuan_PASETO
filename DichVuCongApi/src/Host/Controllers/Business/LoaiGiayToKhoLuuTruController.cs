using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.LoaiGiayToKhoLuuTruApp;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.LoaiGiayToKhoLuuTruApp.Commands;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.LoaiGiayToKhoLuuTruApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class LoaiGiayToKhoLuuTruController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một loại giấy tờ ", "")]
    public async Task<ActionResult> Add(AddLoaiGiayToKhoLuuTruCommand req)
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
    [OpenApiOperation("Lấy dữ liệu loại giấy tờ  theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchLoaiGiayToKhoLuuTruQuery req)
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
    [OpenApiOperation("Lấy dữ liệu loại giấy tờ theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetLoaiGiayToKhoLuuTruQuery(id));
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
    [OpenApiOperation("Sửa một loại giấy tờ", "")]
    public async Task<ActionResult> Update(UpdateLoaiGiayToKhoLuuTruCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một loại giấy tờ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteLoaiGiayToKhoLuuTruCommand req, Guid id)
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
