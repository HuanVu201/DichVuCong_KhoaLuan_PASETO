using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.BienLaiVNPT;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Identity.Tokens;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public class EditBienLaiDienTuHandler : ICommandHandler<EditBienLaiDienTu>
{
    private readonly IMediator _mediator;
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryWithEvents;
    private YeuCauThanhToanConstants _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
    private IBienLaiVNPTService _bienLaiVNPTServices;
    private readonly ICommonServices _commonServices;
    private readonly IUserService _user;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    public EditBienLaiDienTuHandler(IRepositoryWithEvents<YeuCauThanhToan> repositoryWithEvents, IBienLaiVNPTService bienLaiVNPTServices, IMediator mediator, ICommonServices commonServices
        ,IUserService user, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _bienLaiVNPTServices = bienLaiVNPTServices;
        _mediator = mediator;
        _commonServices = commonServices;
        _user = user;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
    }
    public async Task<Result> Handle(EditBienLaiDienTu request, CancellationToken cancellationToken)
    {
        if (request == null) throw new ArgumentNullException(nameof(request));
        if (request.IdYeuCauThanhToan == null) throw new ArgumentNullException(nameof(request.IdYeuCauThanhToan));
        var itemExist = await _repositoryWithEvents.GetByIdAsync(request.IdYeuCauThanhToan.Value);
        if (itemExist == null) throw new Exception($"Yêu cầu thanh toán với mã {request.IdYeuCauThanhToan.Value} không tồn tại ");
        var updateBienLai =  itemExist.UpdateBienLaiDienTu(request.Phi, request.LePhi, request.TenPhiBienLai, request.TenLePhiBienLai, request.NguoiNopTienBienLai, request.DiaChiBienLai, request.MaSoThueBienLai, request.EmailNguoiNopTienBienLai, request.HinhThucThanhToan);
        await _repositoryWithEvents.UpdateAsync(updateBienLai,cancellationToken);
        string hinhThucThanhToan = string.Empty;
        var yeuCauThanhToanRes = await _mediator.Send(new GetYeuCauThanhToanQuery(request.IdYeuCauThanhToan.Value));
        if (yeuCauThanhToanRes.Data == null) throw new Exception($"Yêu cầu thanh toán {request.IdYeuCauThanhToan} không tồn tại.");
        var _currentUser = await _user.GetCurrentUserAsync(cancellationToken);
        var userId = _currentUser.Id.ToString();
        var userOfficeCode = _currentUser.OfficeCode;
        var userFullName = _currentUser.FullName;
        var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        YeuCauThanhToanDetailDto yeuCauThanhToan = yeuCauThanhToanRes.Data;
        if (!string.IsNullOrEmpty(yeuCauThanhToan.TrangThai) && yeuCauThanhToan.TrangThai.ToLower() != _yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN.ToLower()) throw new Exception($"Yêu cầu thanh toán {request.IdYeuCauThanhToan} chưa được thanh toán");
        var donViThuInfo = await _mediator.Send(new GetByGroupCodeQuery(yeuCauThanhToan.DonVi));
        if (donViThuInfo.Data.LayCauHinhBienLaiTheoDonViThu == true)
        {
            donViThuInfo = await _mediator.Send(new GetByGroupCodeQuery(yeuCauThanhToan.DonViThu));
        }

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
        requestBienLai.Ma = request.LoaiPhi + "-" + yeuCauThanhToan.Ma;
        requestBienLai.MaHoSo = yeuCauThanhToan.MaHoSo;
        requestBienLai.MaTTHC = yeuCauThanhToan.MaTTHC;
        requestBienLai.ThanhTien = request.LoaiPhi == "phi" ? yeuCauThanhToan.Phi : yeuCauThanhToan.LePhi;
        requestBienLai.NgayThuPhi = yeuCauThanhToan.NgayThuPhi.HasValue ? yeuCauThanhToan.NgayThuPhi.Value : DateTime.Now;
        requestBienLai.LoaiPhi = request.LoaiPhi;
        if (request.LoaiPhi == "phi")
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
        var resEdit = await _bienLaiVNPTServices.SuaBienLaiDienTu(requestBienLai);
        var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(itemExist.MaHoSo, null, null, null, null, userId.ToString(), userFullName, "", "", currentTime, trangThai: "9", thaoTac: "Sửa thông tin biên lai");
        await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
        return Result<string>.Success(resEdit); 
    }
}
