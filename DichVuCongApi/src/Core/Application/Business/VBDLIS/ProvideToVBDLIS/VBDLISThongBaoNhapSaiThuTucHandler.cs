using Newtonsoft.Json;
using System.Text.Json;
using TD.DichVuCongApi.Application.Business.LogVBDLISApp.Commands;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
public class VBDLISThongBaoNhapSaiThuTucHandler : IRequestHandler<VBDLISThongBaoNhapSaiThuTucRequest, ProvideToVBLISBaseResponse>
{
    private readonly IMediator _meidator;
    private readonly IVBDLISServices _vBDLISServices;
    public VBDLISThongBaoNhapSaiThuTucHandler(IMediator meidator, IVBDLISServices vBDLISServices)
    {
        _meidator = meidator;
        _vBDLISServices = vBDLISServices;
    }

    public async Task<ProvideToVBLISBaseResponse> Handle(VBDLISThongBaoNhapSaiThuTucRequest request, CancellationToken cancellationToken)
    {
        ProvideToVBLISBaseResponse result = new ProvideToVBLISBaseResponse(1, string.Empty);
        VBDLISSettings settings = _vBDLISServices.Get();
        if (request.SecurityCode != settings.SecurityCode) throw new Exception("Mã bảo mật không chính xác");
        if (string.IsNullOrEmpty(request.SoBienNhan)) throw new Exception("Không có số biên nhận");
        AddLogVBDLISCommand addLogVBDLIS = new AddLogVBDLISCommand();
        addLogVBDLIS.maHoSo = request.SoBienNhan;
        addLogVBDLIS.api = "VBDLISThongBaoNhapSaiThuTuc";
        addLogVBDLIS.body = JsonConvert.SerializeObject(request);
        await _meidator.Send(addLogVBDLIS, cancellationToken);
        return result;
    }
}
