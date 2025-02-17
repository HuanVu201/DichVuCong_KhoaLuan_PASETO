using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.LogVBDLISApp.Commands;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
public class VBDLISDongboTrangThaiLuanChuyenHoSoHandler : IRequestHandler<VBDLISDongBoTrangThaiLuanChuyenHoSoRequest, ProvideToVBLISBaseResponse>
{
    private readonly IDapperRepository _dapperRespository;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IUserService _userService;
    private readonly IVBDLISServices _vBDLISServices;
    private readonly IMediator _mediator;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    public VBDLISDongboTrangThaiLuanChuyenHoSoHandler(INguoiXuLyHoSoService nguoiXuLyHoSoService, IDapperRepository dapperRespository, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IUserService userService, IVBDLISServices vBDLISServices, IMediator mediator)
    {
        _dapperRespository = dapperRespository;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _userService = userService;
        _vBDLISServices = vBDLISServices;
        _mediator = mediator;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }

    public async Task<ProvideToVBLISBaseResponse> Handle(VBDLISDongBoTrangThaiLuanChuyenHoSoRequest request, CancellationToken cancellationToken)
    {
        try
        {
            if (request == null) throw new ArgumentNullException(nameof(request));
            VBDLISSettings settings = _vBDLISServices.Get();
            if (request.SecurityCode != settings.SecurityCode) throw new Exception("Mã bảo mật không chính xác");

            ProvideToVBLISBaseResponse result = new ProvideToVBLISBaseResponse();
            DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
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
            hs.TrangThaiHoSoId
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

            string setValuesUpdate = string.Empty;
            string trangThaiHienTai = hoSo.TrangThaiHoSoId;

            if (trangThaiHienTai != "10" && trangThaiHienTai != "9" && trangThaiHienTai != "5")
            {
                setValuesUpdate = $"TrangThaiHoSoId = '4', ";
            }

            // update hồ sơ
            string updateSql = $"UPDATE Business.HoSos " +
                $"SET {setValuesUpdate} LoaiDuLieuKetNoi = 'VBDLIS', NguoiDangXuLy = null " +
                $"WHERE Id = @Id ";
            await _dapperRespository.ExcuteAsync(updateSql, new { Id = hoSo.Id, request.MaTrangThai });
            var canBoChuyen = await _userService.GetByUsernameAsync(request.MaCanBoChuyen, cancellationToken);
            var canBoNhan = await _userService.GetByUsernameAsync(request.MaCanBoNhan, cancellationToken);
            await _nguoiXuLyHoSoService.SetCurrentUserAsRemoved(hoSo.Id);
            QuaTrinhXuLyHoSo quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, canBoChuyen.Id.ToString(), canBoChuyen.FullName, canBoNhan.Id.ToString(), canBoNhan.FullName,
                request.NgayChuyen.HasValue ? request.NgayChuyen.Value.AddHours(7) : currentTime, trangThai: string.Empty, thaoTac: "Chuyển hồ sơ");
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
            result.Result = 1;
            AddLogVBDLISCommand addLogVBDLIS = new AddLogVBDLISCommand();
            addLogVBDLIS.maHoSo = request.SoBienNhan;
            addLogVBDLIS.api = "VBDLISDongBoTrangThaiLuanChuyenHoSo";
            addLogVBDLIS.body = JsonConvert.SerializeObject(request);
            await _mediator.Send(addLogVBDLIS, cancellationToken);
            return result;
        }
        catch (Exception ex)
        {
            AddLogVBDLISCommand addLogVBDLIS = new AddLogVBDLISCommand();
            addLogVBDLIS.maHoSo = request.SoBienNhan;
            addLogVBDLIS.api = "VBDLISDongBoTrangThaiLuanChuyenHoSo";
            addLogVBDLIS.body = JsonConvert.SerializeObject(request);
            addLogVBDLIS.response = JsonConvert.SerializeObject(ex);
            await _mediator.Send(addLogVBDLIS, cancellationToken);
            throw ex;
        }


    }
}
