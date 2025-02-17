using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.HoSoApp.Common;
using TD.DichVuCongApi.Application.Business.ILISApp;
using TD.DichVuCongApi.Application.Business.LogVBDLISApp.Commands;
using TD.DichVuCongApi.Application.Business.NguoiXuLyHoSoApp.Interfaces;
using TD.DichVuCongApi.Application.Business.VBDLIS.Services;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.CapNhatTrangThaiBoSungHoSo;
public class CapNhatTrangThaiBoSungHoSoGuiVBDLISHandler : IRequestHandler<CapNhatTrangThaiBoSungHoSoGuiVBDLISRequest, Result>
{
    private readonly IDapperRepository _dapperRespository;
    private readonly IUserService _user;
    private readonly IVBDLISServices _vBDLISServices;
    private readonly IMediator _meidator;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IReadRepository<NgayNghi> _ngayNghiRepository;
    private readonly IInjectConfiguration _injectConfiguration;
    private readonly INguoiXuLyHoSoService _nguoiXuLyHoSoService;
    private readonly IILisServices _iLisServices;
    public CapNhatTrangThaiBoSungHoSoGuiVBDLISHandler(INguoiXuLyHoSoService nguoiXuLyHoSoService, IDapperRepository dapperRepository, IUserService user, IVBDLISServices vBDLISServices, IMediator meidator,
        IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IReadRepository<NgayNghi> ngayNghiRepository, IInjectConfiguration injectConfiguration, IILisServices iLisServices)
    {
        _dapperRespository = dapperRepository;
        _user = user;
        _vBDLISServices = vBDLISServices;
        _meidator = meidator;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _ngayNghiRepository = ngayNghiRepository;
        _injectConfiguration = injectConfiguration;
        _nguoiXuLyHoSoService = nguoiXuLyHoSoService;
        _iLisServices = iLisServices;
    }

    public async Task<Result> Handle(CapNhatTrangThaiBoSungHoSoGuiVBDLISRequest request, CancellationToken cancellationToken)
    {
        var currentUser = await _user.GetCurrentUserAsync(cancellationToken);
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
                  hs.MaHoSo = @MaHoSo";
        var hoSo = await _dapperRespository.QueryFirstOrDefaultAsync<HoSoQLVB>(sql, new
        {
            request.MaHoSo
        });

        if (hoSo == null)
        {
            throw new NotFoundException($"HoSo với mã: {request.MaHoSo} chưa được thêm vào hệ thống");
        }
        if (!request.NgayHenTraMoi.HasValue)
        {
            var caculateTime = new CaculateTime(_injectConfiguration);
            var ngayNghis = await _ngayNghiRepository.ListAsync(new GetNgayNghiSpec(DateTime.Now.Year));
            var ngayHenTra = caculateTime.GetNgayHenTraBoSung(hoSo.NgayHenTra, (DateTime)hoSo.NgayYeuCauBoSung, ngayNghis, currentTime);
            request.NgayHenTraMoi = ngayHenTra;
        }
        VBDLISCapNhatTrangThaiBoSungHoSoRequest vBDLISCapNhatTrangThaiBoSungHo = new VBDLISCapNhatTrangThaiBoSungHoSoRequest(request.MaHoSo, request.NgayHenTraMoi.Value, null);
        var responseCapNhatTrangThaiBoSung = !string.IsNullOrEmpty(hoSo.LienThongTNMT) && hoSo.LienThongTNMT.ToLower() == "ilis"
            ? await _iLisServices.CapNhatTrangThaiBoSungHoSo(vBDLISCapNhatTrangThaiBoSungHo) : await _vBDLISServices.CapNhatTrangThaiBoSungHoSo(vBDLISCapNhatTrangThaiBoSungHo);
        AddLogVBDLISCommand addLogVBDLIS = new AddLogVBDLISCommand();
        addLogVBDLIS.maHoSo = request.MaHoSo;
        addLogVBDLIS.api = "CapNhatTrangThaiBoSungHoSoGuiVBDLIS2";
        addLogVBDLIS.body = JsonConvert.SerializeObject(request);
        addLogVBDLIS.response = JsonConvert.SerializeObject(responseCapNhatTrangThaiBoSung);
        await _meidator.Send(addLogVBDLIS, cancellationToken);
        if (responseCapNhatTrangThaiBoSung.data == 1 || (responseCapNhatTrangThaiBoSung.data == 0 && responseCapNhatTrangThaiBoSung.status.message == "Hồ sơ không chờ bổ sung"))
        {
            if (responseCapNhatTrangThaiBoSung.status.success == false && responseCapNhatTrangThaiBoSung.status.message != "Hồ sơ không chờ bổ sung")
            {
                return (Result)Result.Fail("Lỗi gửi hồ sơ: " + responseCapNhatTrangThaiBoSung.status.message);
            }

            // update hồ sơ
            string nguoiDaXuLy = !string.IsNullOrEmpty(hoSo.NguoiDaXuLy) ? hoSo.NguoiDaXuLy + "##" + currentUser.Id.ToString() : currentUser.Id.ToString();
            nguoiDaXuLy = HoSo.RemoveDuplicateIds(nguoiDaXuLy);
            string updateSql = $"UPDATE Business.HoSos " +
                $"SET TrangThaiHoSoId = '4', LoaiDuLieuKetNoi = 'VBDLIS', NguoiDangXuLy = null, NguoiDaXuLy = @NguoiDaXuLy, NgayHenTra = @NgayHenTraMoi " +
                $"WHERE Id = @Id ";
            await _dapperRespository.ExcuteAsync(updateSql, new { Id = hoSo.Id, NguoiDaXuLy = nguoiDaXuLy, NgayHenTraMoi = request.NgayHenTraMoi });
            await _nguoiXuLyHoSoService.SetNguoiDangXuLyAsNguoiDaXuLy(hoSo.Id);
            QuaTrinhXuLyHoSo quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, currentUser.Id.ToString(), currentUser.FullName, string.Empty, "Hệ thống VBDLIS", currentTime, trangThai: string.Empty, thaoTac: "Chuyển tiếp liên thông VBDLIS");
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
            return (Result)Result.Success(responseCapNhatTrangThaiBoSung.status.message);
        }

        return (Result)Result.Fail("Lỗi gửi hồ sơ: " + responseCapNhatTrangThaiBoSung.status.message);
    }
}
