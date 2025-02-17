using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
public class AddYeuCauThanhToanCommandHandler : ICommandHandler<AddYeuCauThanhToanCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryWithEvents;
    public AddYeuCauThanhToanCommandHandler(IRepositoryWithEvents<YeuCauThanhToan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddYeuCauThanhToanCommand request, CancellationToken cancellationToken)
    {
        var yeuCauThanhToan = new YeuCauThanhToan(request.MaHoSo, request.Ma, request.SoTien, request.Phi, request.LePhi, request.TrangThai, request.NgayYeuCau, request.NguoiYeuCau,
            request.DonViThu, request.HinhThucThanhToan, request.HinhThucThu, request.ChiTiet, request.GhiChuThanhToan, request.MauSoBienLai, request.KyHieuBienLai,
            request.NguoiThuPhi, request.NgayThuPhi, request.DonViThuPhiMaSoThue, request.DonViMaSoThue, request.NgayHoanPhi, request.NguoiHoanPhi,
            request.LyDoHoanPhi, request.NgayHuy, request.NguoiHuy, request.LyDoHuy,request.DonVi);

        await _repositoryWithEvents.AddAsync(yeuCauThanhToan, cancellationToken);
        return Result<DefaultIdType>.Success(yeuCauThanhToan.Id);
    }
}
