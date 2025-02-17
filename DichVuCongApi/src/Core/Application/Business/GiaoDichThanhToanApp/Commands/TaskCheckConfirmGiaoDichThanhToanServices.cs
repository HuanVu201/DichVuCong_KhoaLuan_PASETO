using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Queries;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.DvcPayment;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Commands;
public interface ITaskGiaoDichThanhToanServices
{
    Task TaskCheckConfirmGiaoDichTTTT();

}

public class TaskGiaoDichThanhToanServices : ITaskGiaoDichThanhToanServices
{
    private readonly IMediator _mediator;
    private readonly GiaoDichThanhToanConstants _giaoDichThanhToanConstants;
    private readonly IDvcPaymentServices _dvcPaymentServices;
    private readonly IDapperRepository _dapperRepository;
    private readonly ILogger<GiaoDichThanhToan> _logger;

    public TaskGiaoDichThanhToanServices(IMediator mediator, IDvcPaymentServices dvcPaymentServices, IDapperRepository dapperRepository, ILogger<GiaoDichThanhToan> logger)
    {
        _mediator = mediator;
        _giaoDichThanhToanConstants = new GiaoDichThanhToanConstants();
        _dvcPaymentServices = dvcPaymentServices;
        _dapperRepository = dapperRepository;
        _logger = logger;
    }

    public async Task TaskCheckConfirmGiaoDichTTTT()
    {
        try
        {
            List<string> result = new List<string>();
            var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
            var tuNgay = currentTime.AddDays(-3);
            var denNgay = currentTime.AddHours(-0.5);
            var settings = _dvcPaymentServices.Get();
            SearchGiaoDichThanhToanQuery query = new SearchGiaoDichThanhToanQuery();
            query.TrangThai = _giaoDichThanhToanConstants.TRANG_THAI.KHOI_TAO;
            query.TuNgay = tuNgay;
            query.DenNgay = denNgay;
            query.AutoChecked = false;
            var giaoDichThanhToans = await _mediator.Send(query);
            if (giaoDichThanhToans == null) throw new Exception("Không tìm thấy giao dịch thanh toán");
            if (giaoDichThanhToans.Data == null) throw new Exception("Không tìm thấy giao dịch thanh toán");
            foreach (var giaoDichThanhToan in giaoDichThanhToans.Data)
            {
                try
                {
                    if (string.IsNullOrEmpty(giaoDichThanhToan.ResponseDvcPayment))
                    {
                        CheckPaymentStatusRequest reqCheck = new CheckPaymentStatusRequest();
                        reqCheck.MaThamChieu = giaoDichThanhToan.MaThamChieu;
                        reqCheck.ThoiGianGD = giaoDichThanhToan.ThoiGianGD.ToString("yyyyMMddhhmmss");
                        var resCheck = await _dvcPaymentServices.CheckPaymentStatus(reqCheck);

                        /* Trạng thái giao dịch:
                        1: Thanh toán thành công
                        3: GD Pending – Payment Platform chưa biết trạng thái cuối của GD (Lỗi hệ thống, timeout từ ngân hàng/TGTT …)
                        4: Thanh toán thất bại*/
                        if (resCheck.MaLoi == _giaoDichThanhToanConstants.MA_LOI.THANH_CONG && resCheck.TrangThaiGD == "1")
                        {
                            ConfirmDvcPaymentCommand confirmDvcPayment = new ConfirmDvcPaymentCommand();
                            confirmDvcPayment.MaThamChieu = giaoDichThanhToan.MaThamChieu;
                            confirmDvcPayment.MaLoi = _giaoDichThanhToanConstants.MA_LOI.THANH_CONG;
                            confirmDvcPayment.ThoiGianGD = resCheck.ThoiGianGD ?? string.Empty;
                            confirmDvcPayment.MaGiaoDich = resCheck.MaGiaoDich ?? string.Empty;
                            confirmDvcPayment.MaNganHang = resCheck.MaNganHang ?? string.Empty;
                            confirmDvcPayment.MaDoiTac = resCheck.MaDoiTac ?? string.Empty;
                            confirmDvcPayment.LoaiBanTin = resCheck.LoaiBanTin ?? string.Empty;
                            confirmDvcPayment.MaThamChieu = resCheck.MaThamChieu ?? string.Empty;
                            confirmDvcPayment.SoTien = resCheck.SoTien.HasValue ? resCheck.SoTien.Value : 0;
                            confirmDvcPayment.MaTienTe = resCheck.MaTienTe ?? string.Empty;
                            confirmDvcPayment.ThongTinGiaoDich = resCheck.ThongTinGiaoDich ?? string.Empty;
                            string maXacThucStr = $"{confirmDvcPayment.LoaiBanTin}|{confirmDvcPayment.MaLoi}|{confirmDvcPayment.MaDoiTac}|{confirmDvcPayment.MaThamChieu}|{confirmDvcPayment.SoTien}" +
                                $"|{confirmDvcPayment.MaTienTe}" +
                               $"|{confirmDvcPayment.MaGiaoDich}|{confirmDvcPayment.MaNganHang}|{confirmDvcPayment.ThoiGianGD}|{confirmDvcPayment.ThongTinGiaoDich}|{settings.InitPaymentSecretKey}";
                            string maXacThuc = _dvcPaymentServices.CreateMaXacThuc(maXacThucStr);
                            confirmDvcPayment.MaXacThuc = maXacThuc;
                            var resConfirm = await _mediator.Send(confirmDvcPayment);
                        }
                        else if (resCheck.MaLoi == _giaoDichThanhToanConstants.MA_LOI.THANH_CONG && resCheck.TrangThaiGD == "4")
                        {
                            string sqlUpdateGDTT = $"UPDATE [Business].[GiaoDichThanhToans] " +
                                $"SET [TrangThai] = '{_giaoDichThanhToanConstants.TRANG_THAI.THAT_BAI}' AND ResponseDvcPayment = '{JsonConvert.SerializeObject(resCheck)}', AutoCheckedTrangThaiTTTT =1, LastModifiedOn = '{currentTime}'  " +
                                $"WHERE Id = '{giaoDichThanhToan.Id}' ";
                            await _dapperRepository.ExcuteAsync(sqlUpdateGDTT);
                        }
                        else
                        {
                            string sqlUpdateGDTT = $"UPDATE [Business].[GiaoDichThanhToans] " +
                               $"SET  AutoCheckedTrangThaiTTTT =1, LastModifiedOn = '{currentTime}'  " +
                               $"WHERE Id = '{giaoDichThanhToan.Id}' ";
                            await _dapperRepository.ExcuteAsync(sqlUpdateGDTT);
                        }
                    }
                }
                catch
                {

                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogInformation("TaskCheckConfirmGiaoDichTTTT: " + ex.Message);
            throw;
        }
    }
}