using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Commands;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.BienLaiVNPT;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Domain.Business;


namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public class InitMultiBienLaiDienTuHandler : IQueryHandler<InitMultiBienLaiDienTu, List<BienLaiDienTuDto>>
{
    private readonly string DA_THANH_TOAN = "Đã thanh toán";

    private IMediator _mediator;
    private IBienLaiVNPTService _bienLaiVNPTServices;
    private YeuCauThanhToanConstants _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryWithEvents;
    private readonly ICommonServices _commonServices;

    public InitMultiBienLaiDienTuHandler(IMediator mediator, IBienLaiVNPTService bienLaiVNPTServices, IRepositoryWithEvents<YeuCauThanhToan> repositoryWithEvents
       , ICommonServices commonServices)
    {
        _mediator = mediator;
        _bienLaiVNPTServices = bienLaiVNPTServices;
        _repositoryWithEvents = repositoryWithEvents;
        _commonServices = commonServices;
    }

    public async Task<Result<List<BienLaiDienTuDto>>> Handle(InitMultiBienLaiDienTu request, CancellationToken cancellationToken)
    {
        string hinhThucThanhToan = string.Empty;
        if (request == null) throw new ArgumentNullException(nameof(request));
        if (request.IdYeuCauThanhToans == null) throw new ArgumentNullException(nameof(request.IdYeuCauThanhToans));
        if (request.IdYeuCauThanhToans.Count <= 0) throw new ArgumentNullException(nameof(request.IdYeuCauThanhToans));
        List<BienLaiDienTuDto> result = new List<BienLaiDienTuDto>();
        foreach (var idYctt in request.IdYeuCauThanhToans)
        {
            var yeuCauThanhToanRes = await _mediator.Send(new GetYeuCauThanhToanQuery(idYctt));

            if (yeuCauThanhToanRes.Data == null) throw new Exception($"Yêu cầu thanh toán {idYctt} không tồn tại.");
            YeuCauThanhToanDetailDto yeuCauThanhToan = yeuCauThanhToanRes.Data;
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
                BienLaiDienTuDto tmpResult = new BienLaiDienTuDto();
                tmpResult.MaLoi = "00";
                tmpResult.SoBienLai = yeuCauThanhToan.SoBienLai;
                tmpResult.KyHieuBienLai = yeuCauThanhToan.KyHieuBienLai;
                tmpResult.MauSoBienLai = yeuCauThanhToan.MauSoBienLai;
                result.Add(tmpResult);

            }
            else
            {


                if (!string.IsNullOrEmpty(yeuCauThanhToan.TrangThai) && yeuCauThanhToan.TrangThai.ToLower() != _yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN.ToLower()) throw new Exception($"Yêu cầu thanh toán {idYctt} chưa được thanh toán");

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
                InitBienLaiDienTuVnptRequest requestBienLai = new InitBienLaiDienTuVnptRequest();
                requestBienLai.Ma = request.loaiPhi + "-" + yeuCauThanhToan.Ma;
                requestBienLai.MaHoSo = yeuCauThanhToan.MaHoSo;
                requestBienLai.MaTTHC = yeuCauThanhToan.MaTTHC;
                requestBienLai.ThanhTien = request.loaiPhi == "phi" ? yeuCauThanhToan.Phi : yeuCauThanhToan.LePhi;
                requestBienLai.NgayThuPhi = yeuCauThanhToan.NgayThuPhi.HasValue ? yeuCauThanhToan.NgayThuPhi.Value : DateTime.Now;
                if (request.loaiPhi == "phi")
                {
                    requestBienLai.LoaiPhiText = !string.IsNullOrEmpty(yeuCauThanhToan.TenPhiBienLai) ? yeuCauThanhToan.TenPhiBienLai : $"Phí {yeuCauThanhToan.TenTTHC}";

                }
                else
                {
                    requestBienLai.LoaiPhiText = !string.IsNullOrEmpty(yeuCauThanhToan.TenLePhiBienLai) ? yeuCauThanhToan.TenLePhiBienLai : $"Lệ phí {yeuCauThanhToan.TenTTHC}";
                }

                requestBienLai.ChuHoSo = yeuCauThanhToan.NguoiNopTienBienLai ?? string.Empty;
                requestBienLai.HinhThucThanhToan = hinhThucThanhToan;
                requestBienLai.DiaChiChuHoSo = yeuCauThanhToan.DiaChiBienLai ?? string.Empty;
                requestBienLai.MaSoThueBienLai = yeuCauThanhToan.MaSoThueBienLai ?? string.Empty;
                requestBienLai.DonViThuPhi = donViThuInfo.Data.GroupName;
                requestBienLai.CauHinhBienLaiDienTu = donViThuInfo.Data.CauHinhBienLaiThanhToan;
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
                        var yeuCauThanhToanTmp = await _repositoryWithEvents.GetByIdAsync(idYctt, cancellationToken);
                        yeuCauThanhToanTmp.UpdateThongTinBienLai(mauSoBienLai, kyHieuBienLai, null, request.loaiPhi == "phi" ? soBienLai : null, request.loaiPhi == "lephi" ? soBienLai : null);
                        await _repositoryWithEvents.UpdateAsync(yeuCauThanhToanTmp, cancellationToken);


                    }

                }
                result.Add(bienLaiDienTuDto);
            }


        }


        return Result<List<BienLaiDienTuDto>>.Success(result);
    }
}
