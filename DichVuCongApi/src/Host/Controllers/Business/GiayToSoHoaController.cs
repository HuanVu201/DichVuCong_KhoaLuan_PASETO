using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Commands;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Interfaces;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Queries;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Common.KetNoi.DVC.KhoSoHoaDVCQG;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class GiayToSoHoaController : VersionedApiController
{
    private readonly IKhoSoHoaDVCQGService _khoSoHoaDVCQGService;
    private readonly IGiayToSoHoaService _giayToSoHoaService;

    public GiayToSoHoaController(IKhoSoHoaDVCQGService khoSoHoaDVCQGService, IGiayToSoHoaService giayToSoHoaService)
    {
        _khoSoHoaDVCQGService = khoSoHoaDVCQGService;
        _giayToSoHoaService = giayToSoHoaService;
    }


    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một giấy tờ số hóa ", "")]
    public async Task<ActionResult> Add(AddGiayToSoHoaCommand req)
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
    [OpenApiOperation("Lấy dữ liệu giấy tờ số hóa theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchGiayToSoHoaQuery req)
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
    [HttpGet("GTSHOutsideKhoTaiLieu")]
    [OpenApiOperation("Lấy dữ liệu giấy tờ số hóa không nằm trong kho", "")]
    public async Task<ActionResult> SearchGTSHOutsideKhoTaiLieuQuery([FromQuery] SearchGTSHOutsideKhoTaiLieuQuery req)
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

    [MustHavePermission(TDAction.View, TDResource.NhomCanBoMotCua + "," + TDResource.NhomCanBoTTHCC + "," + TDResource.NhomLanhDaoDonVi + "," + TDResource.NhomLanhDaoPhong + "," + TDResource.NhomCanBoXuLyChungThucDienTu + "," + TDResource.NhomChuyenVien + "," + TDResource.NhomQuanTriDonVi + "," + TDResource.NhomVanThuDonVi)]
    [Authorize]
    [HttpPost("DanhSachGiayToKhoQuocGiaCanBo")]
    [OpenApiOperation("Lấy dữ liệu giấy tờ số hóa trên kho DVCQG cán bộ", "")]
    public async Task<ActionResult> DanhSachGiayToKhoQuocGiaCanBo([FromBody] KhoSoHoaDVCQGParams.GetDanhSachKetQuaCanBoRequest req)
    {
        try
        {
            var res = await _khoSoHoaDVCQGService.GetDanhSachKetQuaCanBo(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpPost("KhoLuuTru/DanhSachGiayToKhoQuocGiaCongDan")]
    [OpenApiOperation("Lấy dữ liệu giấy tờ số hóa trên kho DVCQG cán bộ", "")]
    public async Task<ActionResult> GetDanhSachKetQuaCongDanWithoutDanhMucKQ([FromBody] KhoSoHoaDVCQGParams.GetDanhSachKetQuaCongDanWithoutDanhMucRequest req)
    {
        try
        {
            var res = await _khoSoHoaDVCQGService.GetDanhSachKetQuaCongDanWithoutDanhMucKQ(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }
    [Authorize]
    [HttpPost("KhoLuuTru/DanhSachGiayToKhoQuocGiaCanBo")]
    [OpenApiOperation("Lấy dữ liệu giấy tờ số hóa trên kho DVCQG cán bộ", "")]
    public async Task<ActionResult> GetDanhSachKetQuaCanBoWithoutDanhMucKQ([FromBody] KhoSoHoaDVCQGParams.GetDanhSachKetQuaCanBoWithoutDanhMucRequest req)
    {
        try
        {
            var res = await _khoSoHoaDVCQGService.GetDanhSachKetQuaCanBoWithoutDanhMucKQ(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpPost("DanhSachGiayToKhoQuocGiaCaNhan")]
    [OpenApiOperation("Lấy dữ liệu giấy tờ số hóa trên kho DVCQG công dân", "")]
    public async Task<ActionResult> DanhSachGiayToKhoQuocGiaCongDan([FromBody] KhoSoHoaDVCQGParams.GetDanhSachKetQuaCongDanRequest req)
    {
        try
        {
            var res = await _khoSoHoaDVCQGService.GetDanhSachKetQuaCongDan(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpPost("GiayToKhoQuocGia")]
    [OpenApiOperation("Lấy dữ liệu tệp trên kho DVCQG", "")]
    public async Task<ActionResult> GiayToKhoQuocGia([FromBody] KhoSoHoaDVCQGParams.GetKetQuaByURLRequest req)
    {
        try
        {
            var res = await _khoSoHoaDVCQGService.GetKetQuaByUrl(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }
    [Authorize]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [HttpPost("DongBoHoSoSoHoaDVCQG")]
    [OpenApiOperation("Lấy dữ liệu tệp trên kho DVCQG", "")]
    public async Task<ActionResult> DongBoHoSoSoHoaDVCQG([FromBody] KhoSoHoaDVCQGParams.GetListKetQuaByUrlRequest req)
    {
        try
        {
            var res = await _khoSoHoaDVCQGService.GetListKetQuaByUrl(req);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpPost("detail")]
    [OpenApiOperation("Lấy dữ liệu giấy tờ số hóa theo mã Id", "")]
    public async Task<ActionResult> Get(
        GetGiayToSoHoaQuery req)
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
    [HttpPut("{id:guid}")]
    [OpenApiOperation("Sửa một giấy tờ số hóa", "")]
    public async Task<ActionResult> Update(UpdateGiayToSoHoaCommand req, DefaultIdType id)
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
    [HttpPut("CapNhatTrangThaiSoHoa/{id:guid}")]
    [OpenApiOperation("cập nhật trạng thái giấy tờ số hóa", "")]
    public async Task<ActionResult> CapNhatTrangThaiSoHoa(CapNhatTrangThaiSoHoaReq req, DefaultIdType id)
    {
        try
        {
            req.Id = id;
            bool res = await _giayToSoHoaService.CapNhatTrangThaiSoHoa(req);
            if (res)
            {
                return Ok(Result.Success());
            }
            return StatusCode(200, Result.Fail("Cập nhật thất bại"));
        }
        catch (ArgumentException ex)
        {
            return StatusCode(400, Result.Fail(ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }


    [Authorize]
    [HttpPut("UpdateGTSHKhoTaiLieu/{id:guid}")]
    [OpenApiOperation("Cập nhật GTSH khi thêm GTSH vào kho tài liệu điện tử", "")]
    public async Task<ActionResult> AddGTSHVaoKhoTaiLieu(UpdateAddGTSHVaoKhoTaiLieuCommand req, DefaultIdType id)
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
    [OpenApiOperation("Xóa tạm thời/vĩnh viễn một giấy tờ số hóa ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteGiayToSoHoaCommand req, DefaultIdType id)
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
    [OpenApiOperation("khôi phục một giấy tờ số hóa ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreGiayToSoHoaCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
