using TD.DichVuCongApi.Domain.Business;
using static TD.DichVuCongApi.Application.Common.KetNoi.LLTP.LLTP_VNEIDParams;

namespace TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
public interface ILLTPService : ITransientService
{
    Task<object> SendAsync(string maHoSo, string eFormData);
    Task<object> SendAsync(LienThongLLTPRequest req);
    Task<string> GenerateMaHoSo(CancellationToken cancellationToken);
    Task<LLTP_VNEIDParams.Response> VneidSendData (LLTP_VNEIDParams.Request data, CancellationToken cancellationToken = default);
    Task<Result> GuiLienThongBoMCDT(string maHoSo, string eformData, CancellationToken cancellationToken);
    Task<int> AddTrangThaiDVCLT(string maHoSo, string trangThai, string trangThaiDongBoDVC, string loaiDuLieuKetNoi, string duLieuBTP = "", string type = TrangThaiDongBoHoSoLLTPConstant.TrangThaiDongBo_Type_KetQua, string dinhKemThuHoi = "");
    Task<Result> GuiLienThongBo(string maHoSo);
    Task<Result> ThuHoiQuyetDinh(string maHoSo, ThuHoiQuyetDinhLLTP thuHoiQuyetDinhLLTP);
    Task CapNhatTrangThaiVNeID();
    Task ScanResultLLTP();
    Task ScanResultLLTPMCDT();
    void CheckThaoTac(string loaiDuLieuKetNoi);
    string GetCodeGet();
}
