using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Commands;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.BienLaiViettel;
using TD.DichVuCongApi.Application.Common.BienLaiVNPT;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Extensions;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Domain.Business;


namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
public class InitBienLaiDienTuQueryHandler : IQueryHandler<InitBienLaiDienTuQuery, BienLaiDienTuDto>
{
    private readonly string DA_THANH_TOAN = "Đã thanh toán";

    private IMediator _mediator;
    private IBienLaiVNPTService _bienLaiVNPTServices;
    private YeuCauThanhToanConstants _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryWithEvents;
    private readonly IBienLaiViettelServices _bienLaiViettelServices;
    private readonly ICommonServices _commonServices;

    public InitBienLaiDienTuQueryHandler(IMediator mediator, IBienLaiVNPTService bienLaiVNPTServices, IRepositoryWithEvents<YeuCauThanhToan> repositoryWithEvents
       , ICommonServices commonServices, IBienLaiViettelServices bienLaiViettelServices)
    {
        _mediator = mediator;
        _bienLaiVNPTServices = bienLaiVNPTServices;
        _repositoryWithEvents = repositoryWithEvents;
        _commonServices = commonServices;
        _bienLaiViettelServices = bienLaiViettelServices;
    }

    public async Task<Result<BienLaiDienTuDto>> Handle(InitBienLaiDienTuQuery request, CancellationToken cancellationToken)
    {
        var currentTime = DateTime.UtcNow;
        string hinhThucThanhToan = string.Empty;
        string tenPhiLePhi = string.Empty;
        if (request.IdYeuCauThanhToan == null) throw new ArgumentNullException(nameof(request.IdYeuCauThanhToan));
        var yeuCauThanhToanRes = await _mediator.Send(new GetYeuCauThanhToanQuery(request.IdYeuCauThanhToan.Value));

        if (yeuCauThanhToanRes.Data == null) throw new Exception($"Yêu cầu thanh toán {request.IdYeuCauThanhToan} không tồn tại.");
        YeuCauThanhToanDetailDto yeuCauThanhToan = yeuCauThanhToanRes.Data;
        if (!string.IsNullOrEmpty(yeuCauThanhToan.TrangThai) && yeuCauThanhToan.TrangThai.ToLower() != _yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN.ToLower()) throw new Exception($"Yêu cầu thanh toán {request.IdYeuCauThanhToan} chưa được thanh toán");
        if (yeuCauThanhToan.HinhThucThanhToan == _yeuCauThanhToanConstants.HINH_THUC_THANH_TOAN.TIEN_MAT)
        {
            hinhThucThanhToan = "Tiền mặt";
        }
        else if (yeuCauThanhToan.HinhThucThanhToan == _yeuCauThanhToanConstants.HINH_THUC_THANH_TOAN.TRUC_TUYEN)
        {
            var commonSetting = _commonServices.Get();
            if (commonSetting != null && commonSetting.ProvinceCode == "38")
            {
                hinhThucThanhToan = "Chuyển khoản";
            }
            else
            {
                hinhThucThanhToan = "Trực tuyến";
            }

        }
        else if (yeuCauThanhToan.HinhThucThanhToan == _yeuCauThanhToanConstants.HINH_THUC_THANH_TOAN.CHUYEN_KHOAN)
        {
            hinhThucThanhToan = "Chuyển khoản";
        }
        else
        {
            hinhThucThanhToan = "Chuyển khoản";

        }

        if (request.loaiPhi == "phi")
        {
            tenPhiLePhi = !string.IsNullOrEmpty(yeuCauThanhToan.TenPhiBienLai) ? yeuCauThanhToan.TenPhiBienLai : $"Phí {yeuCauThanhToan.TenTTHC}";

        }
        else
        {
            tenPhiLePhi = !string.IsNullOrEmpty(yeuCauThanhToan.TenLePhiBienLai) ? yeuCauThanhToan.TenLePhiBienLai : $"Lệ phí {yeuCauThanhToan.TenTTHC}";
        }

        var donViThuInfo = await _mediator.Send(new GetByGroupCodeQuery(yeuCauThanhToan.DonVi));
        if (donViThuInfo.Data.LayCauHinhBienLaiTheoDonViThu == true)
        {
            donViThuInfo = await _mediator.Send(new GetByGroupCodeQuery(yeuCauThanhToan.DonViThu));
        }

        if (donViThuInfo.Data.LoaiBienLaiThanhToan == _yeuCauThanhToanConstants.LOAI_BIEN_LAI.LOCAL)
        {
            yeuCauThanhToan.TenDonViThu = donViThuInfo.Data.GroupName;
            yeuCauThanhToan.LoaiBienLaiThanhToan = donViThuInfo.Data.LoaiBienLaiThanhToan;
            if (string.IsNullOrEmpty(yeuCauThanhToan.SoBienLai) && yeuCauThanhToan.HinhThucThanhToan != _yeuCauThanhToanConstants.HINH_THUC_THANH_TOAN.TRUC_TUYEN)
            {
                string soBienLai = !string.IsNullOrEmpty(donViThuInfo.Data.SoBienLai) ? donViThuInfo.Data.SoBienLai : "0";
                int intSoBienLai;
                bool suss = int.TryParse(soBienLai, out intSoBienLai);
                intSoBienLai += 1;
                yeuCauThanhToan.KyHieuBienLai = donViThuInfo.Data.KyHieuBienLai;
                yeuCauThanhToan.MauSoBienLai = donViThuInfo.Data.MauSoBienLai;
                yeuCauThanhToan.SoBienLai = intSoBienLai.ToString().PadLeft(7, '0');
                yeuCauThanhToan.DonViThuPhiMaSoThue = donViThuInfo.Data.MaSoThue;
                UpdateGroupCommand updateGroupCommand = new UpdateGroupCommand();
                updateGroupCommand.Id = donViThuInfo.Data.Id;
                updateGroupCommand.SoBienLai = intSoBienLai.ToString().PadLeft(7, '0');
                await _mediator.Send(updateGroupCommand);
                UpdateYeuCauThanhToanCommand updateYeuCauThanhToanCommand = new UpdateYeuCauThanhToanCommand();
                updateYeuCauThanhToanCommand.DonViThuPhiMaSoThue = donViThuInfo.Data.MaSoThue;
                updateYeuCauThanhToanCommand.Id = yeuCauThanhToan.Id;
                updateYeuCauThanhToanCommand.MauSoBienLai = donViThuInfo.Data.MauSoBienLai;
                updateYeuCauThanhToanCommand.KyHieuBienLai = donViThuInfo.Data.KyHieuBienLai;
                updateYeuCauThanhToanCommand.SoBienLai = intSoBienLai.ToString().PadLeft(7, '0');
                await _mediator.Send(updateYeuCauThanhToanCommand);

            }
            BienLaiDienTuDto result = new BienLaiDienTuDto();
            result.MaLoi = "00";
            result.SoBienLai = yeuCauThanhToan.SoBienLai;
            result.KyHieuBienLai = yeuCauThanhToan.KyHieuBienLai;
            result.MauSoBienLai = yeuCauThanhToan.MauSoBienLai;

            return Result<BienLaiDienTuDto>.Success(result);
        }
        else if (donViThuInfo.Data.LoaiBienLaiThanhToan == _yeuCauThanhToanConstants.LOAI_BIEN_LAI.VNPT)
        {
            InitBienLaiDienTuVnptRequest requestBienLai = new InitBienLaiDienTuVnptRequest();
            requestBienLai.Ma = request.loaiPhi + "-" + yeuCauThanhToan.Ma;
            requestBienLai.MaHoSo = yeuCauThanhToan.MaHoSo;
            requestBienLai.MaTTHC = yeuCauThanhToan.MaTTHC;
            requestBienLai.ThanhTien = request.loaiPhi == "phi" ? yeuCauThanhToan.Phi : yeuCauThanhToan.LePhi;
            requestBienLai.NgayThuPhi = yeuCauThanhToan.NgayThuPhi.HasValue ? yeuCauThanhToan.NgayThuPhi.Value : DateTime.Now;
            requestBienLai.LoaiPhi = request.loaiPhi;
            requestBienLai.LoaiPhiText = tenPhiLePhi;

            requestBienLai.ChuHoSo = yeuCauThanhToan.NguoiNopTienBienLai ?? string.Empty;
            requestBienLai.HinhThucThanhToan = hinhThucThanhToan;
            requestBienLai.DiaChiChuHoSo = yeuCauThanhToan.DiaChiBienLai ?? string.Empty;
            requestBienLai.MaSoThueBienLai = yeuCauThanhToan.MaSoThueBienLai ?? string.Empty;
            requestBienLai.DonViThuPhi = donViThuInfo.Data.GroupName;
            requestBienLai.CauHinhBienLaiDienTu = donViThuInfo.Data.CauHinhBienLaiThanhToan;
            if (requestBienLai.ThanhTien <= 0) throw new Exception("Không phát hành hóa đơn có giá trị 0 đồng");
            var response = await _bienLaiVNPTServices.PhatHanhBienLai(requestBienLai);
            BienLaiDienTuDto bienLaiDienTuDto = new BienLaiDienTuDto();
            bienLaiDienTuDto.MaLoi = response;
            if (!string.IsNullOrEmpty(response))
            {
                if (response.IndexOf("OK:") != -1)
                {
                    int first = response.IndexOf(";");
                    int last = response.IndexOf($"-{requestBienLai.Ma}");
                    string mauSoBienLai = response.Substring(3, first - 3);
                    string kyHieuBienLai = response.Substring(first + 1, last - first - 1);

                    string soBienLai = response.Substring(last + $"-{requestBienLai.Ma}".Length + 1, response.Length - last - $"-{requestBienLai.Ma}".Length - 1);
                    bienLaiDienTuDto.MauSoBienLai = mauSoBienLai;
                    bienLaiDienTuDto.KyHieuBienLai = kyHieuBienLai;
                    var yeuCauThanhToanTmp = await _repositoryWithEvents.GetByIdAsync(request.IdYeuCauThanhToan, cancellationToken);
                    yeuCauThanhToanTmp.UpdateThongTinBienLai(mauSoBienLai, kyHieuBienLai, null, request.loaiPhi == "phi" ? soBienLai : null, request.loaiPhi == "lephi" ? soBienLai : null, null, request.loaiPhi == "phi" ? currentTime : null, request.loaiPhi == "lephi" ? currentTime : null);
                    await _repositoryWithEvents.UpdateAsync(yeuCauThanhToanTmp, cancellationToken);
                    return Result<BienLaiDienTuDto>.Success(bienLaiDienTuDto);
                }

            }

            return Result<BienLaiDienTuDto>.Fail(response);
        }
        else if (donViThuInfo.Data.LoaiBienLaiThanhToan == _yeuCauThanhToanConstants.LOAI_BIEN_LAI.VIETTEL)
        {
            if (string.IsNullOrEmpty(donViThuInfo.Data.MaSoThue)) throw new Exception("Không có thông tin mã số thuế đơn vị");
            //if (!string.IsNullOrEmpty(yeuCauThanhToan.SoBienLaiPhi) && request.loaiPhi == "phi") throw new Exception("Đã có thông tin biên lai phí.");
            //if (!string.IsNullOrEmpty(yeuCauThanhToan.SoBienLaiLePhi) && request.loaiPhi == "lephi") throw new Exception("Đã có thông tin biên lai lệ phí.");
            ViettelInvoiceSettings settings = _bienLaiViettelServices.Get();
            double ngayLapBienLai = DateTimeExtension.TotimeStamp(new DateTime(currentTime.Year,currentTime.Month, currentTime.Day, currentTime.Hour, currentTime.Minute, currentTime.Second));
            var cauHinhBienLai = JsonConvert.DeserializeObject<CauHinhBienLaiViettel>(donViThuInfo.Data.CauHinhBienLaiThanhToan);
            XuatBienLaiViettelRequest reqBienLai = new XuatBienLaiViettelRequest();
            GeneralInvoiceInfo generalInvoice = new GeneralInvoiceInfo(cauHinhBienLai.serial, cauHinhBienLai.pattern, ngayLapBienLai);
            Payments payments = new Payments(hinhThucThanhToan);
            BuyerInfo buyerInfo = new BuyerInfo(yeuCauThanhToan.NguoiNopTienBienLai ?? string.Empty, yeuCauThanhToan.MaSoThueBienLai ?? string.Empty, yeuCauThanhToan.DiaChiBienLai ?? string.Empty,
            yeuCauThanhToan.SoDienThoaiNguoiNopTienBienLai ?? string.Empty, yeuCauThanhToan.SoGiayToNguoiNopTienBienLai ?? string.Empty);
            ItemInfo itemInfo = new ItemInfo(tenPhiLePhi, request.loaiPhi == "phi" ? yeuCauThanhToan.Phi : yeuCauThanhToan.LePhi);
            TaxBreakdowns taxBreakdowns = new TaxBreakdowns(request.loaiPhi == "phi" ? yeuCauThanhToan.Phi : yeuCauThanhToan.LePhi);
            reqBienLai.generalInvoiceInfo = generalInvoice;
            reqBienLai.buyerInfo = buyerInfo;
            reqBienLai.payments = new List<Payments> { payments };
            reqBienLai.sellerInfo = new SellerInfo();

            reqBienLai.itemInfo = new List<ItemInfo>() { itemInfo };
            reqBienLai.taxBreakdowns = new List<TaxBreakdowns>() { taxBreakdowns };
            reqBienLai.summarizeInfo = new SummarizeInfo(request.loaiPhi == "phi" ? yeuCauThanhToan.Phi : yeuCauThanhToan.LePhi);
            BienLaiDienTuDto bienLaiDienTuDto = new BienLaiDienTuDto();
            var resBienLai = await _bienLaiViettelServices.PhatHanhBienLai(reqBienLai, donViThuInfo.Data.CauHinhBienLaiThanhToan, donViThuInfo.Data.MaSoThue);
            if (resBienLai != null && resBienLai.result != null && !string.IsNullOrEmpty(resBienLai.result.supplierTaxCode))
            {
                var yeuCauThanhToanTmp = await _repositoryWithEvents.GetByIdAsync(request.IdYeuCauThanhToan, cancellationToken);
                yeuCauThanhToanTmp.UpdateThongTinBienLai(cauHinhBienLai.pattern, cauHinhBienLai.serial, null,
                    request.loaiPhi == "phi" ? resBienLai.result.invoiceNo : null, request.loaiPhi == "lephi" ? resBienLai.result.invoiceNo : null, resBienLai.result.supplierTaxCode,
                    request.loaiPhi == "phi" ? currentTime : null, request.loaiPhi == "lephi" ? currentTime : null);
                await _repositoryWithEvents.UpdateAsync(yeuCauThanhToanTmp, cancellationToken);
                bienLaiDienTuDto.SoBienLai = resBienLai.result.invoiceNo;
                return Result<BienLaiDienTuDto>.Success(bienLaiDienTuDto);
            }
        }

        return Result<BienLaiDienTuDto>.Fail();
    }
}
