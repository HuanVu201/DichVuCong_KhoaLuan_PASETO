using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.BienLaiViettel;
using TD.DichVuCongApi.Application.Common.BienLaiVNPT;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
public class GetBienLaiDienTuQueryHandler : IQueryHandler<GetBienLaiDienTuQuery, object>
{
    private readonly IMediator _mediator;
    private readonly YeuCauThanhToanConstants _cauThanhToanConstants;
    private readonly IBienLaiVNPTService _bienLaiVNPTServices;
    private readonly IBienLaiViettelServices _bienViettelServices;
    public GetBienLaiDienTuQueryHandler(IMediator mediator, IBienLaiVNPTService bienLaiVNPTServices, IBienLaiViettelServices bienLaiViettelServices)
    {
        _mediator = mediator;
        _cauThanhToanConstants = new YeuCauThanhToanConstants();
        _bienLaiVNPTServices = bienLaiVNPTServices;
        _bienViettelServices = bienLaiViettelServices;
    }

    public async Task<Result<object>> Handle(GetBienLaiDienTuQuery request, CancellationToken cancellationToken)
    {
        BienLaiDienTuDto res = new BienLaiDienTuDto();
        if (request == null) throw new ArgumentNullException(nameof(request));
        var yeuCauThanhToanRes = await _mediator.Send(new GetYeuCauThanhToanQuery(request.IdYeuCauThanhToan.Value));
        if (yeuCauThanhToanRes.Data == null) throw new Exception($"Yêu cầu thanh toán {request.IdYeuCauThanhToan} không tồn tại.");
        YeuCauThanhToanDetailDto yeuCauThanhToan = yeuCauThanhToanRes.Data;
        if (yeuCauThanhToan.TrangThai != _cauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN) throw new Exception($"Yêu cầu thanh toán {request.IdYeuCauThanhToan} chưa được thanh toán");
        var donViThuInfo = await _mediator.Send(new GetByGroupCodeQuery(yeuCauThanhToan.DonVi));
        if (donViThuInfo.Data.LayCauHinhBienLaiTheoDonViThu == true) donViThuInfo = await _mediator.Send(new GetByGroupCodeQuery(yeuCauThanhToan.DonViThu));
        if (donViThuInfo == null && donViThuInfo.Data == null) throw new Exception("Không có thông tin đơn vị thu");
        if (donViThuInfo.Data.LoaiBienLaiThanhToan == _cauThanhToanConstants.LOAI_BIEN_LAI.VNPT)
        {
            string ma = request.loaiPhi + "-" + yeuCauThanhToan.Ma;
            GetBienLaiDienTuVnptRequest vnptRequest = new GetBienLaiDienTuVnptRequest(ma, donViThuInfo.Data.CauHinhBienLaiThanhToan);
            var vnptRes = await _bienLaiVNPTServices.GetBienLaiDienTu(vnptRequest);
            if (vnptRes.Contains("ERR:"))
            {
                res.MaLoi = vnptRes;
                return Result<object>.Fail(vnptRes);

            }

            res.LoaiBienLaiThanhToan = donViThuInfo.Data.LoaiBienLaiThanhToan;
            res.BienLaiDienTu = vnptRes;
            return Result<object>.Success(res);
        }
        else if (donViThuInfo.Data.LoaiBienLaiThanhToan == _cauThanhToanConstants.LOAI_BIEN_LAI.LOCAL)
        {
            yeuCauThanhToan.TenDonViThu = donViThuInfo.Data.GroupName;
            yeuCauThanhToan.LoaiBienLaiThanhToan = donViThuInfo.Data.LoaiBienLaiThanhToan;
            yeuCauThanhToan.DonViThuPhiMaSoThue = donViThuInfo.Data.MaSoThue;
            return Result<object>.Success(yeuCauThanhToan);
        }
        else if (donViThuInfo.Data.LoaiBienLaiThanhToan == _cauThanhToanConstants.LOAI_BIEN_LAI.VIETTEL)
        {
            GetBienLaiViettelRequest req = new GetBienLaiViettelRequest(yeuCauThanhToan.DonViThuPhiMaSoThue, request.loaiPhi == "phi" ? yeuCauThanhToan.SoBienLaiPhi : yeuCauThanhToan.SoBienLaiLePhi, yeuCauThanhToan.MauSoBienLai);
            var resBl = await _bienViettelServices.GetBienLai(req, donViThuInfo.Data.CauHinhBienLaiThanhToan);
            res.BienLaiDienTu = resBl.fileToBytes;
            res.LoaiBienLaiThanhToan = donViThuInfo.Data.LoaiBienLaiThanhToan;
            return Result<object>.Success(res);
        }
        return Result<object>.Fail();
    }
}
