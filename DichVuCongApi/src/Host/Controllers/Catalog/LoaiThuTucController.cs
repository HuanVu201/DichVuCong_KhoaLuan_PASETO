using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Catalog.LoaiThuTucApp.Commands;
using TD.DichVuCongApi.Application.Catalog.LoaiThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;
using static TD.DichVuCongApi.Application.Catalog.LoaiThuTucApp.Service;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;

public class LoaiThuTucController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một lĩnh vực ", "")]
    public async Task<ActionResult> Add(AddLoaiThuTucCommand req)
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
    [HttpPost("api/importLoaiThuTucs")]
    [OpenApiOperation("Import LoaiThuTucs ", "")]
    public async Task<ActionResult> ImportLoaiThuTucFromDVCQuocGia(ImportLoaiThuTucServiceCommand req)
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
    public async Task<ActionResult> Search([FromQuery] SearchLoaiThuTucQuery req)
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
    public async Task<ActionResult> Search([FromQuery] SearchLoaiThuTucTheoDonViQuery req)
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
    [HttpGet("api/filterLoaiThuTuc")]
    [OpenApiOperation("Lấy dữ liệu lĩnh vực theo mã ngành và cấp thực hiện ", "")]
    public async Task<ActionResult> Filter([FromQuery] FilterLoaiThuTuc req)
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
            var res = await Mediator.Send(new GetLoaiThuTucQuery(id));
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
    public async Task<ActionResult> Update(UpdateLoaiThuTucCommand req, Guid id)
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
    public async Task<ActionResult> SoftDelete([FromBody] DeleteLoaiThuTucCommand req, Guid id)
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
            var res = await Mediator.Send(new RestoreLoaiThuTucCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
