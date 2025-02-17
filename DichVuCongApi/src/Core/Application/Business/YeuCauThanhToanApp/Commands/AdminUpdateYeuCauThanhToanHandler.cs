using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp.Commands;
internal class AdminUpdateYeuCauThanhToanHandler : ICommandHandler<AdminUpdateYeuCauThanhToan>
{
    private readonly IRepositoryWithEvents<YeuCauThanhToan> _repositoryWithEvents;
    public AdminUpdateYeuCauThanhToanHandler(IRepositoryWithEvents<YeuCauThanhToan> repositoryWithEvents) {
        _repositoryWithEvents = repositoryWithEvents;
    }
    public async Task<Result> Handle(AdminUpdateYeuCauThanhToan request, CancellationToken cancellationToken)
    {
        if (request == null) throw new ArgumentNullException(nameof(request));
        if (request.Id == null) throw new ArgumentNullException(nameof(request.Id));
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"YeuCauThanhToan với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.AdminUpdate(request.MaHoSo, request.Ma, request.SoTien, request.Phi, request.LePhi, request.TrangThai, request.NgayYeuCau, request.NguoiYeuCau,
            request.DonViThu, request.HinhThucThanhToan, request.HinhThucThu, request.ChiTiet, request.GhiChuThanhToan, request.MauSoBienLai, request.KyHieuBienLai,
            request.NguoiThuPhi, request.NgayThuPhi, request.DonViThuPhiMaSoThue, request.DonViMaSoThue, request.NgayHoanPhi, request.NguoiHoanPhi,
            request.LyDoHoanPhi, request.NgayHuy, request.NguoiHuy, request.LyDoHuy);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
