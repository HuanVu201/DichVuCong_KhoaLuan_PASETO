namespace TD.DichVuCongApi.Application.Common.BienLaiViettel;
public interface IBienLaiViettelServices : ITransientService
{
    ViettelInvoiceSettings Get();
    Task<GetTokenViettelInvoiceResponse> GetToken(CauHinhBienLaiViettel req);
    Task<KetQuaPhatHanhBienLai> PhatHanhBienLai(XuatBienLaiViettelRequest req, string cauHinhBienLaiDienTu, string maSoThue);
    Task<GetBienLaiViettelResponse> GetBienLai(GetBienLaiViettelRequest req, string cauHinhBienLaiDienTu);
    Task<CancelBienLaiVietelResponse> CancelBienLaiVietel(CancelBienLaiViettelRequest req, string cauHinhBienLaiDienTu);
}
