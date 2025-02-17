using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;

public class UpdateYeuCauThanhToanCommandHandler : ICommandHandler<UpdateYeuCauThanhToanCommand>
{
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryWithEvents;

    public UpdateYeuCauThanhToanCommandHandler(IRepositoryWithEvents<YeuCauThanhToan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateYeuCauThanhToanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"YeuCauThanhToan với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.MaHoSo, request.Ma, request.SoTien, request.Phi, request.LePhi, request.TrangThai, request.NgayYeuCau, request.NguoiYeuCau,
            request.DonViThu, request.HinhThucThanhToan, request.HinhThucThu, request.ChiTiet, request.GhiChuThanhToan, request.MauSoBienLai, request.KyHieuBienLai,
            request.NguoiThuPhi, request.NgayThuPhi, request.DonViThuPhiMaSoThue, request.DonViMaSoThue, request.NgayHoanPhi, request.NguoiHoanPhi,
            request.LyDoHoanPhi, request.NgayHuy, request.NguoiHuy, request.LyDoHuy,null,request.NguoiNopTienBienLai,request.MaSoThueBienLai,request.DiaChiBienLai
            ,null,null,request.SoTaiKhoanHoanPhi,request.TenTaiKhoanHoanPhi,request.TenNganHangHoanPhi,request.SoGiayToNguoiNopTienBienLai
            ,request.SoBienLai,request.EmailNguoiNopTienBienLai,request.SoDienThoaiNguoiNopTienBienLai,request.MaNganHangGiaoDich,request.MaGiaoDich,request.MaThamChieuGiaoDich);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
