using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.LogVBDLISApp.Commands;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
public class VBDLISDongBoTrangThaiDaBoSungHandler : IRequestHandler<VBDLISDongBoTrangThaiDaBoSungRequest, ProvideToVBLISBaseResponse>
{
    private readonly IDapperRepository _dapperRespository;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IMediator _mediator;
    private readonly IVBDLISServices _vBDLISServices;
    public VBDLISDongBoTrangThaiDaBoSungHandler(IDapperRepository dapperRespository, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IMediator mediator, IVBDLISServices vBDLISServices)
    {
        _dapperRespository = dapperRespository;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _mediator = mediator;
        _vBDLISServices = vBDLISServices;
    }

    public async Task<ProvideToVBLISBaseResponse> Handle(VBDLISDongBoTrangThaiDaBoSungRequest request, CancellationToken cancellationToken)
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
        if (trangThaiHienTai != "10")
        {
            setValuesUpdate = $"TrangThaiHoSoId = '4', ";
        }

        // update hồ sơ
        string updateSql = $"UPDATE Business.HoSos " +
            $"SET {setValuesUpdate} LoaiDuLieuKetNoi = 'VBDLIS' " +
            $"WHERE Id = @Id ";
        await _dapperRespository.ExcuteAsync(updateSql, new { Id = hoSo.Id });

        QuaTrinhXuLyHoSo quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(hoSo.MaHoSo, null, null, null, null, null, null, null, "Hệ thống VBDLIS",
            request.NgayNhanBoSung.AddHours(7), trangThai: string.Empty, thaoTac: $"VBDLIS nhận bổ sung hồ sơ. Ngày hẹn trả mới: {request.NgayHenTraMoi.AddHours(7).ToString("dd/MM/yyyy")}");
        await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
        result.Result = 1;
        return result;
    }
}
