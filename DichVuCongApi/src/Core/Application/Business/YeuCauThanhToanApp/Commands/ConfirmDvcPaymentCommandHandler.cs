using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp;
using TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Commands;
using TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Queries;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.DvcPayment;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public class ConfirmDvcPaymentCommandHandler : IRequestHandler<ConfirmDvcPaymentCommand, ConfirmDvcPaymentResponse>
{
    private readonly IEventPublisher _eventPublisher;
    private IMediator _mediator;
    private YeuCauThanhToanConstants _yeuCauThanhToanContants;
    private readonly GiaoDichThanhToanConstants _giaoDichThanhToanConstants;
    private readonly ILogger<ConfirmDvcPaymentCommand> _logger;
    private readonly IUserService _user;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IDvcPaymentServices _dvcPaymentServices;
    public ConfirmDvcPaymentCommandHandler(IEventPublisher eventPublisher, IMediator mediator, ILogger<ConfirmDvcPaymentCommand> logger, IUserService user
        , IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IDvcPaymentServices dvcPaymentServices)
    {
        _mediator = mediator;
        _yeuCauThanhToanContants = new YeuCauThanhToanConstants();
        _giaoDichThanhToanConstants = new GiaoDichThanhToanConstants();
        _eventPublisher = eventPublisher;
        _logger = logger;
        _user = user;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _dvcPaymentServices = dvcPaymentServices;
    }
    public async Task<ConfirmDvcPaymentResponse> Handle(ConfirmDvcPaymentCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var _settings = _dvcPaymentServices.Get();
            if (_settings == null) throw new Exception("Không có cấu hình dvcpayment");
            ConfirmDvcPaymentResponse result = new ConfirmDvcPaymentResponse();
            var maXacThucStr = $"{request.LoaiBanTin}|{request.MaLoi}|{request.MaDoiTac}|{request.MaThamChieu}|{request.SoTien}|{request.MaTienTe}" +
                $"|{request.MaGiaoDich}|{request.MaNganHang}|{request.ThoiGianGD}|{request.ThongTinGiaoDich}|{_settings.InitPaymentSecretKey}";
            var maXacThuc = _dvcPaymentServices.CreateMaXacThuc(maXacThucStr);
            if (maXacThuc != request.MaXacThuc) throw new Exception("Mã xác thực không chính xác");
            DateTime now = DateTime.Now;
            var currentTime = GetCurrentTime.Get(DateTime.UtcNow);

            // Update giaodichthanhtoan
            var giaoDichThanhToan = await _mediator.Send(new GetByMaThamChieuQuery(request.MaThamChieu));
            var yeuCauThanhToan = await _mediator.Send(new GetYeuCauThanhToanByMaQuery(giaoDichThanhToan.Data.YeuCauThanhToan));
            UpdateGiaoDichThanhToanCommand giaoDichThanhToanCommand = new UpdateGiaoDichThanhToanCommand();
            UpdateYeuCauThanhToanCommand updateYeuCauThanhToan = new UpdateYeuCauThanhToanCommand();
            giaoDichThanhToanCommand.ResponseDvcPayment = JsonConvert.SerializeObject(request);

            giaoDichThanhToanCommand.Id = giaoDichThanhToan.Data.Id;

            updateYeuCauThanhToan.Id = yeuCauThanhToan.Data.Id;
            if (request.MaLoi == _yeuCauThanhToanContants.MA_LOI.THANH_CONG)
            {
                // giaodichthanhtoan
                giaoDichThanhToanCommand.TrangThai = _giaoDichThanhToanConstants.TRANG_THAI.THANH_CONG;
                giaoDichThanhToanCommand.ThoiGianGDThanhCong = now;
                giaoDichThanhToanCommand.AutoCheckedTrangThaiTTTT = request.AutoCheck != null ? request.AutoCheck : false;
                if (yeuCauThanhToan.Data.TrangThai == _yeuCauThanhToanContants.TRANG_THAI.CHO_THANH_TOAN)
                {
                    // yeucauthanhtoan
                    updateYeuCauThanhToan.TrangThai = _yeuCauThanhToanContants.TRANG_THAI.DA_THANH_TOAN;
                    updateYeuCauThanhToan.NgayThuPhi = now;
                    updateYeuCauThanhToan.NguoiNopTienBienLai = giaoDichThanhToan.Data.NguoiNopTienBienLai;
                    updateYeuCauThanhToan.DiaChiBienLai = giaoDichThanhToan.Data.DiaChiBienLai;
                    updateYeuCauThanhToan.MaSoThueBienLai = giaoDichThanhToan.Data.MaSoThueBienLai;
                    updateYeuCauThanhToan.TenTaiKhoanHoanPhi = giaoDichThanhToan.Data.TenTaiKhoanHoanPhi;
                    updateYeuCauThanhToan.TenNganHangHoanPhi = giaoDichThanhToan.Data.TenNganHangHoanPhi;
                    updateYeuCauThanhToan.SoTaiKhoanHoanPhi = giaoDichThanhToan.Data.SoTaiKhoanHoanPhi;
                    updateYeuCauThanhToan.HinhThucThanhToan = _yeuCauThanhToanContants.HINH_THUC_THANH_TOAN.TRUC_TUYEN;
                    updateYeuCauThanhToan.SoGiayToNguoiNopTienBienLai = giaoDichThanhToan.Data.SoGiayToNguoiNopTienBienLai;
                    updateYeuCauThanhToan.EmailNguoiNopTienBienLai = giaoDichThanhToan.Data.EmailNguoiNopTienBienLai;
                    updateYeuCauThanhToan.MaSoThueBienLai = giaoDichThanhToan.Data.MaSoThueBienLai;
                    updateYeuCauThanhToan.MaGiaoDich = request.MaGiaoDich;
                    updateYeuCauThanhToan.MaThamChieuGiaoDich = request.MaThamChieu;
                    updateYeuCauThanhToan.MaNganHangGiaoDich = request.MaNganHang;
                    var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(yeuCauThanhToan.Data.MaHoSo, updateYeuCauThanhToan.NguoiNopTienBienLai, currentTime, thaoTac: $"{updateYeuCauThanhToan.NguoiNopTienBienLai} thanh toán trực tuyến");
                    await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo, cancellationToken);
                    await _mediator.Send(updateYeuCauThanhToan);
                    try
                    {
                        if (yeuCauThanhToan.Data != null)
                        {
                            if (yeuCauThanhToan.Data.Phi > 0)
                            {
                                var resPhi = await _mediator.Send(new InitBienLaiDienTuQuery(yeuCauThanhToan.Data.Id, "phi"));
                            }

                            if (yeuCauThanhToan.Data.LePhi > 0)
                            {
                                var resLePhi = await _mediator.Send(new InitBienLaiDienTuQuery(yeuCauThanhToan.Data.Id, "lephi"));
                            }

                            // cập nhật lại ngày nộp và hạn tiếp nhận sau khi nộp phí thành công
                            UpdateNgayNopSauKhiNopPhiRequest updateHs = new UpdateNgayNopSauKhiNopPhiRequest(yeuCauThanhToan.Data.MaHoSo);
                            var res = await _mediator.Send(updateHs, cancellationToken);
                        }

                        await _eventPublisher.PublishAsync(new ThongBaoNopPhiThanhCongTrucTiepEvent(yeuCauThanhToan.Data.HoSoId, yeuCauThanhToan.Data.MaHoSo, giaoDichThanhToan.Data.NguoiNopTienBienLai,
                            giaoDichThanhToan.Data.SoGiayToNguoiNopTienBienLai, !string.IsNullOrEmpty(yeuCauThanhToan.Data.SoDienThoaiNguoiUyQuyen) ? yeuCauThanhToan.Data.SoDienThoaiNguoiUyQuyen : yeuCauThanhToan.Data.SoDienThoaiChuHoSo, yeuCauThanhToan.Data.TrichYeuHoSo, yeuCauThanhToan.Data.SoGiayToChuHoSo, updateYeuCauThanhToan.HinhThucThanhToan));
                    }
                    catch (Exception)
                    {
                    }
                }
            }
            else
            {
                giaoDichThanhToanCommand.TrangThai = _giaoDichThanhToanConstants.TRANG_THAI.THAT_BAI;

                // updateYeuCauThanhToan.TrangThai = _yeuCauThanhToanContants.TRANG_THAI.DA_THANH_TOAN;

            }

            await _mediator.Send(giaoDichThanhToanCommand);

            // await _eventPublisher.PublishAsync(new ThongBaoNopPhiThanhCongTrucTiepEvent(new Domain.Business.HoSo()));
            // response
            result.MoTaLoi = string.Empty;
            result.MaLoi = request.MaLoi;
            result.MaDoiTac = giaoDichThanhToan.Data.MaDoiTac;
            result.ThoiGianGD = request.ThoiGianGD;
            result.MaXacThuc = request.MaXacThuc;
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogDebug("ConfirmDvcPaymentDebug", "ConfirmDvcPaymentDebug" + ex.InnerException.Message);
            throw ex;
        }
    }
}
