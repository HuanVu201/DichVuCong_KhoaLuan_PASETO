using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.VBDLIS.ProvideToVBDLIS;
using TD.DichVuCongApi.Application.Business.VBDLIS.ReceiverFromVBDLIS;
using TD.DichVuCongApi.Application.Business.VBDLIS.Services;
using TD.DichVuCongApi.Application.Common.Minio;

namespace TD.DichVuCongApi.Application.Business.VBDLIS;
public interface IVBDLISServices : ITransientService
{
    VBDLISSettings Get();
    Task<GuiVBDLISBaseResponse> TiepNhanHoSo(VBDLISTiepNhanHoSoRequest req);
    Task<GuiVBDLISBaseResponse> CapNhatTrangThaiBoSungHoSo(VBDLISCapNhatTrangThaiBoSungHoSoRequest req);
    Task<GuiVBDLISBaseResponse> CapNhatKetQuaTraHoSo(VBDLISCapNhatKetQuaTraHoSoRequest req);
    Task<GuiVBDLISBaseResponse> PhanHoiHoSoSaiKetQua(VBDLISPhanHoiHoSoSaiKetQuaRequest req);
    Task<List<string>> DownloadFile(List<VBDLISThongTinTapTinDinhKem> req, string folderName);
}
