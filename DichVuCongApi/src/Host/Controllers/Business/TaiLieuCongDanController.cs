using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.ChiaSeTaiLieuKhoLuuTruCongDanApp.Commands;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.ChiaSeTaiLieuKhoLuuTruCongDanApp.Queries;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.KhoLuuTruCongDanApp.Commands;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.LoaiGiayToKhoLuuTruApp.Commands;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.LoaiGiayToKhoLuuTruApp.Queries;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.Statistics;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Commands;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class TaiLieuCongDanController : VersionedApiController
{
    #region API Kho lưu trữ công dân
    [Authorize]
    [HttpPost("CheckExistedKho")]
    [OpenApiOperation("Kiểm tra và thêm mới kho lưu trữ cho công dân ", "")]
    public async Task<ActionResult> CheckExistedKho(CheckExistKhoLuuTruCongDanCommand req)
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
    [HttpPut("UpdateKhoLuuTru")]
    [OpenApiOperation("Cập nhật kho lưu trữ công dân", "")]
    public async Task<ActionResult> UpdateKhoLuuTru(UpdateKhoLuuTruCongDanCommand req, Guid id)
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
    #endregion

    #region API Tài liệu trong kho lưu trữ công dân
    [Authorize]
    [HttpPost("AddTaiLieuVaoKho")]
    [OpenApiOperation("Thêm mới tài liệu vào trong kho", "")]
    public async Task<ActionResult> AddTaiLieuVaoKho(AddTaiLieuKhoLuuTruCongDanCommand req)
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
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [HttpPost("Admin/AddTaiLieuVaoKho")]
    [OpenApiOperation("Thêm mới tài liệu vào trong kho", "")]
    public async Task<ActionResult> AdminAddTaiLieuVaoKho(AdminAddTaiLieuKhoLuuTruCongDanCommand req)
    {
        try
        {
            var res = await Mediator.Send(req);
            return StatusCode(201, res);
        }
        catch(NotFoundException ex)
        {
            return StatusCode(404, Result.Fail(ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }
    [Authorize]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [HttpDelete("Admin/DeleteTaiLieu/{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một tài liệu", "")]
    public async Task<ActionResult> AdminSoftDelete([FromBody] DeleteTaiLieuKhoLuuTruCongDanCommand req, Guid id)
    {
        try
        {
            if(req.KhoLuuTruId == null || req.KhoLuuTruId == Guid.Empty)
            {
                return BadRequest(Result.Fail("Vui lòng cung cấp kho lưu trữ công dân"));
            }
            req.Id = id;
            var res = await Mediator.Send(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpDelete("DeleteTaiLieu/{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một tài liệu", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteTaiLieuKhoLuuTruCongDanCommand req, Guid id)
    {
        try
        {
            req.KhoLuuTruId = null;
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
    [HttpDelete("DeleteKhoLuuTru/{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một tài liệu", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteKhoLuuTruCongDanCommand req, Guid id)
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
    [HttpPut("UpdateTaiLieu/{id:guid}")]
    [OpenApiOperation("Sửa thông tin tài liệu", "")]
    public async Task<ActionResult> Update(UpdateTaiLieuKhoLuuTruCongDanCommand req, Guid id)
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
    [HttpGet("GetTaiLieu/{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu loại giấy tờ theo mã Id", "")]
    public async Task<ActionResult> Get(Guid id)
    {
        try
        {
            var res = await Mediator.Send(new GetTaiLieuKhoLuuTruQuery(id));
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
    [HttpGet("SearchTaiLieuTrongKho")]
    [OpenApiOperation("Lấy tài liệu trong kho lưu trữ công dân", "")]
    public async Task<ActionResult> Search([FromQuery] SearchTaiLieuKhoLuuTruCongDanQuery req)
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
    [HttpGet("DanhSachTaiLieuCongDan")]
    [OpenApiOperation("Lấy tài liệu trong kho lưu trữ công dân", "")]
    public async Task<ActionResult> Search([FromQuery] DanhSachTaiLieuCongDanQuery req)
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
    [HttpGet("GetDataChartTaiLieuCongDan")]
    [OpenApiOperation("Thông kê tài liệu trong kho", "")]
    public async Task<ActionResult> Search([FromQuery] GetDataChartTaiLieuCongDanQuery req)
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

    #endregion

    #region Tài liệu được chia sẻ
    [Authorize]
    [HttpPost("ChiaSeTaiLieu")]
    [OpenApiOperation("Chia sẻ tài liệu cho người dùng khác", "")]
    public async Task<ActionResult> AddChiaSeTaiLieuKhoLuuTruCongDanCommand(AddChiaSeTaiLieuKhoLuuTruCongDanCommand req)
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
    [HttpDelete("DeleteTaiLieuChiaSe/{id:guid}")]
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một thông tin tài liệu được chia sẻ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteChiaSeTaiLieuKhoLuuTruCongDanCommand req, Guid id)
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
    [HttpGet("SearchTaiLieuDuocChiaSe")]
    [OpenApiOperation("Lấy danh sách tài liệu được chia sẻ", "")]
    public async Task<ActionResult> Search([FromQuery] SearchChiaSeTaiLieuKhoLuuTruCongDanQuery req)
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
    #endregion

    #region Thống kê

    [AllowAnonymous]
    [HttpGet("DungLuongTheoNguonTaiLen")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Dữ liệu biểu đồ thống kê dung lượng sử dụng theo nguồn", "")]
    public async Task<ActionResult> getDataChart([FromQuery] DungLuongTheoNguonTaiLenRequest req)
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
    [HttpGet("TinhHinhSuDungTaiLieuCaNhan")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Dữ liệu biểu đồ thống kê tình hình sử dụng tài liệu", "")]
    public async Task<ActionResult> TinhHinhSuDungRequest([FromQuery] TinhHinhSuDungRequest req)
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
    [HttpGet("DanhSachSuDungKhoTaiLieu")]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [OpenApiOperation("Thống kê danh sách người dùng sử dụng kho tài liệu", "")]
    public async Task<ActionResult> DanhSachSuDungRequest([FromQuery] DanhSachSuDungRequest req)
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
    #endregion
}
