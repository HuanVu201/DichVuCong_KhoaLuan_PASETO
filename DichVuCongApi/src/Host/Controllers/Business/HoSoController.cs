using Microsoft.Extensions.Options;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Commands;
using TD.DichVuCongApi.Application.Common.Exceptions;
using TD.DichVuCongApi.Application.Common.KetNoi.DVC.TBKM;
using TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
using TD.DichVuCongApi.Application.Common.MemoryCacheService;
using TD.DichVuCongApi.Application.Common.QrCodeServive;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Queries;
using TD.DichVuCongApi.Application.Common.Interfaces;
using TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction.XuatPhieuCommand;
using TD.DichVuCongApi.Application.Common.KetNoi.DVC.SyncLocalDataToDVCQG;
using TD.DichVuCongApi.Application.Common.KetNoi.BGTVT;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchHoSoXinRutTraLai;
using TD.DichVuCongApi.Application.Common.KetNoi.KhaiSinhKhaiTu;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchHoSoCanBoBCCI;
using TD.DichVuCongApi.Application.Common.KetNoi.SLD;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchHoSoTheoThongKe06CacCap;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchSoTheoDoi;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchHoSoQuaHanXuLy;
using TD.DichVuCongApi.Infrastructure.KetNoi.LLTP;
using Microsoft.AspNetCore.Http.Timeouts;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchTheoThongKeTongHopDonVi;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.ThongKeHoSoPhiDiaGioi;
using System.Net;
using TD.DichVuCongApi.Infrastructure.Identity;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries.Views.ChamSoHoas;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands.ChamSoHoa;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Business.HoSoApp.Interfaces;
using DocumentFormat.OpenXml.VariantTypes;
using static TD.DichVuCongApi.Application.Common.KetNoi.LienThongILIS.LienThongILISParams;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Common.KetNoi.LienThongILIS;
using Mapster;
using TD.DichVuCongApi.Domain.Business;
using System.Threading;

namespace TD.DichVuCongApi.Host.Controllers.Business;
public class HoSoController : VersionedApiController
{

    private readonly IConfiguration _configuration;
    private readonly ITBKMService _tBKMService;
    private readonly ILLTPService _lLTPService;
    private readonly IQrCodeService _qrCodeService;
    private readonly ICacheService _cacheService;
    private readonly ThongBaoKhuyenMaiSettings _settingSoCongThuong;
    private readonly ISyncLocalDataToDVCQGService _syncLocalDataToDVCQGService;
    private readonly IGPLXService _gPLXService;
    private readonly IKhaiSinhKhaiTuService _khaiSinhKhaiTuService;
    private readonly ISyncBGTVTService _syncBGTVTService;
    private readonly ISyncSLDService _syncSLDService;
    private readonly ICurrentUser _currentUser;
    private readonly IHoSoServices _hoSoServices;
    private readonly ILienThongILISService _lienThongILISService;
    private readonly ISearchHoSoByNguoiService _searchHoSoByNguoiService;
    public HoSoController(
        IHoSoServices hoSoServices,
        IConfiguration configuration,
        IOptions<TBKM_Config> settingSoCongThuong,
        ITBKMService tBKMService,
        ILLTPService lLTPService,
        IQrCodeService qrCodeService,
        ICacheService cacheService,
        IKhaiSinhKhaiTuService khaiSinhKhaiTuService, 
        ISyncLocalDataToDVCQGService syncLocalDataToDVCQGService,
        IGPLXService gPLXService,
        ISyncSLDService syncSLDService,
        ISyncBGTVTService syncBGTVTService,
        ICurrentUser currentUser,
        ILienThongILISService lienThongILISService,
        ISearchHoSoByNguoiService searchHoSoByNguoiService
        )
    {
        _configuration = configuration;
        _settingSoCongThuong = settingSoCongThuong.Value.SoCongThuong;
        _tBKMService = tBKMService;
        _lLTPService = lLTPService;
        _qrCodeService = qrCodeService;
        _cacheService = cacheService;
        _khaiSinhKhaiTuService = khaiSinhKhaiTuService;
        _syncLocalDataToDVCQGService = syncLocalDataToDVCQGService;
        _gPLXService = gPLXService;
        _syncSLDService = syncSLDService;
        _syncBGTVTService = syncBGTVTService;
        _currentUser = currentUser;
        _hoSoServices = hoSoServices;
        _lienThongILISService = lienThongILISService;
        _searchHoSoByNguoiService = searchHoSoByNguoiService;
    }

    private void BlockUserType(string userType)
    {
        if (string.IsNullOrEmpty(userType))
        {
            throw new CustomException("Authentication Failed.", statusCode: HttpStatusCode.Forbidden);
        }
        if(userType != ApplicationUser.ApplicationUserType.CongDan && userType != ApplicationUser.ApplicationUserType.CanBo && userType != ApplicationUser.ApplicationUserType.Admin)
        {
            throw new CustomException("Authentication Failed.", statusCode: HttpStatusCode.Forbidden);
        }
        if(_currentUser.GetTypeUser().ToLower() == userType.ToLower())
        {
            throw new CustomException("Authentication Failed.", statusCode: HttpStatusCode.Forbidden);
        }
    }
    private void AllowOnlyAdmin()
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        BlockUserType(ApplicationUser.ApplicationUserType.CanBo);
    }

    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [Authorize]
    [HttpPost("gplx/SyncBGTVTManual")]
    [OpenApiOperation("đồng bộ tay hồ sơ giao thông vận tải", "")]
    public async Task<ActionResult> SyncBGTVTManual([FromBody] SyncDataManualRequest req)
    {
        try
        {
            await _syncBGTVTService.SyncDataManual(req);
            return Ok(Result.Success());
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [Authorize]
    [HttpPost("gplx/SyncGPLXManual")]
    [OpenApiOperation("đồng bộ tay hồ sơ gplx", "")]
    public async Task<ActionResult> SyncGPLXManual([FromBody] SyncDataManualRequest req)
    {
        try
        {
            await _gPLXService.SyncDataManual(req);
            return Ok(Result.Success());
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [Authorize]
    [HttpGet("dulieudvc")]
    [OpenApiOperation("dữ liệu đồng bộ dvc", "")]
    public async Task<ActionResult<object>> Add([FromQuery] SyncDataToDVCQG.NgayTiepNhanDongBoDVCQG req)
    {
        try
        {
            return await _syncLocalDataToDVCQGService.SyncData(req.ngayTiepNhanFrom, req.ngayTiepNhanTo);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [Authorize]
    [HttpGet("GetDataDB")]
    [OpenApiOperation("dữ liệu đồng bộ dvc", "")]
    public async Task<ActionResult<object>> GetDataDB([FromQuery] SyncDataToDVCQG.NgayTiepNhanDongBoDVCQG req)
    {
        try
        {
            return await _syncLocalDataToDVCQGService.GetDataDB(req);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [Authorize]
    [HttpPost("formatData")]
    [OpenApiOperation("dữ liệu đồng bộ dvc", "")]
    public async Task<ActionResult<object>> DuLieu1HoSoDVC([FromBody] SyncDataToDVCQG.HoSoDto data)
    {
        try
        {
            return _syncLocalDataToDVCQGService.FormatData(data);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [Authorize]
    [HttpPost("PushDataDVCQG")]
    [OpenApiOperation("dữ liệu đồng bộ dvc", "")]
    public async Task<ActionResult<object>> PushDataDVCQG([FromBody] SyncDataToDVCQG.HoSoDto data)
    {
        try
        {
            var res = await _syncLocalDataToDVCQGService.PushData(data);
            return StatusCode(200, new
            {
                data = res
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [Authorize]
    [HttpPost("CapNhatChuaDongBoDVCQG")]
    [OpenApiOperation("dữ liệu đồng bộ dvc", "")]
    public async Task<ActionResult<object>> CapNhatChuaDongBoDVCQG([FromBody] SyncDataToDVCQG.CapNhatChuaDongBoDVCQG data)
    {
        try
        {
            var res = await _syncLocalDataToDVCQGService.CapNhatChuaDongBoMaHoSoLois(data.MaHoSos);
            return StatusCode(200, new
            {
                data = res
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [Authorize]
    [HttpPost("PushDataDVCQGByMaHoSo")]
    [OpenApiOperation("dữ liệu đồng bộ dvc", "")]
    public async Task<ActionResult<object>> PushDataDVCQGByMaHoSo([FromBody] SyncDataToDVCQG.NgayTiepNhanDongBoDVCQG req)
    {
        try
        {
            if (string.IsNullOrEmpty(req.maHoSo))
            {
                return BadRequest(new { data = "Vui lòng nhập mã hồ sơ" });
            }
            var res = await _syncLocalDataToDVCQGService.PushDataByMaHoSo(req.maHoSo);
            return StatusCode(200, new
            {
                data = res
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [HttpPost("testpushbtxht/{maHoSo}")]
    public async Task<ActionResult> GetKSKT(string maHoSo)
    {
        try
        {
            await _syncSLDService.Push1Data(maHoSo);
            return Ok(Result.Success("Thao tác thành công"));
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [HttpPost("TuChoiBTP/{maHoSo}")]
    public async Task<ActionResult> TuChoiBTP(string maHoSo)
    {
        try
        {
            var res = await _khaiSinhKhaiTuService.FakeTuChoiBTP(maHoSo);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPost("LienThongBTP/{maHoSo}")]
    public async Task<ActionResult> LienThongKSKT(string maHoSo)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await _khaiSinhKhaiTuService.PushToBTP(maHoSo);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPost("LienThongDangKyKetHon")]
    public async Task<ActionResult> LienThongKetHon([FromBody] LienThongBTPDangKyKetHonRequest request, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await _khaiSinhKhaiTuService.PushToBTPDangKyKetHon(request, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPost("LayKetQuaBTP")]
    public async Task<ActionResult> LayKetQuaBTP([FromBody] List<string> MaHoSos)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await _khaiSinhKhaiTuService.ScanManual(MaHoSos);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost]
    [OpenApiOperation("Thêm một hồ sơ trực tiếp", "")]
    public async Task<ActionResult> Add(AddHoSoCommand req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            if (!string.IsNullOrEmpty(req.DonViPhiDiaGioi))
            {
                req.DonViPhiDiaGioi = null;
            }
            var res = await Mediator.Send(req, cancellationToken);
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
    [MustHavePermission(TDAction.Update, TDResource.NhomCanBoUpdatePhiDiaGioi)]
    [HttpPost("PhiDiaGioi")]
    [OpenApiOperation("Thêm một hồ sơ phi địa giới", "")]
    public async Task<ActionResult> AddPhiDiaGioi(AddHoSoCommand req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            if (string.IsNullOrEmpty(req.DonViPhiDiaGioi))
            {
                return BadRequest(new Result() { Message = "Vui lòng cung cấp đơn vị phi địa giới" });
            }
            var res = await Mediator.Send(req, cancellationToken);
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
    [MustHavePermission(TDAction.Update, TDResource.NhomCanBoUpdatePhiDiaGioi)]
    [HttpPost("ChuyenHoSoPhiDiaGioi")]
    [OpenApiOperation("Thêm một hồ sơ phi địa giới", "")]
    public async Task<ActionResult> ChuyenHoSoPhiDiaGioi(ChuyenHoSoPhiDiaGioiCommand req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            if (res.Succeeded)
            {
                return StatusCode(201, res);
            }
            return BadRequest(new Result() { Message = res.Message });
        }
        catch(NotFoundException exx)
        {
            return StatusCode(404, Result.Fail(exx.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [AllowAnonymous]
    [HttpPost("DongBoTaoMoiHoSo")]
    [OpenApiOperation("Đồng bộ tạo mới hồ sơ", "")]
    public async Task<ActionResult> DongBoTaoMoiHoSo(ThemMoiHoSoCommand req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPost("ThemMoiHoSoDienTu")]
    [OpenApiOperation("Thêm mới hồ sơ điện tử", "")]
    public async Task<ActionResult> ThemMoiHoSoDienTu(ThemMoiHoSoDienTuCommand req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPost("ThemHoSoChungThuc")]
    [OpenApiOperation("Thêm một hồ sơ chứng thực trực tiếp", "")]
    public async Task<ActionResult> ThemHoSoChungThuc(AddHoSoCommand req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.CheckKySo = false;
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPost("YeuCauThuPhiChungThuc")]
    [OpenApiOperation("Yêu cầu thu phí chứng thực", "")]
    public async Task<ActionResult> YeuCauThuPhiChungThuc(YeuCauThuPhiChungThucHoSoCommand req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("/KetQuaThue")]
    [OpenApiOperation("Gửi hồ sơ lên liên thông lý lịch tư pháp", "")]
    public async Task<ActionResult> CapNhatKetQuaILIS([FromBody] CapNhatKetQuaThongBaoThueRequest req, [FromQuery] CapNhatKetQuaThongBaoThueQueryString reqQueryStr, CancellationToken cancellationToken)
    {
        try
        {
            if (reqQueryStr.CodeGet != _lienThongILISService.GetCodeGet())
            {
                return BadRequest(Result<string>.Fail("Mã xác thực không hợp lệ"));
            }
            var res = await _hoSoServices.CapNhatKetQuaILIS(req, cancellationToken);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("LienThongHeThongLLTP")]
    [OpenApiOperation("Gửi hồ sơ lên liên thông lý lịch tư pháp", "")]
    public async Task<ActionResult> LienThongHeThongLLTP(LienThongLLTPRequest req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await _lLTPService.GuiLienThongBoMCDT(req.idHoSo, req.eformBase64Data, cancellationToken);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("LLTP/LayMaHoSo")]
    [OpenApiOperation("Lấy mã hồ sơ mới thuộc sở tư pháp", "")]
    public async Task<ActionResult> LayMaHoSoLLTP([FromQuery] LLTPServiceReq req, CancellationToken cancellationToken)
    {
        try
        {
            if (req.CodeGet != _lLTPService.GetCodeGet())
            {
                return BadRequest(Result<string>.Fail("Mã xác thực không hợp lệ"));
            }
            var res = await _lLTPService.GenerateMaHoSo(cancellationToken);
            return StatusCode(200, new Result<string>
            {
                Data = res
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPut("LLTP/ThuHoiQuyetDinh/{maHoSo}")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo mã Id", "")]
    public async Task<ActionResult> ThuHoiQuyetDinh(string maHoSo, [FromBody] LLTP_VNEIDParams.ThuHoiQuyetDinhLLTP req)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await _lLTPService.ThuHoiQuyetDinh(maHoSo, req);
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
    [HttpPost("LLTP/TaoHoSo")]
    [OpenApiOperation("Tạo hồ sơ mới (vneid)", "")]
    public async Task<ActionResult> TaoHoSo([FromBody] LLTP_VNEIDParams.Request reqBody, [FromQuery] LLTPServiceReq reqQueryStr, CancellationToken cancellationToken)
    {
        try
        {
            if (reqQueryStr.CodeGet != _lLTPService.GetCodeGet())
            {
                return BadRequest(Result<string>.Fail("Mã xác thực không hợp lệ"));
            }
            var res = await _lLTPService.VneidSendData(reqBody, cancellationToken);
            return StatusCode(200, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("LLTP/GuiLienThongBo/{maHoSo}")]
    [OpenApiOperation("Tạo hồ sơ mới (vneid)", "")]
    public async Task<ActionResult> GuiLienThongBoBTP(string maHoSo)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await _lLTPService.GuiLienThongBo(maHoSo);
            return StatusCode(200, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex);
        }
    }


    [AllowAnonymous]
    [HttpPost("GiayPhepLaiXe")]
    [OpenApiOperation("Thêm một hồ sơ thông báo khuyến mại sở công thương", "")]
    public async Task<ActionResult> AddThongBaoKhuyenMai(GPLXParams req)
    {
        try
        {
            var res = await _gPLXService.AddGPLX(req);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("ThongBaoKhuyenMai")]
    [OpenApiOperation("Thêm một hồ sơ thông báo khuyến mại sở công thương", "")]
    public async Task<ActionResult> AddThongBaoKhuyenMai(AddTKBMRequestParams req)
    {
        try
        {
            var res = await _tBKMService.AddTBKM(req, _settingSoCongThuong);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("ThongBaoKhuyenMaiBoSung")]
    [OpenApiOperation("Thêm một hồ sơ thông báo khuyến mại bổ sung sở công thương", "")]
    public async Task<ActionResult> AddThongBaoKhuyenMaiBoSung(AddBSTBKMRequestParams req)
    {
        try
        {
            var res = await _tBKMService.AddBSTBKM(req, _settingSoCongThuong);
            return StatusCode(201, res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("NopTrucTuyen")]
    [OpenApiOperation("Thêm một hồ sơ trực tuyến", "")]
    [RequestTimeout(100000)]
    public async Task<ActionResult> NopTrucTuyen(NopHoSoTrucTuyenCommand req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpGet]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchHoSoQuery req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("NguoiDangXuLy")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> SeachHoSoByNguoiDangXuLy([FromQuery] SearchHoSoQuery req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await _searchHoSoByNguoiService.SearchHoSoByNguoiDangXuLy(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpGet("NguoiDaXuLy")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> SeachHoSoByNguoiDaXuLy([FromQuery] SearchHoSoQuery req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await _searchHoSoByNguoiService.SearchHoSoByNguoiDaXuLy(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpGet("NguoiNhanHoSo")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> SeachHoSoByNguoiNhanHoSo([FromQuery] SearchHoSoQuery req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await _searchHoSoByNguoiService.SearchHoSoByNguoiNhanHoSo(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("NguoiGui")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> SearchHoSoByNguoiGui([FromQuery] SearchHoSoQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await _searchHoSoByNguoiService.SearchHoSoByNguoiGui(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }


    [Authorize]
    [HttpGet("ChamSoHoa")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> SearchChamSoHoa([FromQuery] SearchChamSoHoaQuery req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPut("ChamSoHoa/TiepNhan/{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> CapNhatThanhPhanHoSoCommand([FromBody] CapNhatThanhPhanHoSoCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    

    [Authorize]
    [HttpGet("ScanHoSoDienTu")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> SearchScanHoSoDienTu([FromQuery] SearchScanHoSoDienTuQuery req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("ThongKeTheoDoiTrangThaiHS")]
    [OpenApiOperation("Thống kê theo dõi trạng thái xử lý hồ sơ", "")]
    public async Task<ActionResult> ThongKeTheoDoiTrangThaiXuLyHoSo([FromQuery] ThongKeTheoDoiTrangThaiXuLyHoSoQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("TheoDoiHoSoKhongDuocTiepNhan")]
    [OpenApiOperation("Thống kê theo dõi hồ sơ không được tiếp nhận", "")]
    public async Task<ActionResult> TheoDoiHoSoKhongDuocTiepNhan([FromQuery] TheoDoiHoSoKhongDuocTiepNhanQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("ThongKeHoSoTrongNgay")]
    [OpenApiOperation("Thống kê hồ sơ trong ngày", "")]
    public async Task<ActionResult> ThongKeTrongNgay([FromQuery] ThongKeTrongNgayQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("ThongKeHSLienThong")]
    [OpenApiOperation("Thống kê hồ sơ liên thông", "")]
    public async Task<ActionResult> ThongKeHSLienThong([FromQuery] ThongKeHSLienThongQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("HoSoLienThong")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ liên thông theo bộ lọc", "")]
    public async Task<ActionResult> SearchHoSoLienThong([FromQuery] SearchHoSoLienThongQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpGet("CanBoBCCISearch")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo bộ lọc cán bộ BCCI", "")]
    public async Task<ActionResult> SeCanBoBCCISearcharch([FromQuery] SearchHoSoCanBoBCCIRequest req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("Portal")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ ngoài cổng", "")]
    public async Task<ActionResult> SearchHoSoPortal([FromQuery] SearchHoSoPortalQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("TheoDoiHoSoChungThuc")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> SearchTheoDoiHoSoChungThuc([FromQuery] SearchTheoDoiHoSoChungThucQuery req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("HoSoChungThucs")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ chứng thực theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] SearchHoSoChungThucQuery req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("PostEmailTheoDoiHoSoChungThuc")]
    [OpenApiOperation("Gửi email theo doi hồ sơ chứng thực", "")]
    public async Task<ActionResult> PostEmailTheoDoiHoSoChungThuc(GuiMailTheoHoSoChungThucCommand req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("StatisticHoSoChungThucs")]
    [OpenApiOperation("Thống kê dữ liệu hồ sơ chứng thực theo bộ lọc", "")]
    public async Task<ActionResult> StatisticHSCT([FromQuery] StatisticHoSoChungThucQuery req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("StatisticChiTietHoSoChungThucs")]
    [OpenApiOperation("Thống kê dữ liệu hồ sơ chi tiết", "")]
    public async Task<ActionResult> StatisticDetailHSCT([FromQuery] StatisticChiTietHSCTQuery req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("Search/TrangThaiThuPhi")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo trạng thái thu phí", "")]
    public async Task<ActionResult> SearchTheoTrangThaiThuPhi([FromQuery] SearchHoSoTheoTrangThaiThuPhi req, CancellationToken cancellationToken)
    {
        try
        {
            req.LaNguoiNhanHoSo = true;
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("Search/TrangThaiXuLy")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo trạng thái theo bộ lọc", "")]
    public async Task<ActionResult> SearchTheoTrangThai(SearchHoSoTheoHanXuLyQuery req  , CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("Search/HoSoQuaHan")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ quá hạn theo bộ lọc", "")]
    public async Task<ActionResult> HoSoQuaHan(SearchHoSoQuaHanXuLyRequest req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }


    [Authorize]
    [HttpPost("Search/HoSoXinRutTraLai")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ xin rút, trả lại theo bộ lọc", "")]
    public async Task<ActionResult> SearhHoSoXinRutTraLai(SearhHoSoXinRutTraLaiQuery req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("SearchHoSoTraCuu")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> SearchAllowAnonymous([FromBody] SearchHoSoTraCuu req, CancellationToken cancellationToken)
    {
        try
        {
            string recaptchatSecretKey = _configuration.GetValue<string>("RECAPTCHA_SECRETKEY");
            if (string.IsNullOrEmpty(recaptchatSecretKey))
            {
                return StatusCode(500, "Chưa cấu hình mã secret_key");
            }
            req.SetSecretKey(recaptchatSecretKey);
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (CustomException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("GetHoSoPublic")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> GetHoSoPublic([FromBody] GetHoSoPublicQuery req, CancellationToken cancellationToken)
    {
        try
        {
            string? securityCode = _configuration.GetValue<string>("SecurityCode");
            if (string.IsNullOrEmpty(securityCode))
            {
                req.SetSecretKey("GetHoSoPublic");
            }
            else
            {
                req.SetSecretKey(securityCode);
            }
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (CustomException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("GetHoSoTheoCanBoXuLy")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo đơn vị xử lý", "")]
    public async Task<ActionResult> GetHoSoTheoDonViXuLy([FromBody] GetHoSoTheoDonViQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (CustomException ex)
        {
            return StatusCode((int)ex.StatusCode, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("GetHoSoThongTinTienTrinh")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ, thông tin tiến trình hồ sơ theo mã hồ sơ", "")]
    public async Task<ActionResult> GetHoSoThongTinTienTrinh(string maHoSo, string key)
    {
        try
        {
            string? securityCode = _configuration.GetValue<string>("ApiXemChiTietHoSoKey");
            if (securityCode == null)
            {
                throw new Exception("Chưa cấu hình Key");
            }
            if (string.IsNullOrEmpty(key))
            {
                throw new Exception("Vui lòng nhập key !");
            }
            else if (key != securityCode)
            {
                throw new Exception("Key người dùng nhập không đúng! ");
            }
            

            var res = await Mediator.Send(new ChiTietHoSoPublicQuery(maHoSo));
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
    [HttpGet("detail")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo mã Id", "")]
    public async Task<ActionResult> Get([FromQuery] GetHoSoQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            var data = res.Data.Adapt<HoSo>();
            if (res.Data is IDictionary<string, object> dapperRow)
            {
                HoSo hoSo = new HoSo();
                hoSo.NguoiDangXuLy = dapperRow["nguoiDangXuLy"] as string;
                hoSo.NguoiDaXuLy = dapperRow["nguoiDaXuLy"] as string;
                hoSo.NguoiNhanHoSo = dapperRow["nguoiNhanHoSo"] as string;
                hoSo.DonViId = dapperRow["donViId"] as string;
                hoSo.DonViDaChuyenXuLy = dapperRow["donViDaChuyenXuLy"] as string;
                hoSo.NguoiGui = dapperRow["nguoiGui"] as string;
                data = hoSo;
            }
            if (!(await _hoSoServices.HasPermissionHandleHoSo(data)))
            {
                return StatusCode(403, Result.Fail("Không có quyền truy cập tài nguyên hiện tại"));
            }
            return Ok(res);
        }
        catch (NotFoundException ex)
        {
            return NotFound(Result.Fail(ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpPost("GetDuLieuOCR/{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu trích xuất OCR", "")]
    public async Task<ActionResult> GetDuLieuOCR(GetDuLieuOCRQuery req, Guid id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpGet("HoSoYeuCauBoSung/{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ yêu cầu bổ sung theo mã Id", "")]
    public async Task<ActionResult> GetHoSoYeuCauBoSung(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(new ChiTietBoSungHoSoQuery(id), cancellationToken);
            var data = res.Data.Adapt<HoSo>();
            if (!(await _hoSoServices.HasPermissionHandleHoSo(data)))
            {
                return StatusCode(403, Result.Fail("Không có quyền truy cập tài nguyên hiện tại"));
            }
            return Ok(res);
        }
        catch (NotFoundException ex)
        {
            return NotFound(Result.Fail(ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [AllowAnonymous]
    [HttpGet("GetByMa/{code}")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo mã hồ sơ", "")]
    public async Task<ActionResult> GetByMa(string code, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(new GetHoSoByMaQuery(code), cancellationToken);
            var data = res.Data.Adapt<HoSo>();
            if (!(await _hoSoServices.HasPermissionHandleHoSo(data)))
            {
                return StatusCode(403, Result.Fail("Không có quyền truy cập tài nguyên hiện tại"));
            }
            return Ok(res);
        }
        catch (NotFoundException ex)
        {
            return NotFound(Result.Fail(ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [AllowAnonymous]
    [HttpGet("GetHoSoDanhGiaHaiLong")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo mã hồ sơ", "")]
    public async Task<ActionResult> GetHoSoDanhGiaHaiLong([FromQuery] GetHoSoDanhGiaHaiLongQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpGet("printdata/{id:guid}")]
    [OpenApiOperation("Lấy dữ liệu in phiếu hồ sơ theo mã Id", "")]
    public async Task<ActionResult> PrintData(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(new ChiTietHoSoQuery(id), cancellationToken);
            var data = res.Data.Adapt<HoSo>();
            if (!(await _hoSoServices.HasPermissionHandleHoSo(data)))
            {
                return StatusCode(403, Result.Fail("Không có quyền truy cập tài nguyên hiện tại"));
            }
            return Ok(res);
        }
        catch (NotFoundException ex)
        {
            return NotFound(Result.Fail(ex.Message));
        }
        catch (Exception ex)
        {
            return StatusCode(500, Result.Fail(ex.Message));
        }
    }

    [Authorize]
    [HttpPut("chuyendulieutaikhoan")]
    [OpenApiOperation("Chuyển dữ liệu tài khoản", "")]
    public async Task<ActionResult> ChuyenDuLieuTaiKhoan(ChuyenDuLieuTaiKhoanCommand req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPut("thaydoitrangthaihoso")]
    [OpenApiOperation("Thay đổi trạng thái hồ sơ", "")]
    public async Task<ActionResult> UpdateTrangThaiHoSo(UpdateTrangThaiHoSoCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPut("ketthuchosokhuyenmai")]
    [OpenApiOperation("Kết thúc hồ sơ có thủ tục thông báo khuyến mãi", "")]
    public async Task<ActionResult> KetThucHoSoCoThuTucTBKM(KetThucHoSoThongBaoKhuyenMaiCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("getOrSetMemoryCache")]
    [OpenApiOperation("Kiểm tra lấy/tạo mới memoryCache")]
    public async Task<ActionResult> getOrSetMemoryCache(MemoryCacheServiceRequestParams req, CancellationToken cancellationToken)
    {
        try
        {
            var data = await _cacheService.GetOrSetWithParamsAsync(req.Key,
                req.Value,
                TimeSpan.FromMinutes(req.CacheTime ?? 10), cancellationToken);
            return Ok(data);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("saveQrCodeData/{id}")]
    [OpenApiOperation("Lưu dữ liệu QrCode")]
    public async Task<ActionResult> SaveQrCodeHoSo(QrCodeServiceRequestParams req, CancellationToken cancellationToken)
    {
        try
        {
            await _qrCodeService.LogAsync(new QrCodeServiceRequestParams()
            {
                Id = req.Id,
                Content = req.Content,
                Expiry = req.Expiry,
            });
            return StatusCode(201, req.Id);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("getQrCodeData/{id}")]
    [OpenApiOperation("Lấy dữ liệu QrCode")]
    public async Task<IActionResult?> GetQrCodeHoSo(Guid id)
    {
        try
        {
            var res = await _qrCodeService.GetQrAsync(new GetQrCodeById()
            {
                Id = id,
            });
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
    [MustHavePermission(TDAction.View, TDResource.NhomCanBoMotCua + "," + TDResource.NhomCanBoTTHCC + "," + TDResource.NhomLanhDaoDonVi + "," + TDResource.NhomLanhDaoPhong + "," + TDResource.NhomCanBoXuLyChungThucDienTu + "," + TDResource.NhomChuyenVien + "," + TDResource.NhomQuanTriDonVi + "," + TDResource.NhomVanThuDonVi)]
    [HttpPut("{id:guid}")]
    [OpenApiOperation("Sửa một hồ sơ", "")]
    public async Task<ActionResult> Update(UpdateHoSoCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("TuChoiTiepNhanHoSoTrucTuyen/{id:guid}")]
    [OpenApiOperation("Từ chối tiếp nhận hồ sơ trực tuyến", "")]
    public async Task<ActionResult> TuChoiTiepNhanHoSoTrucTuyen(TuChoiTiepNhanTucTuyenCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
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

    [AllowAnonymous]
    [HttpPost("GuiPhieuTiepNhanHoSo")]
    [OpenApiOperation("Gửi phiếu tiếp nhận hồ sơ cho công dân", "")]
    public async Task<ActionResult> GuiPhieuTiepNhanHoSo(GuiPhieuTiepNhanCommand req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("KhongTiepNhanHoSoBoSungQuaHan/{id:guid}")]
    [OpenApiOperation("Từ chối tiếp nhận hồ sơ trực tuyến", "")]
    public async Task<ActionResult> KhongTiepNhanQuaHanHoSoBoSung(KhongTiepNhanQuaHanBoSungHoSoCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("ChuyenBuocXuLyHoSo/{id:guid}")]
    [OpenApiOperation("Chuyển tiếp bước xử lý của một hồ sơ", "")]
    public async Task<ActionResult> ChuyenTiepBuocXuLy(ChuyenBuocXuLyHoSoCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("ChuyenBuocXuLyNhieuHoSo")]
    [OpenApiOperation("Chuyển tiếp bước xử lý của một hồ sơ", "")]
    [RequestTimeout(200000)]
    public async Task<ActionResult> ChuyenTiepBuocXuLyNhieuHoSo([FromBody] ChuyenBuocXuLyNhieuHoSoCommand req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("KetThucNhieuHoSoTBKM")]
    [OpenApiOperation("Kết thúc nhiều hồ sơ TBKM", "")]
    public async Task<ActionResult> KetThucNhieuHoSoTBKM([FromBody] KetThucNhieuHoSoTBKMCommand req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("DatLaiNhieuHoSoQuaHan")]
    [OpenApiOperation("Đặt lại nhiều hồ sơ quá hạn", "")]
    public async Task<ActionResult> DatLaiNhieuHoSoQuaHan([FromBody] DatLaiNhieuHoSoQuaHanCommand req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("KySoHoSoChungThuc/{id:guid}")]
    [OpenApiOperation("Ký số chứng thực", "")]
    public async Task<ActionResult> ChuyenXuLyHoSoChungThuc(KySoChungThucHoSoCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
            if (res.Succeeded)
            {
                return Ok(res);
            }

            return StatusCode(500, new Result() { Message = res.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPut("TraKetQuaChungThuc/{id:guid}")]
    [OpenApiOperation("Trả kết quả chứng thực", "")]
    public async Task<ActionResult> TraKetQuaChungThuc(TraKetQuaChungThucCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
            if (res.Succeeded)
            {
                return Ok(res);
            }
            return StatusCode(500, new Result() { Message = res.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPut("CapSoVaDongDauHoSoChungThuc/{id:guid}")]
    [OpenApiOperation("Cấp số và đóng dấu hồ sơ chứng thực", "")]
    public async Task<ActionResult> CapSoVaDongDauHoSoChungThuc(CapSoVaDongDauHoSoChungThucCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
            if (res.Succeeded)
            {
                return Ok(res);
            }
            return StatusCode(500, new Result() { Message = res.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("YeuCauThuPhi/{id:guid}")]
    [OpenApiOperation("Yêu cầu thu phí một hồ sơ", "")]
    public async Task<ActionResult> YeuCauThuPhi(YeuCauThuPhiCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("ChuyenBuocNhanhHoSo")]
    [OpenApiOperation("Chuyển tiếp bước nhanh của một hồ sơ", "")]
    public async Task<ActionResult> ChuyenBuocNhanhHoSo(ChuyenBuocNhanhCommand req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("TiepNhanHoSoTrucTuyen/{id:guid}")]
    [OpenApiOperation("Tiếp nhận hồ sơ trực tuyến", "")]
    public async Task<ActionResult> TiepNhanHoSoTrucTuyen(TiepNhanTrucTuyenCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            req.IsMultiple = false;
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("TiepNhanNhieuHoSoTrucTuyen")]
    [OpenApiOperation("Tiếp nhận nhiều hồ sơ trực tuyến", "")]
    public async Task<ActionResult> TiepNhanNhieuHoSoTrucTuyen(TiepNhanTrucTuyenNhieuHoSoCommand req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("TiepNhanHoSoChungThuc/{id:guid}")]
    [OpenApiOperation("Tiếp nhận hồ sơ trực tuyến", "")]
    public async Task<ActionResult> TiepNhanHoSoChungThuc(TiepNhanHoSoChungThucCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            req.IsMultiple = false;
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("TiepNhanNhieuHoSoChungThuc")]
    [OpenApiOperation("Tiếp nhận nhiều hồ sơ chứng thực trực tuyến", "")]
    public async Task<ActionResult> TiepNhanNhieuHoSoChungThuc(TiepNhanNhieuHoSoChungThucCommand req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPost("ThayDoiTruongHopThuTuc")]
    [OpenApiOperation("Thay đổi trường hợp thủ tục của một hồ sơ", "")]
    public async Task<ActionResult> ThayDoiTruongHopThuTuc(ThayDoiTruongHopThuTucHoSoCommand req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpGet("ThongKeHoSoNguoiDung")]
    [OpenApiOperation("Thống kê hồ sơ của người dùng hiện tại", "")]
    public async Task<ActionResult> ThongKeHoSoNguoiDung()
    {
        try
        {
            var res = await Mediator.Send(new ThongKeHoSoNguoiDungQuery());
            if (res.Succeeded)
            {
                return Ok(res);
            }
            return BadRequest(new Result()
            {
                Message = res.Message
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPut("TraKetQua/{id:guid}")]
    [OpenApiOperation("Thay đổi trường hợp thủ tục của một hồ sơ", "")]
    public async Task<ActionResult> TraKetQua(TraKetQuaHoSoCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
            if (res.Succeeded)
            {
                return Ok(res);
            }
            return BadRequest(new Result()
            {
                Message = res.Message
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPut("ChuyenNoiBo/{id:guid}")]
    [OpenApiOperation("Chuyển nội bộ một hồ sơ", "")]
    public async Task<ActionResult> ChuyenNoiBo(ChuyenNoiBoHoSoCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
            if (res.Succeeded)
            {
                return Ok(res);
            }
            return BadRequest(new Result()
            {
                Message = res.Message
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPut("CapNhatKetQua/{id:guid}")]
    [OpenApiOperation("Cập nhật kết quả một hồ sơ", "")]
    public async Task<ActionResult> CapNhatKetQua(CapNhatKetQuaHoSoCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
            if (res.Succeeded)
            {
                return Ok(res);
            }
            return BadRequest(new Result()
            {
                Message = res.Message
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPut("CapNhatKetQuaNhieuHoSo")]
    [OpenApiOperation("Cập nhật kết quả nhiều hồ sơ", "")]
    public async Task<ActionResult> CapNhatKetQuaNhieuHoSoCommand(CapNhatKetQuaNhieuHoSoCommand req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            if (res.Succeeded)
            {
                return Ok(res);
            }
            return BadRequest(new Result()
            {
                Message = res.Message
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPut("KetThuc/{id:guid}")]
    [OpenApiOperation("Kết thúc một hồ sơ", "")]
    public async Task<ActionResult> KetThuc(KetThucHoSoCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("ThuHoiHoSo/{id:guid}")]
    [OpenApiOperation("Thu hồi một hồ sơ", "")]
    public async Task<ActionResult> ThuHoiHoSo(ThuHoiHoSoCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("YeuCauCongDanBoSung/{id:guid}")]
    [OpenApiOperation("Yêu cầu công dân bổ sung một hồ sơ", "")]
    public async Task<ActionResult> YeuCauCongDanBoSung(YeuCauCongDanBoSungHoSoCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("TraLaiHoSo/{id:guid}")]
    [OpenApiOperation("Trả lại một hồ sơ", "")]
    public async Task<ActionResult> TraLaiHoSo(TraLaiHoSoCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("MotCuaYeuCauBoSung/{id:guid}")]
    [OpenApiOperation("Cán bộ một cửa bổ sung một hồ sơ", "")]
    public async Task<ActionResult> YeuCauMotCuaBoSung(MotCuaYeuCauBoSungCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("MotCuaCapNhatBoSung/{id:guid}")]
    [OpenApiOperation("Một cửa cập nhật bổ sung một hồ sơ", "")]
    public async Task<ActionResult> MotCuaCapNhatBoSung(MotCuaCapNhatBoSungCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("MotCuaGuiBoSung/{id:guid}")]
    [OpenApiOperation("Một gửi bổ sung một hồ sơ", "")]
    public async Task<ActionResult> MotCuaGuiBoSung(MotCuaGuiBoSungCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("HoanThanhBoSungHoSo/{id:guid}")]
    [OpenApiOperation("Một gửi bổ sung một hồ sơ", "")]
    public async Task<ActionResult> MotCuaGuiBoSung(DefaultIdType id)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(new HoanThanhBoSungHoSoCommand(id));
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
    [HttpPut("CongDanCapNhatBoSung/{id:guid}")]
    [OpenApiOperation("Công dân cập nhật bổ sung một hồ sơ", "")]
    public async Task<ActionResult> CongDanCapNhatBoSung(CongDanCapNhatBoSungCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPut("CongDanGuiBoSung/{id:guid}")]
    [OpenApiOperation("Công dân bổ sung một hồ sơ", "")]
    public async Task<ActionResult> CongDanGuiBoSung(CongDanGuiBoSungCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
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
    //[MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [HttpDelete]
    [OpenApiOperation("Xóa tạm thời hồ sơ ", "")]
    public async Task<ActionResult> SoftDelete([FromBody] DeleteHoSoCommand req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [MustHavePermission(TDAction.View, TDResource.NhomQuanTriHeThong)]
    [HttpPatch("{id:guid}")]
    [OpenApiOperation("khôi phục một hồ sơ ", "")]
    public async Task<ActionResult> Restore(DefaultIdType id)
    {
        try
        {
            var res = await Mediator.Send(new RestoreHoSoCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPost("XacNhanKetQua")]
    [OpenApiOperation("Xác nhận kết quả", "")]
    public async Task<ActionResult> TiepNhanHoSoTrucTuyen(XacNhanTraKetQuaDapper req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {

            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPost("XacNhanKetQuaVaYeuCauThuPhi")]
    [OpenApiOperation("Xác nhận kết quả và yêu cầu thu phí", "")]
    public async Task<ActionResult> TiepNhanHoSoTrucTuyenVaYeuCauThuPhi(XacNhanTraKetQuaVaYeuCauThuPhi req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {

            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPost("ThuHoiChuyenTraKq")]
    [OpenApiOperation("Thu hồi chuyển trả kết quả TTHCC", "")]
    public async Task<ActionResult> ChuyenTraKetQuaTTHCC(ThuHoiChuyenTraKetQua req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {

            var res = await Mediator.Send(req, cancellationToken);
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

    [AllowAnonymous]
    [HttpPost("GetHoSoByMa")]
    [OpenApiOperation("Lấy hồ sơ theo mã hồ sơ", "")]
    public async Task<ActionResult> GetSoBienNhanByMa(GetSoBienNhanByMaQuery req, CancellationToken cancellationToken)
    {
        try
        {

            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpPost("ChuyenPhiDiaGioi")]
    [OpenApiOperation("Chuyển tiếp nhận phi địa giới", "")]
    public async Task<ActionResult> ChuyenPhiDiaGioi(ChuyenPhiDiaGioi req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {

            var res = await Mediator.Send(req, cancellationToken);
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
    [HttpGet("YeuCauBCCILayKetQua/{id:guid}")]
    [OpenApiOperation("Yêu cầu BCCI lấy kết quả ", "")]
    public async Task<ActionResult> YeuCauBCCILayKetQua(DefaultIdType id)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(new YeuCauBuuDienLayKetQua(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPost("YeuCauBCCILayKetQuaNhieuHoSo")]
    [OpenApiOperation("Yêu cầu BCCI lấy kết quả nhiều hồ sơ", "")]
    public async Task<ActionResult> YeuCauBCCILayKetQuaNhieuHoSo(YeuCauBuuDienLayKetQuaNhieuHoSo req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPost("YeuCauBCCILayKetQuaWithOutItemCode")]
    [OpenApiOperation("Yêu cầu BCCI lấy kết quả không gửi kèm mã vận đơn ", "")]
    public async Task<ActionResult> YeuCauBCCILayKetQuaWithOutItemCode(YeuCauBuuDienLayKetQuaWithoutItemCode id)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(id);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("ThuHoiMaVanDonBuuDien")]
    [OpenApiOperation("Yêu cầu BCCI lấy kết quả ", "")]
    public async Task<ActionResult> ThuHoiMaVanDonBuuDien(ThuHoiMaVanDonBuuDien req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpGet("XacNhanVaYeuCauBCCILayKetQua/{id:guid}")]
    [OpenApiOperation("Xác nhận kết quả và yêu cầu BCCI lấy kết quả ", "")]
    public async Task<ActionResult> XacNhanVaYeuCauBCCILayKetQua(DefaultIdType id)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(new RestoreHoSoCommand(id));
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPut("DangKyNhanKqQuaBCCI/{id:guid}")]
    [OpenApiOperation("Đăng ký nhận kết quả qua BCCI", "")]
    public async Task<ActionResult> DangKyNhanKetQuaQuaBCCI(DefaultIdType id, DangKyNhanKqQuaBCCI req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpPost("ThuHoiDangKyNhanKqQuaBCCI")]
    [OpenApiOperation("Đăng ký nhận kết quả qua BCCI", "")]
    public async Task<ActionResult> DangKyNhanKetQuaQuaBCCI(ThuHoiDangKyNhanKqQuaBCCI req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("Search/TheoBaoCaoTongHop")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo báo cáo tổng hợp", "")]
    public async Task<ActionResult> SearchTheoBaoCaoTonghop([FromQuery] SearchHoSoTheoBaoCaoTongHop req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("Search/TheoBaoCaoTongHopDonVi")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo báo cáo tổng hợp", "")]
    public async Task<ActionResult> SearchTheoBaoCaoTongHopDonVi([FromQuery] SearchTheoThongKeTongHopDonViRequest req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("Search/SoTheoDoiHoSo")]
    [OpenApiOperation("Sổ theo dõi hồ sơ", "")]
    public async Task<ActionResult> SearchSoTheoDoiHoSo([FromQuery] SearchSoTheoDoiHoSoRequest req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("Search/ThongKeHoSoPhiDiaGioi")]
    [OpenApiOperation("Sổ theo dõi hồ sơ phi địa giới", "")]
    public async Task<ActionResult> ThongKeHoSoPhiDiaGioi([FromQuery] ThongKeHoSoPhiDiaGioiRequest req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("Search/TheoThongKe06CacCap")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo báo cáo tổng hợp", "")]
    public async Task<ActionResult> SearchTheoThongKe06CacCap([FromQuery] SearchHoSoTheoThongKe06CacCapRequest req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpGet("Search/TheoBaoCaoTiepNhanHoSoTrucTuyen")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo báo cáo tổng hợp", "")]
    public async Task<ActionResult> SearchTheoBaoCaoTiepNhanHoSoTrucTuyen([FromQuery] SearchTheoBaoCaoHoSoTrucTuyenRequest req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpGet("Search/TheoBaoCaoChiTieuTienDo")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo báo cáo quyết định 766 chỉ tiêu tiến độ", "")]
    public async Task<ActionResult> SearchTTheoBaoCaoChiTieuTienDo([FromQuery] SearchTheoBaoCaoChiTieuTienDoRequest req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpGet("Search/TheoBaoCaoChiTieuSoHoa")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo báo cáo quyết định 766 chỉ tiêu số hóa", "")]
    public async Task<ActionResult> SearchTheoBaoCaoChiTieuSoHoa([FromQuery] SearchHoSoTheoChiTieuSoHoaRequest req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpGet("Search/TheoChiTieuDvcTrucTuyen")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo báo cáo quyết định 766 chỉ tiêu dvc trực tuyến", "")]
    public async Task<ActionResult> SearchHoSoTheoChiTieuDvcTrucTuyen([FromQuery] SearchHoSoTheoChiTieuDvcTrucTuyen req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
    [Authorize]
    [HttpGet("Search/TiepNhanQuaHan")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ tiếp nhận quá hạn", "")]
    public async Task<ActionResult> SearchHoSoTiepNhanQuaHanFunc([FromQuery] SearchHoSoTiepNhanQuaHan req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("xuatPhieu")]
    [OpenApiOperation("Lấy thông tin phiếu / Xuất phiếu", "")]
    public async Task<ActionResult> XuatPhieu([FromQuery] XuatPhieuHoSoCommand request, CancellationToken cancellationToken)
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
    [HttpGet("XuatPhieuBienNhanKetQua")]
    [OpenApiOperation("Lấy thông tin phiếu / Xuất phiếu", "")]
    public async Task<ActionResult> XuatPhieuBienNhanKetQuanCommand([FromQuery] XuatPhieuBienNhanKetQuaCommand request, CancellationToken cancellationToken)
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
    [HttpGet("XuatPhieuHuongDanNopTrucTiep")]
    [OpenApiOperation("Lấy thông tin phiếu / Xuất phiếu", "")]
    public async Task<ActionResult> XuatPhieuHuongDanNopTrucTiepCommand([FromQuery] XuatPhieuHuongDanNopTrucTiepCommand request, CancellationToken cancellationToken)
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
    [HttpGet("getViTriDeHoSo")]
    [OpenApiOperation("Lấy vị trí để hồ sơ theo ID", "")]
    public async Task<ActionResult> getViTriDeHoSo([FromQuery] GetViTriDeHoSoQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpGet("GetInfoTraKetQua")]
    [OpenApiOperation("Lấy thông tin chủ hồ sơ", "")]
    public async Task<ActionResult> GetInfoHoSoQuery([FromQuery] GetInfoHoSoQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            if (!(await _hoSoServices.HasPermissionHandleHoSo(res.Adapt<HoSo>())))
            {
                return StatusCode(403, Result.Fail("Không có quyền truy cập tài nguyên hiện tại"));
            }
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPut("UpdateViTriDeHoSo/{id:guid}")]
    [OpenApiOperation("Cập nhật vị trí để hồ sơ", "")]
    public async Task<ActionResult> UpdateViTriDeHoSo(UpdateViTriDeHoSoCommand req, DefaultIdType id, CancellationToken cancellationToken)
    {
        try
        {
            req.Id = id;
            var res = await Mediator.Send(req, cancellationToken);
            if (res.Succeeded)
            {
                return Ok(res);
            }
            return BadRequest(new Result()
            {
                Message = res.Message
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPut("UpdateTraKetQuaHCC")]
    [OpenApiOperation("Trả kết quả HCC / Trả kết quả và thu hồi bản gốc", "")]
    public async Task<ActionResult> TraKetQuaHcc(TraKetQuaHccCommand req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            if (res.Succeeded)
            {
                return Ok(res);
            }
            return BadRequest(new Result()
            {
                Message = res.Message
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("xuatPhieuBanGiaoKetQua")]
    [OpenApiOperation("Xuất phiếu bàn giao kết quả")]
    public async Task<ActionResult> XuatPhieuBanGiaoKetQuaCommand(XuatPhieuBanGiaoKetQuaCommand request, CancellationToken cancellationToken)
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
    [HttpPost("xuatPhieuTiepNhanNhieuHoSo")]
    [OpenApiOperation("Xuất phiếu tiếp nhận nhiều hồ sơ")]
    public async Task<ActionResult> XuatPhieuTiepNhanNhieuHoSoCommand(XuatPhieuTiepNhanNhieuHoSoCommand request, CancellationToken cancellationToken)
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

    [Authorize]
    [HttpGet("getThongTinTraKetQuaHcc")]
    [OpenApiOperation("Lấy thông tin trả kết quả Hcc theo ID", "")]
    public async Task<ActionResult> GetThongTinTraKetQuaHccQuery([FromQuery] GetThongTinTraKetQuaHccQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            var data = res.Data.Adapt<HoSo>();
            if (!(await _hoSoServices.HasPermissionHandleHoSo(data)))
            {
                return StatusCode(403, Result.Fail("Không có quyền truy cập tài nguyên hiện tại"));
            }
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [Authorize]
    [HttpPost("ThemCanBoTiepNhanHoSo")]
    [OpenApiOperation("Thêm cán bộ tiếp nhận hồ sơ")]
    public async Task<ActionResult> AddCanBoTiepNhanHoSoCommand(AddCanBoTiepNhanHoSoCommand req, CancellationToken cancellationToken)
    {
        BlockUserType(ApplicationUser.ApplicationUserType.CongDan);
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("TraCuuHccPortal")]
    [OpenApiOperation("Lấy dữ liệu hồ sơ theo bộ lọc", "")]
    public async Task<ActionResult> Search([FromQuery] TraCuuHccPortalQuery req, CancellationToken cancellationToken)
    {
        try
        {
            var res = await Mediator.Send(req, cancellationToken);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
