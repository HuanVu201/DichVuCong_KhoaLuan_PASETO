using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.ILISApp;
using TD.DichVuCongApi.Application.Business.LogVBDLISApp.Commands;
using TD.DichVuCongApi.Application.Business.VBDLIS.Services;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.CapNhatKetQuaTraHoSoGuiVBDLIS;
public class CapNhatKetQuaTraHoSoGuiVBDLISHandler : IRequestHandler<CapNhatKetQuaTraHoSoGuiVBDLISRequest, Result>
{
    private readonly IDapperRepository _dapperRespository;
    private readonly IUserService _user;
    private readonly IVBDLISServices _vBDLISServices;
    private readonly IMediator _meidator;
    private readonly IILisServices _iLisServices;
    public CapNhatKetQuaTraHoSoGuiVBDLISHandler(IDapperRepository dapperRepository, IUserService user, IVBDLISServices vBDLISServices, IMediator meidator, IILisServices iLisServices)
    {
        _dapperRespository = dapperRepository;
        _user = user;
        _vBDLISServices = vBDLISServices;
        _meidator = meidator;
        _iLisServices = iLisServices;
    }

    public async Task<Result> Handle(CapNhatKetQuaTraHoSoGuiVBDLISRequest request, CancellationToken cancellationToken)
    {
        //var currentUser = await _user.GetCurrentUserAsync(cancellationToken);
        //DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
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

        VBDLISCapNhatKetQuaTraHoSoRequest capNhatKetQuaTraHoSoRequest = new VBDLISCapNhatKetQuaTraHoSoRequest(request.MaHoSo, request.NgayTra);
        var resCapNhatKetQuaTraHoSo = !string.IsNullOrEmpty(hoSo.LienThongTNMT) && hoSo.LienThongTNMT.ToLower() == "ilis"
            ? await _iLisServices.CapNhatKetQuaTraHoSo(capNhatKetQuaTraHoSoRequest) : await _vBDLISServices.CapNhatKetQuaTraHoSo(capNhatKetQuaTraHoSoRequest);
        string responseText = JsonConvert.SerializeObject(resCapNhatKetQuaTraHoSo);
        AddLogVBDLISCommand addLogVBDLIS = new AddLogVBDLISCommand();
        addLogVBDLIS.maHoSo = request.MaHoSo;
        addLogVBDLIS.api = "CapNhatKetQuaTraHoSoGuiVBDLIS";
        addLogVBDLIS.body = JsonConvert.SerializeObject(request);
        addLogVBDLIS.response = JsonConvert.SerializeObject(resCapNhatKetQuaTraHoSo);
        await _meidator.Send(addLogVBDLIS, cancellationToken);
        if (resCapNhatKetQuaTraHoSo.data == 1)
        {
            if (resCapNhatKetQuaTraHoSo.status.success == false)
            {
                return (Result)Result.Fail("Lỗi gửi hồ sơ: " + resCapNhatKetQuaTraHoSo.status.message);
            }
        }
        else if (responseText.ToLower().Contains("không tìm thấy") || responseText.ToLower().Contains("đã được trả") || responseText.ToLower().Contains("không tồn tại"))
        {

        }
        else
        {
            return (Result)Result.Fail("Lỗi gửi hồ sơ: " + resCapNhatKetQuaTraHoSo.status.message);
        }

        return (Result)Result.Success(resCapNhatKetQuaTraHoSo.status.message);

    }
}
