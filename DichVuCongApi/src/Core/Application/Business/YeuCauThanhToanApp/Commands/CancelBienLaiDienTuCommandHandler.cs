using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.BienLaiViettel;
using TD.DichVuCongApi.Application.Common.BienLaiVNPT;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Extensions;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public class CancelBienLaiDienTuCommandHandler : ICommandHandler<CancelBienLaiDienTuCommand>
{
    private IMediator _mediator;
    private YeuCauThanhToanConstants _cauThanhToanConstants;
    private IBienLaiVNPTService _bienLaiVNPTServices;
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryWithEvents;
    private YeuCauThanhToanConstants _yeuCauThanhToanConstants;
    private readonly IBienLaiViettelServices _bienLaiViettelServices;
    public CancelBienLaiDienTuCommandHandler(IMediator mediator, IBienLaiVNPTService bienLaiVNPTServices, IRepositoryWithEvents<YeuCauThanhToan> repositoryWithEvents, IBienLaiViettelServices bienLaiViettelServices)
    {
        _mediator = mediator;
        _cauThanhToanConstants = new YeuCauThanhToanConstants();
        _bienLaiVNPTServices = bienLaiVNPTServices;
        _repositoryWithEvents = repositoryWithEvents;
        _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
        _bienLaiViettelServices = bienLaiViettelServices;
    }

    public async Task<Result> Handle(CancelBienLaiDienTuCommand request, CancellationToken cancellationToken)
    {
        DateTime currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        BienLaiDienTuDto res = new BienLaiDienTuDto();
        bool huyThanhCong = false;
        string message = string.Empty;
        if (request == null) throw new ArgumentNullException(nameof(request));
        var yeuCauThanhToanRes = await _mediator.Send(new GetYeuCauThanhToanQuery(request.IdYeuCauThanhToan.Value));
        if (yeuCauThanhToanRes.Data == null) throw new Exception($"Yêu cầu thanh toán {request.IdYeuCauThanhToan} không tồn tại.");
        YeuCauThanhToanDetailDto yeuCauThanhToan = yeuCauThanhToanRes.Data;
        var donViThuInfo = await _mediator.Send(new GetByGroupCodeQuery(yeuCauThanhToan.DonVi));
        if (donViThuInfo.Data.LayCauHinhBienLaiTheoDonViThu == true)
        {
            donViThuInfo = await _mediator.Send(new GetByGroupCodeQuery(yeuCauThanhToan.DonViThu));
        }
        string ma = request.loaiPhi + "-" + yeuCauThanhToan.Ma;
        if (donViThuInfo.Data.LoaiBienLaiThanhToan == _yeuCauThanhToanConstants.LOAI_BIEN_LAI.VNPT)
        {
            HuyBienLaiDienTuVNPTRequest vnptRequest = new HuyBienLaiDienTuVNPTRequest(ma, donViThuInfo.Data.CauHinhBienLaiThanhToan);
            var vnptRes = await _bienLaiVNPTServices.HuyBienLaiDienTu(vnptRequest);

            if (!string.IsNullOrEmpty(vnptRes))
            {
                message = vnptRes;
                if (vnptRes.IndexOf("OK:") != -1) huyThanhCong = true;

            }
        }
        else if (donViThuInfo.Data.LoaiBienLaiThanhToan == _yeuCauThanhToanConstants.LOAI_BIEN_LAI.LOCAL)
        {
            huyThanhCong = true;
        }
        else if (donViThuInfo.Data.LoaiBienLaiThanhToan == _yeuCauThanhToanConstants.LOAI_BIEN_LAI.VIETTEL)
        {
            string tenPhiLePhi = string.Empty;
            if (request.loaiPhi == "phi")
            {
                tenPhiLePhi = !string.IsNullOrEmpty(yeuCauThanhToan.TenPhiBienLai) ? yeuCauThanhToan.TenPhiBienLai : $"Phí {yeuCauThanhToan.TenTTHC}";

            }
            else
            {
                tenPhiLePhi = !string.IsNullOrEmpty(yeuCauThanhToan.TenLePhiBienLai) ? yeuCauThanhToan.TenLePhiBienLai : $"Lệ phí {yeuCauThanhToan.TenTTHC}";
            }

            DateTime? ngayLapHoaDon = request.loaiPhi == "phi" ? yeuCauThanhToan.NgayLapHoaDonPhi : request.loaiPhi == "lephi" ? yeuCauThanhToan.NgayLapHoaDonLePhi : currentTime;
            string ngayLapHoaDonTimestamp = DateTimeExtension.TotimeStamp(new DateTime(ngayLapHoaDon.Value.Year, ngayLapHoaDon.Value.Month, ngayLapHoaDon.Value.Day, ngayLapHoaDon.Value.Hour, ngayLapHoaDon.Value.Minute, ngayLapHoaDon.Value.Second)).ToString();
            CancelBienLaiViettelRequest req = new CancelBienLaiViettelRequest(yeuCauThanhToan.DonViThuPhiMaSoThue, request.loaiPhi == "phi" ? yeuCauThanhToan.SoBienLaiPhi : yeuCauThanhToan.SoBienLaiLePhi, yeuCauThanhToan.MauSoBienLai, ngayLapHoaDonTimestamp, $"Huỷ {tenPhiLePhi}", ngayLapHoaDonTimestamp);
            var resHuy = await _bienLaiViettelServices.CancelBienLaiVietel(req, donViThuInfo.Data.CauHinhBienLaiThanhToan);
            if(resHuy != null && resHuy.errorCode == null && resHuy.code == null) huyThanhCong = true;
            message = resHuy.data;
        }

        if (huyThanhCong)
        {
            var yeuCauThanhToanTmp = await _repositoryWithEvents.GetByIdAsync(request.IdYeuCauThanhToan, cancellationToken);
            if (request.loaiPhi == "phi")
            {
                if (string.IsNullOrEmpty(yeuCauThanhToanTmp.SoBienLaiLePhi))
                {
                    yeuCauThanhToanTmp.UpdateThongTinBienLai(string.Empty, string.Empty, null, request.loaiPhi == "phi" ? string.Empty : null, null);

                }
                else
                {
                    yeuCauThanhToanTmp.UpdateThongTinBienLai(null, null, null, request.loaiPhi == "phi" ? string.Empty : null, null);
                }
            }
            else if (request.loaiPhi == "lephi")
            {
                if (string.IsNullOrEmpty(yeuCauThanhToanTmp.SoBienLaiPhi))
                {
                    yeuCauThanhToanTmp.UpdateThongTinBienLai(string.Empty, string.Empty, null, null, string.Empty);

                }
                else
                {
                    yeuCauThanhToanTmp.UpdateThongTinBienLai(null, null, null, null, string.Empty);
                }
            }
            await _repositoryWithEvents.UpdateAsync(yeuCauThanhToanTmp, cancellationToken);
            return Result<string>.Success(message);
        }
        res.MaLoi = message;
        return Result<string>.Fail(message);

    }
    
}
