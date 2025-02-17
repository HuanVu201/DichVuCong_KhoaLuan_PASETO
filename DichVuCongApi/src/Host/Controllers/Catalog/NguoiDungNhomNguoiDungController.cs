using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp.Commands;
using TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp.Queries;
using TD.DichVuCongApi.Application.Business.ScreenActionApp.Queries;
using TD.DichVuCongApi.Application.Catalog.NguoiDungNhomNguoiDungApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;

namespace TD.DichVuCongApi.Host.Controllers.Catalog;
public class NguoiDungNhomNguoiDungController : VersionedApiController
{
    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một Người dùng nhóm người dùng ", "")]
    public async Task<ActionResult> Add(AddNguoiDungNhomNguoiDungCommand req)
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
    [HttpPost("AddList")]
    [OpenApiOperation("Thêm danh sách người dùng vào một nhóm người dùng ", "")]
    public async Task<ActionResult> AddList(AddListNguoiDungToNhomNguoiDung req)
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
    [OpenApiOperation("Lấy dữ liệu Người dùng nhóm người dùng theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchNguoiDungNhomNguoiDungQuery req)
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
    [HttpGet("DanhSachNguoiTraKetQua")]
    [OpenApiOperation("Lấy dữ liệu Người dùng nhóm người dùng trả kết quả theo bộ lọc", "")]
    public async Task<ActionResult> SearchNGuoiTraKetQua([FromQuery] GetDanhSachNguoiDungTraKetQuaQuery req)
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
    [HttpGet("UserNotInNhom")]
    [OpenApiOperation("Lấy dữ liệu user chưa có trong nhóm theo mã nhóm", "")]
    public async Task<ActionResult> Search([FromQuery] SearchUserNotInNhomQuery req)
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
    [OpenApiOperation("Lấy dữ liệu Người dùng nhóm người dùng theo mã Id", "")]
    public async Task<ActionResult> Get(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new GetNguoiDungNhomNguoiDungQuery(id));
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
    [HttpDelete("{id:guid}")]
    [OpenApiOperation("Xóa vĩnh viễn một Người dùng nhóm người dùng ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteNguoiDungNhomNguoiDungCommand req, DefaultIdType id)
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
    [HttpDelete()]
    [OpenApiOperation("Xóa vĩnh viễn danh sacsh Người dùng nhóm người dùng ", "")]
    public async Task<ActionResult> SoftDeleteDanhSach([FromBody] DeleteListNguoiDungNhomNguoiDungCommand req)
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
