using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.LogVBDLISApp.Commands;
using TD.DichVuCongApi.Application.Business.VBDLIS.ReceiverFromVBDLIS;
using TD.DichVuCongApi.Application.Business.VBDLIS.Services;
using TD.DichVuCongApi.Application.Common.Minio;
using TD.DichVuCongApi.Application.Identity.Users;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.PhanHoiHoSoSaiKetQuaGuiVBDLIS;
public class PhanHoiHoSoSaiKetQuaGuiVBDLISHandler : IRequestHandler<PhanHoiHoSoSaiKetQuaGuiVBDLISRequest, Result>
{
    private readonly IDapperRepository _dapperRespository;
    private readonly IUserService _user;
    private readonly IVBDLISServices _vBDLISServices;
    private readonly IMediator _meidator;
    private readonly IMinioService _minioService;
    public PhanHoiHoSoSaiKetQuaGuiVBDLISHandler(IDapperRepository dapperRepository, IUserService user, IVBDLISServices vBDLISServices, IMediator meidator, IMinioService minioService)
    {
        _dapperRespository = dapperRepository;
        _user = user;
        _vBDLISServices = vBDLISServices;
        _meidator = meidator;
        _minioService = minioService;
    }

    public async Task<Result> Handle(PhanHoiHoSoSaiKetQuaGuiVBDLISRequest request, CancellationToken cancellationToken)
    {
        List<VBDLISThongTinGiayToDinhKem> danhSachDinhKems = new List<VBDLISThongTinGiayToDinhKem>();
        int iGiayTo = 0;
        if (!string.IsNullOrEmpty(request.DanhSachGiayToDinhKem))
        {

            string[] arrFileDinhKem = request.DanhSachGiayToDinhKem.Split(new string[] { "##" }, StringSplitOptions.None);
            foreach (string linkFileDinhKem in arrFileDinhKem)
            {
                if (!string.IsNullOrEmpty(linkFileDinhKem))
                {
                    VBDLISThongTinGiayToDinhKem giayto = new VBDLISThongTinGiayToDinhKem();
                    giayto.TenGiayTo = "Giấy tờ " + iGiayTo.ToString();
                    giayto.SoBanChinh = 1;
                    Base64DataFile dinhKem = await _minioService.GetFileByKeyAsBase64Async(null, linkFileDinhKem);
                    giayto.TapTin = new VBDLISThongTinTapTin(dinhKem.Name, dinhKem.Base64);
                    danhSachDinhKems.Add(giayto);
                }
            }
        }

        VBDLISPhanHoiHoSoSaiKetQuaRequest vBDLISPhanHoiHoSoSaiKetQua = new VBDLISPhanHoiHoSoSaiKetQuaRequest(request.MaHoSo, request.NoiDung, danhSachDinhKems);
        var responsePhanHoiHoSoSaiKetQua = await _vBDLISServices.PhanHoiHoSoSaiKetQua(vBDLISPhanHoiHoSoSaiKetQua);
        AddLogVBDLISCommand addLogVBDLIS = new AddLogVBDLISCommand();
        addLogVBDLIS.maHoSo = request.MaHoSo;
        addLogVBDLIS.api = "PhanHoiHoSoSaiKetQuaHoSoGuiVBDLIS";
        addLogVBDLIS.body = JsonConvert.SerializeObject(request);
        addLogVBDLIS.response = JsonConvert.SerializeObject(responsePhanHoiHoSoSaiKetQua);
        await _meidator.Send(addLogVBDLIS, cancellationToken);
        if (responsePhanHoiHoSoSaiKetQua.data == 1)
        {
            if (responsePhanHoiHoSoSaiKetQua.status.success == false)
                return (Result)Result.Fail("Lỗi gửi hồ sơ: " + responsePhanHoiHoSoSaiKetQua.status.message);
        }
        else
        {
            return (Result)Result.Fail("Lỗi gửi hồ sơ: " + responsePhanHoiHoSoSaiKetQua.status.message);
        }

        return (Result)Result.Success(responsePhanHoiHoSoSaiKetQua.status.message);
    }
}
