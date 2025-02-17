using static TD.DichVuCongApi.Application.Common.KetNoi.DVC.KhoSoHoaDVCQG.KhoSoHoaDVCQGParams;

namespace TD.DichVuCongApi.Application.Common.KetNoi.DVC.KhoSoHoaDVCQG;
public interface IKhoSoHoaDVCQGService: ITransientService
{
    Task<Result<List<KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua>>> GetDanhSachKetQuaCongDan(KhoSoHoaDVCQGParams.GetDanhSachKetQuaCongDanRequest req);
    Task<Result<List<KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua>>> GetDanhSachKetQuaCanBo(KhoSoHoaDVCQGParams.GetDanhSachKetQuaCanBoRequest req);
    Task<Result<List<string>>> GetKetQuaByUrl(KhoSoHoaDVCQGParams.GetKetQuaByURLRequest req);
    Task<Result<List<KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua>>> GetDanhSachKetQuaCongDanWithoutDanhMucKQ(KhoSoHoaDVCQGParams.GetDanhSachKetQuaCongDanWithoutDanhMucRequest req);
    Task<Result<List<KhoSoHoaDVCQGParams.GetDanhSachKetQuaResponse_Result_DanhSachGiayToKetQua>>> GetDanhSachKetQuaCanBoWithoutDanhMucKQ(KhoSoHoaDVCQGParams.GetDanhSachKetQuaCanBoWithoutDanhMucRequest req);
    Task<Result<List<UploadResult>>> GetListKetQuaByUrl(GetListKetQuaByUrlRequest req);
}
