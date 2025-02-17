using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Commands;
using TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;
using static TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Service;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;

public class ThuTucThuocLoaiController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một lĩnh vực ", "")]
    public async Task<ActionResult> Add(AddThuTucThuocLoaiCommand req)
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
    [HttpPost("api/importThuTucThuocLoais")]
    [OpenApiOperation("Import ThuTucThuocLoais ", "")]
    public async Task<ActionResult> ImportThuTucThuocLoaiFromDVCQuocGia(ImportThuTucThuocLoaiServiceCommand req)
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
    [OpenApiOperation("Lấy dữ liệu lĩnh vực theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchThuTucThuocLoaiQuery req)
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
    [HttpGet("SearchTheoDonVi")]
    [OpenApiOperation("Lấy dữ liệu lĩnh vực  theo đơn vị ", "")]
    public async Task<ActionResult> Search([FromQuery] SearchThuTucThuocLoaiTheoDonViQuery req)
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
    [HttpGet("api/filterThuTucThuocLoai")]
    [OpenApiOperation("Lấy dữ liệu lĩnh vực theo mã ngành và cấp thực hiện ", "")]
    public async Task<ActionResult> Filter([FromQuery] FilterThuTucThuocLoai req)
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
    [OpenApiOperation("Lấy dữ liệu lĩnh vực theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetThuTucThuocLoaiQuery(id));
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
    [OpenApiOperation("Sửa một lĩnh vực", "")]
    public async Task<ActionResult> Update(UpdateThuTucThuocLoaiCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một lĩnh vực ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteThuTucThuocLoaiCommand req, Guid id)
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
    [OpenApiOperation("khôi phục một lĩnh vực ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreThuTucThuocLoaiCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
