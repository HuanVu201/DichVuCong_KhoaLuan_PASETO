using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;

public class EditYeuCauThanhToanCommandHandler : ICommandHandler<EditYeuCauThanhToanCommand>
{
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryWithEvents;
    private readonly IUserService _user;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<QuaTrinhXuLyHoSo> _repositoryQuaTrinhXuLyHoSo;
    private readonly YeuCauThanhToanConstants _yeuCauThanhToanConstants;
    private readonly IEventPublisher _eventPublisher;
    private readonly string tenTinhThanh;

    public EditYeuCauThanhToanCommandHandler(IDapperRepository dapperRepository, IRepositoryWithEvents<YeuCauThanhToan> repositoryWithEvents
        , IUserService user, IRepositoryWithEvents<QuaTrinhXuLyHoSo> repositoryQuaTrinhXuLyHoSo
        , IEventPublisher eventPublisher, IInjectConfiguration injectConfiguration)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _user = user;
        _dapperRepository = dapperRepository;
        _repositoryQuaTrinhXuLyHoSo = repositoryQuaTrinhXuLyHoSo;
        _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
        _eventPublisher = eventPublisher;
        tenTinhThanh = injectConfiguration.GetValue<string>("GLOBAL_CONFIG:Tinh_Thanh");
    }
    private class HoSoSelect
    {
        public bool LaHoSoChungThuc { get; set; }
    }
    public async Task<Result> Handle(EditYeuCauThanhToanCommand request, CancellationToken cancellationToken)
    {
        var _currentUser = await _user.GetCurrentUserAsync(cancellationToken);
        var userOfficeCode = _currentUser.OfficeCode;
        var userId = _currentUser.Id;
        var userFullName = _currentUser.FullName;
        var userOfficeName = _currentUser.OfficeName;

        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"YeuCauThanhToan với mã: {request.Id} chưa được thêm vào hệ thống");
        if (!string.IsNullOrEmpty(itemExitst.MaHoSo))
        {
            var sql = @"SELECT Top 1 hs.*, tt.TenTTHC, GroupName as TenDonVi,
                            g.MaDinhDanh as MaDinhDanhDonVi, g.Catalog, g.GroupName, g.OfGroupName, g.SoDienThoai, hs.LaHoSoChungThuc FROM Business.HoSos hs inner join Catalog.Groups g on hs.DonViId = g.GroupCode inner join Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
                            where hs.MaHoSo = @MaHoSo";
            var hoSo = await _dapperRepository.QueryFirstOrDefaultAsync<HoSoQLVB>(sql,
           new
           {
               MaHoSo = itemExitst.MaHoSo
           });
            if (hoSo != null && hoSo.LaHoSoChungThuc == true)
            {
                return (Result)Result.Fail("Không thể sửa phí hồ sơ chứng thực");
            }


            var currentUser = await _user.GetCurrentUserAsync(cancellationToken);
            var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
            int phi = request.Phi.HasValue ? request.Phi.Value : 0;
            int lePhi = request.LePhi.HasValue ? request.LePhi.Value : 0;
            int tongSo = phi + lePhi;
            var updatedTinBai = itemExitst.Update(request.MaHoSo, request.Ma, tongSo, request.Phi, request.LePhi, request.TrangThai, request.NgayYeuCau, request.NguoiYeuCau,
                request.DonViThu, request.HinhThucThanhToan, request.HinhThucThu, request.ChiTiet, request.GhiChuThanhToan, request.MauSoBienLai, request.KyHieuBienLai,
                request.NguoiThuPhi, request.NgayThuPhi, request.DonViThuPhiMaSoThue, request.DonViMaSoThue, request.NgayHoanPhi, request.NguoiHoanPhi,
                request.LyDoHoanPhi, request.NgayHuy, request.NguoiHuy, request.LyDoHuy, null, request.NguoiNopTienBienLai, request.MaSoThueBienLai, request.DiaChiBienLai
                , null, null, request.SoTaiKhoanHoanPhi, request.TenTaiKhoanHoanPhi, null, null);
            await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
            var quaTrinhXuLyHoSo = new QuaTrinhXuLyHoSo(itemExitst.MaHoSo, currentUser.Id.ToString(), currentUser.FullName, null, null, currentTime, "", "Chỉnh sửa yêu cầu thu phí, lệ phí", false);
            await _repositoryQuaTrinhXuLyHoSo.AddAsync(quaTrinhXuLyHoSo);
            if (itemExitst.TrangThai == _yeuCauThanhToanConstants.TRANG_THAI.CHO_THANH_TOAN)
            {
                await _eventPublisher.PublishAsync(new ThongBaoNopPhiEvent(hoSo, itemExitst.HinhThucThu, itemExitst.Phi, request.LePhi.HasValue ? request.LePhi.Value : 0,
                userFullName, userOfficeName, hoSo.Catalog, tenTinhThanh, hoSo.SoDienThoai, itemExitst.Id.ToString()));
            }
        }
        return (Result)Result.Success();
    }
}
