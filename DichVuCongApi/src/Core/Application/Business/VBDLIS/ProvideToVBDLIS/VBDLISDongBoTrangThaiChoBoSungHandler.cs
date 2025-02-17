using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.LogVBDLISApp.Commands;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
public class VBDLISDongBoTrangThaiChoBoSungHandler : IRequestHandler<VBDLISDongBoTrangThaiChoBoSungRequest, ProvideToVBLISBaseResponse>
{
    private readonly IDapperRepository _dapperRespository;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IUserService _userService;
    private readonly IMediator _mediator;
    private readonly IVBDLISServices _vBDLISServices;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    public VBDLISDongBoTrangThaiChoBoSungHandler(INguoiXuLyHoSoService nguoiXuLyHoSoService, IDapperRepository dapperRespository, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IUserService userService, IMediator mediator, IVBDLISServices vBDLISServices)
    {
        _dapperRespository = dapperRespository;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _userService = userService;
        _mediator = mediator;
        _vBDLISServices = vBDLISServices;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
    }

    public async Task<ProvideToVBLISBaseResponse> Handle(VBDLISDongBoTrangThaiChoBoSungRequest request, CancellationToken cancellationToken)
    {
        if (request == null) throw new ArgumentNullException(nameof(request));
        VBDLISSettings settings = _vBDLISServices.Get();
        if (request.SecurityCode != settings.SecurityCode) throw new Exception("Mã bảo mật không chính xác");
        ProvideToVBLISBaseResponse result = new ProvideToVBLISBaseResponse();
        DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        AddLogVBDLISCommand addLogVBDLIS = new AddLogVBDLISCommand();
        addLogVBDLIS.maHoSo = request.SoBienNhan;
        addLogVBDLIS.api = "VBDLISDongBoTrangThaiDaBoSung";
        addLogVBDLIS.body = JsonConvert.SerializeObject(request);
        await _mediator.Send(addLogVBDLIS, cancellationToken);
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

        var canBoChuyen = await _userService.GetByUsernameAsync(request.MaCanBoXuLy, cancellationToken);
        string setValuesUpdate = string.Empty;
        string trangThaiHienTai = hoSo.TrangThaiHoSoId;
        if (trangThaiHienTai != "10")
        {
            //if (request.LaTamDung)
            //{
            //    setValuesUpdate = $"TrangThaiHoSoId = '6', NguoiDangXuLy = NguoiNhanHoSo, NgayYeuCauBoSung = @NgayChoBoSung, ";
            //}
            //else
            //{
                setValuesUpdate = $"TrangThaiHoSoId = '5', NguoiDangXuLy = NguoiNhanHoSo, TrangThaiBoSung = N'Yêu cầu một cửa bổ sung', TrangThaiTraKq = '3', NgayYeuCauBoSung = @NgayChoBoSung, ";
            //}

        }

        var hoSoBoSung = new HoSoBoSung(hoSo.MaHoSo, request.GhiChu, null, currentTime, canBoChuyen.Id.ToString(),
               hoSo.NgayHenTra, HoSoConstant.TrangThaiBoSungMotCua, null);
        var insertedRow = await _dapperRespository.InsertEntityAsync<HoSoBoSung>(hoSoBoSung, SchemaNames.Business + "." + TableNames.HoSoBoSungs);

        // update hồ sơ
        string updateSql = $"UPDATE Business.HoSos " +
            $"SET {setValuesUpdate} LoaiDuLieuKetNoi = 'VBDLIS' " +
            $"WHERE Id = @Id ";
        await _dapperRespository.ExcuteAsync(updateSql, new { Id = hoSo.Id, NgayChoBoSung = request.NgayChoBoSung.AddHours(7) });
        if (trangThaiHienTai != "10")
        {
            // trường hợp k thấy ở view đã chuyển để in phiếu, do SetUserAsNguoiDangXuLy cập nhật trạng thái 2 => 1
            if (Guid.TryParse(hoSo.NguoiNhanHoSo, out var nguoiNhanHoSo))
            {
                await _nguoiXuLyHoSoService.AddNguoiXuLyHoSo(new NguoiXuLyHoSo(nguoiNhanHoSo, hoSo.Id), cancellationToken: cancellationToken);
            } else
            {
                //await _nguoiXuLyHoSoService.SetUserAsNguoiDangXuLy(hoSo.Id, hoSo.NguoiNhanHoSo);
                await _nguoiXuLyHoSoService.AddNguoiXuLyHoSos(hoSo.NguoiNhanHoSo, hoSo.Id, cancellationToken: cancellationToken);
            }
        }

        QuaTrinhXuLyHoSo quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, canBoChuyen.Id.ToString(), canBoChuyen.FullName, null, null,
            request.NgayChoBoSung.AddHours(7), trangThai: string.Empty, thaoTac: "VBDLIS yêu cầu bổ sung hồ sơ");
        await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
        result.Result = 1;
        return result;

    }
}
