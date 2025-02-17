using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Queries;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Commands;
using TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.ExpandApi;
using TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Queries;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

namespace TD.DichVuCongApi.Host.Controllers.Portal;
public class ApiChiaSeController : VersionedApiController
{
    [Authorize]
    [HttpPost("AddApiChiaSe")]
    [OpenApiOperation("Thêm api chia sẻ ", "")]
    public async Task<ActionResult> AddApiChiaSe(AddApiChiaSeCommand req)
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
    [HttpPost("AddLichSuApiChiaSe")]
    [OpenApiOperation("Thêm lịch sử gọi api chia sẻ ", "")]
    public async Task<ActionResult> AddLichSuApiChiaSe(AddLichSuAPIChiaSeCommand req)
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
    [HttpPut("{id:guid}")]
    [OpenApiOperation("Sửa một api chia sẻ", "")]
    public async Task<ActionResult> Update(UpdateApiChiaSeCommand req, Guid id)
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
    [HttpPost("UpdateLuotGoi")]
    [OpenApiOperation("Update lượt gọi api chia sẻ", "")]
    public async Task<ActionResult> Update(UpdateLuotGoiApiChiaSeCommand req)
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
    [OpenApiOperation("Lấy dữ liệu api chia sẻ theo mã id", "")]
    public async Task<ActionResult> GetApiChiaSeQuery(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetApiChiaSeQuery(id));
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
    [HttpGet("GetApiByMa")]
    [OpenApiOperation("Lấy thông tin theo mã", "")]
    public async Task<ActionResult> getUrlMauPhoi([FromQuery] GetApiChiaSeWithMaQuery req)
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
    [HttpGet("SearchApiChiaSe")]
    [OpenApiOperation("Lấy dữ liệu api chia sẻ theo bộ lọc", "")]
    public async Task<ActionResult> SearchApiChiaSeQuery([FromQuery] SearchApiChiaSeQuery req)
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
    [HttpGet("SearchLichSuApiChiaSe")]
    [OpenApiOperation("Lấy dữ liệu lịch sử gọi api theo bộ lọc", "")]
    public async Task<ActionResult> SearchLichSuApiChiaSeQuery([FromQuery] SearchLichSuApiChiaSeQuery req)
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
    [HttpGet("DetailHoSoEx")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo mã Id", "")]
    public async Task<ActionResult> Get([FromQuery] GetHoSoExpandApiQuery req)
    {
        try
        {
            var res = await Mediator.Send(req);
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
    [HttpGet("SearchHoSoEx")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ cá nhân", "")]
    public async Task<ActionResult> SearchHoSoPortal([FromQuery] SearchHoSoExpandApiQuery req)
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
    [HttpGet("SearchGTSHEx")]
    [OpenApiOperation("Lấy dữ liệu giấy tờ số hóa theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchGTSHExpandApiQuery req)
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
    [HttpGet("DetailKetQuaXuLyEx")]
    [OpenApiOperation("Chi tiết kết quả xử lý công dân")]
    public async Task<ActionResult> DetailKetQuaXuLy([FromQuery] GetKetQuaXuLyExpandApiQuery request)
    {
        try
        {
            var res = await Mediator.Send(request);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("DownloadFileGTSHEx")]
    [OpenApiOperation("Tải tất cả đính kèm GTSH", "")]
    public async Task<ActionResult> DownloadFileGTSHExpandApiQuery([FromQuery] DownloadFileGTSHExpandApiQuery req)
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
    [HttpGet("TaiLieuCongDanEx")]
    [OpenApiOperation("Lấy dữ liệu tài liệu công dân theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] GetTaiLieuCongDanExpandApiQuery req)
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
    [HttpGet("GetInfoUserEx")]
    [OpenApiOperation("Lấy thông tin của người dùng", "")]
    public async Task<ActionResult> GetInfoUserExpandApiQuery([FromQuery] GetInfoUserExpandApiQuery req)
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

}
