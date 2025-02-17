using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.LogVBDLISApp.Commands;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
public class VBDLISYeuCauCapNhatHoSoHandler : IRequestHandler<VBDLISYeuCauCapNhatHoSoRequest, ProvideToVBLISBaseResponse>
{
    private readonly IMediator _meidator;
    private readonly IVBDLISServices _vBDLISServices;
    private readonly IDapperRepository _dapperRespository;
    private readonly IUserService _userService;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    public VBDLISYeuCauCapNhatHoSoHandler(INguoiXuLyHoSoService nguoiXuLyHoSoService, IVBDLISServices vBDLISServices, IMediator mediator, IDapperRepository dapperRepository, IUserService userService, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo)
    {
        _meidator = mediator;
        _vBDLISServices = vBDLISServices;
        _dapperRespository = dapperRepository;
        _userService = userService;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }

    public async Task<ProvideToVBLISBaseResponse> Handle(VBDLISYeuCauCapNhatHoSoRequest request, CancellationToken cancellationToken)
    {
        DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        ProvideToVBLISBaseResponse result = new ProvideToVBLISBaseResponse(1, string.Empty);
        VBDLISSettings settings = _vBDLISServices.Get();
        if (request.SecurityCode != settings.SecurityCode) throw new Exception("Mã bảo mật không chính xác");
        if (string.IsNullOrEmpty(request.SoBienNhan)) throw new Exception("Không có số biên nhận");
        AddLogVBDLISCommand addLogVBDLIS = new AddLogVBDLISCommand();
        addLogVBDLIS.maHoSo = request.SoBienNhan;
        addLogVBDLIS.api = "VBDLISYeuCauCapNhatHoSo";
        addLogVBDLIS.body = JsonConvert.SerializeObject(request);
        await _meidator.Send(addLogVBDLIS, cancellationToken);
        string sql = $@"SELECT 
            Top 1
            hs.Id,
            hs.MaHoSo, 
            hs.NgayHenTra, 
            hs.NgayTiepNhan, 
            hs.MaTruongHop, 
            hs.ChuHoSo, 
            hs.SoGiayToChuHoSo, 
            hs.SoDienThoaiChuHoSo, 
            hs.DiaChiChuHoSo, 
            hs.EmailChuHoSo,
            hs.TrangThaiHoSoId,
            hs.NguoiNhanHoSo
        FROM 
            Business.HoSos hs 
            
        WHERE hs.MaHoSo = @SoBienNhan";
        var hoSo = await _dapperRespository.QueryFirstOrDefaultAsync<HoSoQLVB>(sql, new
        {
            request.SoBienNhan
        });
        if (hoSo == null)
        {
            result.Result = 0;
            result.Message = "Không tìm thấy hồ sơ!";
            return result;
        }

        // update hồ sơ
        string updateSql = $"UPDATE Business.HoSos " +
            $"SET LoaiDuLieuKetNoi = 'VBDLIS', TrangThaiHoSoId = '2', NguoiDangXuLy = NguoiNhanHoSo, LastModifiedOn = '{currentTime}' " +
            $"WHERE Id = @Id ";
        await _dapperRespository.ExcuteAsync(updateSql, new { Id = hoSo.Id });
        await _nguoiXuLyHoSoService.SetUserAsNguoiDangXuLy(hoSo.Id, hoSo.NguoiNhanHoSo);
        bool added = false;
        try
        {
            var canBoChuyen = await _userService.GetByUsernameAsync(request.MaCanBoXuLy, cancellationToken);
            QuaTrinhXuLyHoSo quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, canBoChuyen.Id.ToString(), canBoChuyen.FullName, null, null,
                currentTime, request.GhiChu, trangThai: string.Empty, thaoTac: "VBDLIS yêu cầu cập nhật hồ sơ ");
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
            added = true;
        }
        catch (Exception)
        { }

        if (!added)
        {
            QuaTrinhXuLyHoSo quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, hoSo.NguoiNhanHoSo, request.MaCanBoXuLy, null, null,
                  currentTime, request.GhiChu, trangThai: string.Empty, thaoTac: "VBDLIS yêu cầu cập nhật hồ sơ ");
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
        }
        return result;
    }
}
