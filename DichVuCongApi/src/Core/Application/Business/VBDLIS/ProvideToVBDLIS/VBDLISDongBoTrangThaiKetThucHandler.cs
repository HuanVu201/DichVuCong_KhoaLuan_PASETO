using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Constant;
using TD.DichVuCongApi.Application.Business.ILISApp;
using TD.DichVuCongApi.Application.Business.LogVBDLISApp.Commands;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
public class VBDLISDongBoTrangThaiKetThucHandler : IRequestHandler<VBDLISDongBoTrangThaiKetThucRequest, ProvideToVBLISBaseResponse>
{
    private readonly IDapperRepository _dapperRespository;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IUserService _userService;
    private readonly IVBDLISServices _vbdlisServices;
    private readonly IMediator _mediator;
    private readonly IILisServices _iLisServices;
    public VBDLISDongBoTrangThaiKetThucHandler(IDapperRepository dapperRespository, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IUserService userService, IVBDLISServices vbdlisServices, IMediator mediator, IILisServices iLisServices)
    {
        _dapperRespository = dapperRespository;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _userService = userService;
        _vbdlisServices = vbdlisServices;
        _mediator = mediator;
        _iLisServices = iLisServices;
    }

    public async Task<ProvideToVBLISBaseResponse> Handle(VBDLISDongBoTrangThaiKetThucRequest request, CancellationToken cancellationToken)
    {
        if (request == null) throw new ArgumentNullException(nameof(request));
        VBDLISSettings settings = _vbdlisServices.Get();
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
                    hs.NgayYeuCauBoSung,
                  u.UserName NguoiNhanHoSo,
                hs.NguoiDaXuLy,
                gr.LienThongTNMT
                FROM 
                  Business.HoSos hs 
                  INNER JOIN [Identity].Users u ON hs.NguoiNhanHoSo = u.Id
                INNER JOIN Catalog.Groups gr ON hs.DonViId = gr.GroupCode 
                where 
                  hs.MaHoSo = @SoBienNhan";
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
        try
        {
            string dinhKemKetQuas = string.Empty;
            if (request.DanhSachGiayToKetQua != null && request.DanhSachGiayToKetQua.Count > 0)
            {
                List<string> arrDinhKemKetQuas = !string.IsNullOrEmpty(hoSo.LienThongTNMT) && hoSo.LienThongTNMT.ToLower() == "ilis"
            ? await _iLisServices.DownloadFile(request.DanhSachGiayToKetQua, request.SoBienNhan) : await _vbdlisServices.DownloadFile(request.DanhSachGiayToKetQua, request.SoBienNhan);
                dinhKemKetQuas = string.Join("##", arrDinhKemKetQuas);
            }

            string setValuesUpdate = string.Empty;

            string trangThaiHienTai = hoSo.TrangThaiHoSoId;
            if (trangThaiHienTai != "10")
            {
                if (request.TrangThaiKetThuc == 0)
                {
                    setValuesUpdate = $"TrangThaiHoSoId = '9', LoaiKetQua = N'{DuThaoXuLyHoSoConstant.Loai_KetQua}', NgayKetThucXuLy = @NgayKetThucXuLy, DinhKemKetQua = @DinhKemKetQua, ";
                }
                else
                {
                    setValuesUpdate = $"TrangThaiHoSoId = '9', LoaiKetQua = N'{DuThaoXuLyHoSoConstant.Loai_TraLaiXinRut}', NgayKetThucXuLy = @NgayKetThucXuLy, DinhKemKetQua = @DinhKemKetQua, ";
                }

                // update hồ sơ
                string updateSql = $"UPDATE Business.HoSos " +
                    $"SET {setValuesUpdate} LoaiDuLieuKetNoi = 'VBDLIS' " +
                    $"WHERE Id = @Id ";
                await _dapperRespository.ExcuteAsync(updateSql, new { Id = hoSo.Id, NgayKetThucXuLy = request.NgayKetThuc.AddHours(7), DinhKemKetQua = !string.IsNullOrEmpty(dinhKemKetQuas) ? dinhKemKetQuas : null });
                var canBoChuyen = await _userService.GetByUsernameAsync(request.MaCanBoXuLy, cancellationToken);
                QuaTrinhXuLyHoSo quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, canBoChuyen.Id.ToString(), canBoChuyen.FullName, null, null,
                    request.NgayKetThuc.AddHours(7), trangThai: string.Empty, thaoTac: $"VBDLIS kết thúc hồ sơ");
                await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
            }
            AddLogVBDLISCommand addLogVBDLIS = new AddLogVBDLISCommand();
            addLogVBDLIS.maHoSo = request.SoBienNhan;
            addLogVBDLIS.api = "VBDLISDongBoTrangThaiKetThuc";
            addLogVBDLIS.body = JsonConvert.SerializeObject(request);
            await _mediator.Send(addLogVBDLIS, cancellationToken);
            result.Result = 1;
            return result;
        }
        catch (Exception ex)
        {
            AddLogVBDLISCommand addLogVBDLIS = new AddLogVBDLISCommand();
            addLogVBDLIS.maHoSo = request.SoBienNhan;
            addLogVBDLIS.api = "VBDLISDongBoTrangThaiKetThuc";
            addLogVBDLIS.body = JsonConvert.SerializeObject(request);
            addLogVBDLIS.response = JsonConvert.SerializeObject(ex);
            await _mediator.Send(addLogVBDLIS, cancellationToken);
            throw ex;
        }
    }
}
