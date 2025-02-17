using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.VBDLIS;
using TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
using TD.DichVuCongApi.Application.Business.VBDLIS.ReceiverFromVBDLIS;
using TD.DichVuCongApi.Application.Business.VBDLIS.Services;

namespace TD.DichVuCongApi.Application.Business.ILISApp;
public interface IILisServices : ITransientService
{
    ILISSettings Get();
    Task<GuiVBDLISBaseResponse> TiepNhanHoSo(VBDLISTiepNhanHoSoRequest req);
    Task<GuiVBDLISBaseResponse> CapNhatTrangThaiBoSungHoSo(VBDLISCapNhatTrangThaiBoSungHoSoRequest req);
    Task<GuiVBDLISBaseResponse> CapNhatKetQuaTraHoSo(VBDLISCapNhatKetQuaTraHoSoRequest req);
    Task<GuiVBDLISBaseResponse> PhanHoiHoSoSaiKetQua(VBDLISPhanHoiHoSoSaiKetQuaRequest req);
    Task<List<string>> DownloadFile(List<VBDLISThongTinTapTinDinhKem> req, string folderName);
}
