using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Commands;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;
using static TD.DichVuCongApi.Application.Catalog.ThuTucApp.Service;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class ThuTucController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một thủ tục ", "")]
    public async Task<ActionResult> Add(AddThuTucCommand req)
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
    [HttpPost("/api/importThuTucs")]
    [OpenApiOperation("import ThuTucs", "")]
    public async Task<ActionResult> ImportThutucFromDVCQuocGia(ImportThuTucServiceCommand req)
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
    [HttpGet("/api/filterThuTuc")]
    [OpenApiOperation("Phân chia thủ tục theo lĩnh vực và ngành", "")]
    public async Task<ActionResult> Filter([FromQuery] FilterThuTucQuery req)
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
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu thủ tục theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchThuTucQuery req)
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
    [HttpGet("/api/v1/thutucs/SearchThuTucTheoCanBo")]
    [OpenApiOperation("Lấy dữ liệu thủ tục theo cán bộ được tiếp nhận", "")]
    public async Task<ActionResult> SeachThuTucTheoCanBo([FromQuery] SearchThuTucTheoCanBoQuery req)
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
    [HttpGet("PortalGetDVCNoiBat")]
    [OpenApiOperation("Lấy dữ liệu thủ tục nổi bật theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] PortalGetDVCNoiBatQuery req)
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
    [HttpGet("Search/TheoBaoCaoTongHop")]
    [OpenApiOperation("Lấy dữ liệu thủ tục theo bộ lọc theo báo cáo tổng hợp", "")]
    public async Task<ActionResult> SearchThuTucTheoBaoCaoTongHop([FromQuery] SearchThuTucTheoBaoCaoTongHop req)
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
    [HttpGet("/api/v1/searchnguoitiepnhanthutucs")]
    [OpenApiOperation("Lấy dữ liệu người tiếp nhận thủ tục theo bộ lọc", "")]
    public async Task<ActionResult> SearchNguoiTiepNhan([FromQuery] SearchNguoiTiepNhanThuTuc req)
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
    [OpenApiOperation("Lấy dữ liệu thủ tục theo bộ lọc", "")]
    public async Task<ActionResult> PortalSearch([FromQuery] PortalSearchThuTucQuery req)
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
    [OpenApiOperation("Lấy dữ liệu thủ tục theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetThuTucQuery(id));
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
    [HttpGet("maTTHC/{maTTHC}")]
    [OpenApiOperation("Lấy dữ liệu thủ tục theo mã thủ tục", "")]
    public async Task<ActionResult> GetByMaTTHC(string maTTHC)
    {
        try
        {
            var res = await Mediator.Send(new GetThuTucByMaQuery(maTTHC));
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
    [OpenApiOperation("Sửa một thủ tục", "")]
    public async Task<ActionResult> Update(UpdateThuTucCommand req, Guid id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một thủ tục ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteThuTucCommand req, Guid id)
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
    [OpenApiOperation("khôi phục một thủ tục ", "")]
    public async Task<ActionResult> Restore(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreThuTucCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
