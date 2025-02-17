using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Text.Json;
using TD.DichVuCongApi.Application.Catalog.DanhMucChungApp.Commands;
using TD.DichVuCongApi.Application.Catalog.DanhMucChungApp.Queries;
using TD.DichVuCongApi.Application.Catalog.MenuApp.Commands;
using TD.DichVuCongApi.Application.Catalog.MenuApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class DanhMucChungController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một danh mục chung ", "")]
    public async Task<ActionResult> Add(AddDanhMucChungCommand req)
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
    [OpenApiOperation("Lấy dữ liệu danh mục chung theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchDanhMucChungQuery req)
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
    [HttpGet("DanhSach")]
    [OpenApiOperation("Lấy dữ liệu danh mục chung", "")]
    public async Task<ActionResult> Get([FromQuery] SearchDanhMucEFormQuery req)
    {
        try
        {
            var res = await Mediator.Send(req);
            var jsonSerializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new DefaultContractResolver() // Keeps PascalCase
            };
            var jsonResponse = JsonConvert.SerializeObject(res, jsonSerializerSettings);

            return Content(jsonResponse, "application/json");
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu danh mục chung theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetDanhMucChungQuery(id));
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
    [OpenApiOperation("Sửa một danh mục chung", "")]
    public async Task<ActionResult> Update(UpdateDanhMucChungCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một danh mục chung ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteDanhMucChungCommand req, Guid id)
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
    [OpenApiOperation("khôi phục một danh mục chung ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreDanhMucChungCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
