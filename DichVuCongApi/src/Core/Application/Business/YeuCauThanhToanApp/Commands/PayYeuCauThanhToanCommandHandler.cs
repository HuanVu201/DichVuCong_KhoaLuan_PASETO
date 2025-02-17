using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public class PayYeuCauThanhToanCommandHandler : ICommandHandler<PayYeuCauThanhToanCommand>
{

    private readonly IMediator _mediator;
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryWithEvents;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly IUserService _currentUser;
    private readonly YeuCauThanhToanConstants _yeuCauThanhToanConstants;
    private readonly ILogger<BienLaiDienTuDto> _logger;
    private readonly IEventPublisher _eventPublisher;
    public PayYeuCauThanhToanCommandHandler(IRepositoryWithEvents<YeuCauThanhToan> repositoryWithEvents, IUserService user, IMediator mediator, ILogger<BienLaiDienTuDto> logger, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo, IEventPublisher eventPublisher)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _currentUser = user;
        _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
        _mediator = mediator;
        _logger = logger;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _eventPublisher = eventPublisher;
    }

    public async Task<Result> Handle(PayYeuCauThanhToanCommand request, CancellationToken cancellationToken)
    {
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);

        List<YeuCauThanhToan> updateModel = new List<YeuCauThanhToan>();
        List<QuaTrinhXuLyHoSo> quaTrinhXuLys = new List<QuaTrinhXuLyHoSo>();
        if (request.Ids != null && request.Ids.Count > 0)
        {
            foreach (var id in request.Ids)
            {
                bool daThuPhi = false;
                var tmpRequest = new PayYeuCauThanhToanCommand();
                string thaoTac = string.Empty;
                var itemExitst = await _repositoryWithEvents.GetByIdAsync(id, cancellationToken);
                var hoSoDetail = await _mediator.Send(new GetHoSoByMaQuery(itemExitst.MaHoSo));
                if (hoSoDetail.Data == null) throw new Exception($"Hồ sơ: {itemExitst.MaHoSo} không tồn tại.");
                HoSoDetailDto hoSoDetailDto = hoSoDetail.Data;
                int phi = itemExitst.Phi;
                int lePhi = itemExitst.LePhi;
                var user = await _currentUser.GetCurrentUserAsync(cancellationToken);
                if (user == null)
                {
                    throw new UnauthorizedException($"Không tìm thấy thông tin người thực hiện");
                }

                if (itemExitst == null)
                    throw new NotFoundException($"YeuCauThanhToan với mã: {id} chưa được thêm vào hệ thống");
                if (!string.IsNullOrEmpty(request.TrangThai) && request.TrangThai.ToLower() == _yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN.ToLower())
                {
                    if (itemExitst.TrangThai.ToLower() == _yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN.ToLower())
                    {
                        daThuPhi = true;
                        continue;
                    }
                    tmpRequest.TrangThai = _yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN;
                    tmpRequest.NguoiThuPhi = user.UserName;
                    phi = request.Phi ?? itemExitst.Phi;
                    lePhi = request.LePhi ?? itemExitst.LePhi;
                    tmpRequest.NgayThuPhi = currentTime;
                    tmpRequest.GhiChuThanhToan = tmpRequest.GhiChu;
                    tmpRequest.NguoiNopTienBienLai = string.IsNullOrEmpty(request.NguoiNopTienBienLai) ? hoSoDetailDto.ChuHoSo : request.NguoiNopTienBienLai;
                    tmpRequest.SoDienThoaiNguoiNopTienBienLai = string.IsNullOrEmpty(request.SoDienThoaiNguoiNopTienBienLai) ? hoSoDetailDto.SoDienThoaiChuHoSo : request.SoDienThoaiNguoiNopTienBienLai;
                    tmpRequest.DiaChiBienLai = string.IsNullOrEmpty(request.DiaChiBienLai) ? hoSoDetailDto.DiaChiChuHoSo : request.DiaChiBienLai;
                    tmpRequest.TenLePhiBienLai = string.IsNullOrEmpty(request.TenLePhiBienLai) ? "Lệ phí " + hoSoDetailDto.TenTTHC : request.TenLePhiBienLai;
                    tmpRequest.TenPhiBienLai = string.IsNullOrEmpty(request.TenPhiBienLai) ? "Phí " + hoSoDetailDto.TrichYeuHoSo : request.TenPhiBienLai;
                    tmpRequest.SoGiayToNguoiNopTienBienLai = string.IsNullOrEmpty(request.SoGiayToNguoiNopTienBienLai) ? hoSoDetailDto.SoGiayToChuHoSo : request.SoGiayToNguoiNopTienBienLai;
                    tmpRequest.EmailNguoiNopTienBienLai = string.IsNullOrEmpty(request.EmailNguoiNopTienBienLai) ? hoSoDetailDto.EmailChuHoSo : request.EmailNguoiNopTienBienLai;
                    tmpRequest.MaSoThueBienLai = request.MaSoThueBienLai;
                    thaoTac = "Thanh toán phí,lệ phí";
                    await _eventPublisher.PublishAsync(new ThongBaoNopPhiThanhCongTrucTiepEvent(hoSoDetailDto.Id, hoSoDetailDto.MaHoSo, tmpRequest.NguoiNopTienBienLai, tmpRequest.SoGiayToNguoiNopTienBienLai, tmpRequest.SoDienThoaiNguoiNopTienBienLai, hoSoDetailDto.TrichYeuHoSo, hoSoDetailDto.SoGiayToChuHoSo, request.HinhThucThanhToan));
                }
                else if (!string.IsNullOrEmpty(request.TrangThai) && request.TrangThai.ToLower() == _yeuCauThanhToanConstants.TRANG_THAI.HOAN_PHI.ToLower())
                {
                    tmpRequest.TrangThai = _yeuCauThanhToanConstants.TRANG_THAI.HOAN_PHI;
                    tmpRequest.NgayHoanPhi = currentTime;
                    tmpRequest.NguoiHoanPhi = user.UserName;
                    tmpRequest.LyDoHoanPhi = request.LyDoHoanPhi;
                    thaoTac = "Hoàn phí,lệ phí";
                }
                else if (!string.IsNullOrEmpty(request.TrangThai) && request.TrangThai.ToLower() == _yeuCauThanhToanConstants.TRANG_THAI.HUY.ToLower())
                {
                    tmpRequest.TrangThai = _yeuCauThanhToanConstants.TRANG_THAI.HUY;
                    tmpRequest.NgayHuy = currentTime;
                    tmpRequest.NguoiHuy = user.UserName;
                    tmpRequest.LyDoHuy = request.LyDoHuy;
                    thaoTac = "Huỷ thu phí,lệ phí";

                }

                var updatedTinBai = itemExitst.Update(itemExitst.MaHoSo, itemExitst.Ma, itemExitst.SoTien, phi, lePhi, tmpRequest.TrangThai, itemExitst.NgayYeuCau, itemExitst.NguoiYeuCau,
              null, request.HinhThucThanhToan, itemExitst.HinhThucThu, itemExitst.ChiTiet, tmpRequest.GhiChuThanhToan, itemExitst.MauSoBienLai, itemExitst.KyHieuBienLai,
              tmpRequest.NguoiThuPhi, tmpRequest.NgayThuPhi, itemExitst.DonViThuPhiMaSoThue, itemExitst.DonViMaSoThue, tmpRequest.NgayHoanPhi, tmpRequest.NguoiHoanPhi,
              tmpRequest.LyDoHoanPhi, tmpRequest.NgayHuy, tmpRequest.NguoiHuy, tmpRequest.LyDoHuy, null, tmpRequest.NguoiNopTienBienLai, tmpRequest.MaSoThueBienLai, tmpRequest.DiaChiBienLai, tmpRequest.TenPhiBienLai, tmpRequest.TenLePhiBienLai,
              request.SoTaiKhoanHoanPhi, request.TenTaiKhoanHoanPhi, request.TenNganHangHoanPhi, tmpRequest.SoGiayToNguoiNopTienBienLai, null, tmpRequest.EmailNguoiNopTienBienLai, tmpRequest.SoDienThoaiNguoiNopTienBienLai);
                if (!daThuPhi)
                {
                    updateModel.Add(updatedTinBai);
                    quaTrinhXuLys.Add(new QuaTrinhXuLyHoSo(itemExitst.MaHoSo, null, null, null, null, user.Id.ToString(), user.FullName, string.Empty, string.Empty, currentTime, trangThai: string.Empty, thaoTac: thaoTac));
                }

            }
        }

        await _repositoryWithEvents.UpdateRangeAsync(updateModel, cancellationToken);
        await _repositoryQuaTrinhXuLyHoSo.AddRangeAsync(quaTrinhXuLys);
        try
        {
            foreach (var item in updateModel)
            {
                if (item != null && item.TrangThai.ToLower() == _yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN.ToLower())
                {
                    if (item.Phi > 0)
                    {
                        var resPhi = await _mediator.Send(new InitBienLaiDienTuQuery(item.Id, "phi"));
                    }

                    if (item.LePhi > 0)
                    {
                        var resLePhi = await _mediator.Send(new InitBienLaiDienTuQuery(item.Id, "lephi"));
                    }

                    // cập nhật lại ngày nộp và hạn tiếp nhận sau khi nộp phí thành công
                    UpdateNgayNopSauKhiNopPhiRequest updateHs = new UpdateNgayNopSauKhiNopPhiRequest(item.MaHoSo);
                    var res = await _mediator.Send(updateHs, cancellationToken);
                }

                if (item != null && item.TrangThai.ToLower() == _yeuCauThanhToanConstants.TRANG_THAI.HOAN_PHI.ToLower())
                {
                    if (item.Phi > 0)
                    {
                        var resPhi = await _mediator.Send(new CancelBienLaiDienTuCommand(item.Id, "phi"));
                    }

                    if (item.LePhi > 0)
                    {
                        var resLePhi = await _mediator.Send(new CancelBienLaiDienTuCommand(item.Id, "lephi"));
                    }
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("PayBienLaiDienTu", ex.Message);
        }

        return (Result)Result.Success();
    }
}
