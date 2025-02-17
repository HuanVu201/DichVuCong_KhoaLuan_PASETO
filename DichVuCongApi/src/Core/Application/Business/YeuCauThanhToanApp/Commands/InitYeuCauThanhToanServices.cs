using Mapster;
using TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Commands;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
public partial class YeuCauThanhToanServices : IYeuCauThanhToanServices
{


    public async Task<InitDvcYeuCauThanhToanResponse> InitDvcPayment(InitDvcYeuCauThanhToanRequest request)
    {
        try
        {
            if (request.Id == null) throw new ArgumentNullException(nameof(request.Id));
            var dvcPaymentSettings = await this.Get(request.Id);
            if (dvcPaymentSettings.SoTien <= 0) throw new Exception("Không thể thanh toán trực tuyến số tiền bằng không");
            dvcPaymentSettings.NguoiNopTienBienLai = request.NguoiNopTienBienLai ?? dvcPaymentSettings.NguoiNopTienBienLai;
            dvcPaymentSettings.DiaChiBienLai = request.DiaChiBienLai ?? dvcPaymentSettings.DiaChiBienLai;
            dvcPaymentSettings.MaSoThueBienLai = request.MaSoThueBienLai ?? dvcPaymentSettings.MaSoThueBienLai;
            dvcPaymentSettings.SoGiayToChuHoSo = request.SoGiayToNguoiNopTienBienLai ?? dvcPaymentSettings.SoGiayToChuHoSo;
            //dvcPaymentSettings.EmailNguoiNopTienBienLai = request.EmailNguoiNopTienBienLai ?? dvcPaymentSettings.EmailNguoiNopTienBienLai;
            var resDvc = await _dvcPaymentServices.InitPayment(dvcPaymentSettings);
            AddGiaoDichThanhToanRequest addGiaoDichThanhToanRequest = resDvc.Adapt<AddGiaoDichThanhToanRequest>();
            //addGiaoDichThanhToanRequest.Ủ = resDvc.UrlThanhToan;
            addGiaoDichThanhToanRequest.NguoiNopTienBienLai = request.NguoiNopTienBienLai;
            addGiaoDichThanhToanRequest.DiaChiBienLai = request.DiaChiBienLai;
            addGiaoDichThanhToanRequest.MaSoThueBienLai = request.MaSoThueBienLai;
            addGiaoDichThanhToanRequest.TenNganHangHoanPhi = request.TenNganHangHoanPhi;
            addGiaoDichThanhToanRequest.TenTaiKhoanHoanPhi = request.TenTaiKhoanHoanPhi;
            addGiaoDichThanhToanRequest.SoTaiKhoanHoanPhi = request.SoTaiKhoanHoanPhi;
            addGiaoDichThanhToanRequest.SoGiayToNguoiNopTienBienLai = request.SoGiayToNguoiNopTienBienLai ?? dvcPaymentSettings.SoGiayToChuHoSo;
            addGiaoDichThanhToanRequest.EmailNguoiNopTienBienLai = request.EmailNguoiNopTienBienLai;
            addGiaoDichThanhToanRequest.YeuCauThanhToan = dvcPaymentSettings.Ma;
            var resGiaoDichThanhToan = await _giaoDichThanhToanServices.Create(addGiaoDichThanhToanRequest);
            if (resGiaoDichThanhToan == null) throw new Exception("Lỗi tạo GiaoDichThanhToan");
            InitDvcYeuCauThanhToanResponse result = new InitDvcYeuCauThanhToanResponse();
            result.MaGiaoDichThanhToan = resGiaoDichThanhToan.Id;
            result.DuongDanThanhToan = resDvc.UrlThanhToan;
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError("InitDvcPayment", ex.InnerException.Message);
            throw ex;
        }

    }
}
