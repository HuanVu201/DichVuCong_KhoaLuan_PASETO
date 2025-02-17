using DocumentFormat.OpenXml.Office2010.Excel;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient.Server;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Org.BouncyCastle.Ocsp;
using System.Security;
using System.Threading;
using TD.DichVuCongApi.Application.Business.HuongDanNopHoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HuongDanNopHoSoApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Common.KetNoi.DVC.TBKM;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Common.MemoryCacheService;
using TD.DichVuCongApi.Application.Common.QrCodeServive;
using TD.DichVuCongApi.Application.Common.ServiceLogger;

using TD.DichVuCongApi.Infrastructure.Common.Services;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Infrastructure.LTQLVB;
using TD.DichVuCongApi.Infrastructure.Zalo;
using TD.DichVuCongApi.Infrastructure.SMS;
using TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction.XuatPhieuCommand;


namespace TD.DichVuCongApi.Host.Controllers.Business;
public class HuongDanNopHoSoController : VersionedApiController
{

  
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một hồ sơ trực tiếp", "")]
    public async Task<ActionResult> Add(AddHuongDanNopHoSoCommand req)
    {
        try
        {
            var res = await Mediator.Send(req);
            if (res.Succeeded)
            {
                return StatusCode(201, res);
            }
            return BadRequest(new Result() { Message = res.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

   

    [Authorize]
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchHuongDanNopHoSo req)
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
    [HttpGet("detail")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo mã Id", "")]
    public async Task<ActionResult> Get([FromQuery] GetHuongDanNopHoSoQuery req)
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
    [HttpGet("xuatPhieu")]
    [OpenApiOperation("Lấy thông tin phiếu / Xuất phiếu", "")]
    public async Task<ActionResult> XuatPhieu([FromQuery] XuatPhieuHuongDanBoSungCommand request)
    {
        try
        {
            var res = await Mediator.Send(request);
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
    [OpenApiOperation("Sửa một hồ sơ", "")]
    public async Task<ActionResult> Update(UpdateHuongDanNopHoSoCommand req, DefaultIdType id)
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
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn hồ sơ ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteHuongDanNopHoSoCommand req,DefaultIdType id)
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
    [OpenApiOperation("khôi phục một hồ sơ ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreHuongDanNopHoSoCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

}
