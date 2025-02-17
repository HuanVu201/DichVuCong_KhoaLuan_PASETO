using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
using TD.DichVuCongApi.Application.Common.DvcPayment;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Commands;
public class CheckConfirmGiaoDichThanhToanHandler : ICommandHandler<CheckConfirmGiaoDichThanhToan, ConfirmDvcPaymentResponse>
{

    private readonly IDvcPaymentServices _dvcPaymentServices;
    private readonly ILogger<ConfirmDvcPaymentResponse> _logger;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<GiaoDichThanhToan> _repositoryWithEvents;
    private readonly GiaoDichThanhToanConstants _giaoDichThanhToanConstants;
    private readonly IMediator _mediator;
    public CheckConfirmGiaoDichThanhToanHandler(IDvcPaymentServices dvcPaymentServices, ILogger<ConfirmDvcPaymentResponse> logger, IDapperRepository dapperRepository,
        IRepositoryWithEvents<GiaoDichThanhToan> repositoryWithEvents, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _logger = logger;
        _repositoryWithEvents = repositoryWithEvents;
        _dvcPaymentServices = dvcPaymentServices;
        _giaoDichThanhToanConstants = new GiaoDichThanhToanConstants();
        _mediator = mediator;
    }
    public async Task<Result<ConfirmDvcPaymentResponse>> Handle(CheckConfirmGiaoDichThanhToan request, CancellationToken cancellationToken)
    {
        if (request == null) throw new ArgumentNullException(nameof(request));
        var _settings = _dvcPaymentServices.Get();
        if (_settings == null) throw new Exception("Không có cấu hình dvcpayment");
        var giaoDichThanhToan = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (giaoDichThanhToan == null) throw new NotFoundException($"Giao dịch thanh toán có mã: {request.Id} chưa được thêm vào hệ thống");

        if (!string.IsNullOrEmpty(giaoDichThanhToan.ResponseDvcPayment))
        {
            var responseDvcPayment = JsonConvert.DeserializeObject<ConfirmDvcPaymentResponse>(giaoDichThanhToan.ResponseDvcPayment);
            if (responseDvcPayment != null && responseDvcPayment.MaLoi == _giaoDichThanhToanConstants.MA_LOI.THANH_CONG)
            {
                throw new Exception("Giao dịch thanh toán đã được xác nhận thanh toán thành công");
            }
        }
        CheckPaymentStatusRequest reqCheck = new CheckPaymentStatusRequest();
        reqCheck.MaThamChieu = giaoDichThanhToan.MaThamChieu;
        reqCheck.ThoiGianGD = giaoDichThanhToan.ThoiGianGD.ToString("yyyyMMddhhmmss");
        var resCheck = await _dvcPaymentServices.CheckPaymentStatus(reqCheck);
        if (resCheck == null) throw new NotFoundException("Không có dữ liệu giao dịch trên dvcqg");
        /* Trạng thái giao dịch:
        1: Thanh toán thành công
        3: GD Pending – Payment Platform chưa biết trạng thái cuối của GD (Lỗi hệ thống, timeout từ ngân hàng/TGTT …)
        4: Thanh toán thất bại*/
        if (resCheck.MaLoi == _giaoDichThanhToanConstants.MA_LOI.THANH_CONG && resCheck.TrangThaiGD == "1")
        {
            ConfirmDvcPaymentCommand confirmDvcPayment = new ConfirmDvcPaymentCommand();
            confirmDvcPayment.MaThamChieu = giaoDichThanhToan.MaThamChieu;
            confirmDvcPayment.MaLoi = _giaoDichThanhToanConstants.MA_LOI.THANH_CONG;
            confirmDvcPayment.ThoiGianGD = resCheck.ThoiGianGD;
            confirmDvcPayment.MaGiaoDich = resCheck.MaGiaoDich;
            confirmDvcPayment.MaNganHang = resCheck.MaNganHang;
            confirmDvcPayment.MaDoiTac = resCheck.MaDoiTac;
            confirmDvcPayment.LoaiBanTin = resCheck.LoaiBanTin;
            confirmDvcPayment.MaThamChieu = resCheck.MaThamChieu;
            confirmDvcPayment.SoTien = resCheck.SoTien.HasValue ? resCheck.SoTien.Value : 0;
            confirmDvcPayment.MaTienTe = resCheck.MaTienTe;
            confirmDvcPayment.ThongTinGiaoDich = resCheck.ThongTinGiaoDich;
            var maXacThucStr = $"{confirmDvcPayment.LoaiBanTin}|{confirmDvcPayment.MaLoi}|{confirmDvcPayment.MaDoiTac}|{confirmDvcPayment.MaThamChieu}|{confirmDvcPayment.SoTien}" +
                $"|{confirmDvcPayment.MaTienTe}" +
               $"|{confirmDvcPayment.MaGiaoDich}|{confirmDvcPayment.MaNganHang}|{confirmDvcPayment.ThoiGianGD}|{confirmDvcPayment.ThongTinGiaoDich}|{_settings.InitPaymentSecretKey}";
            var maXacThuc = _dvcPaymentServices.CreateMaXacThuc(maXacThucStr);
            confirmDvcPayment.MaXacThuc = maXacThuc;
            var resConfirm = await _mediator.Send(confirmDvcPayment, cancellationToken);
        }
        else if (resCheck.MaLoi == _giaoDichThanhToanConstants.MA_LOI.THANH_CONG && resCheck.TrangThaiGD == "4")
        {
            var updateGdtt = giaoDichThanhToan.CheckTTTT(_giaoDichThanhToanConstants.TRANG_THAI.THAT_BAI, JsonConvert.SerializeObject(resCheck));
            await _repositoryWithEvents.UpdateAsync(updateGdtt, cancellationToken);
        }
        return Result<ConfirmDvcPaymentResponse>.Success(resCheck);

    }
}
