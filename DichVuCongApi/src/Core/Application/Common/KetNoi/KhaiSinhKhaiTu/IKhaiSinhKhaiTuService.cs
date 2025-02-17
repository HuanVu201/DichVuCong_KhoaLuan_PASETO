using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Common.KetNoi.KhaiSinhKhaiTu;
public interface IKhaiSinhKhaiTuService : ITransientService
{
    Task GetDataAsync();
    Task<Result<PushBTPResonse>> PushToBTP(string maHoSo);
    Task<Result<PushBTPResonse>> PushToBTPDangKyKetHon(LienThongBTPDangKyKetHonRequest req, CancellationToken cancellationToken = default);
    Task ScanResultLTKS();
    Task ScanResultLTKH();
    Task ScanResultLTKT();
    Task CapNhatTrangThaiDVCLT();
    Task<int> AddTrangThaiDVCLT(string maHoSo, string trangThai, string trangThaiDongBoDVC, string loaiDuLieuKetNoi, string duLieuBTP = "");
    DateTime TinhNgayHenTra(DateTime thoiGianTao, List<NgayNghi> ngayNghiList, double? boQuaSoNgayLamViecTiep = null);
    Task<Result<List<KhaiSinhKhaiTu_PushManualResponse>>> ScanManual(IReadOnlyList<string> maHoSos);
    Task<Result<string>> FakeTuChoiBTP(string maHoSo);
    void CheckThaoTac(string loaiDuLieuKetNoi);
}
