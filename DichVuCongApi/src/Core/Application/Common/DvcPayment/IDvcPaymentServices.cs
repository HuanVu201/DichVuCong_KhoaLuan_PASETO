using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;

namespace TD.DichVuCongApi.Application.Common.DvcPayment;
public interface IDvcPaymentServices : ITransientService
{
    DvcPaymentSettings Get();
    Task<InitDvcPaymentResponse> InitPayment(YeuCauThanhToanDetailDto yeuCauThanhToanDetail);
    Task<BienLaiDvcPaymentResponse> GetBienLaiDvcPayment(string maThamChieu, DateTime thoiGianGD, string? existUrl = null);
    Task<ConfirmDvcPaymentResponse> CheckPaymentStatus(CheckPaymentStatusRequest req);
    string CreateMaXacThuc(string rawData);
}
