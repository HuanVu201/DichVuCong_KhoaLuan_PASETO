using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.PhienBanGiayToSoHoaKhoTaiLieuDienTuApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.PhienBanGiayToSoHoaPhienBanGiayToSoHoaKhoTaiLieuDienTuApp.Commands;
public class UpdatePhienBanGiayToSoHoaKhoTaiLieuDienTuCommandHandler : ICommandHandler<UpdatePhienBanGiayToSoHoaKhoTaiLieuDienTuCommand>
{
    private readonly IRepositoryWithEvents<PhienBanGiayToSoHoaKhoTaiLieuDienTu> _repositoryWithEvents;

    public UpdatePhienBanGiayToSoHoaKhoTaiLieuDienTuCommandHandler(IRepositoryWithEvents<PhienBanGiayToSoHoaKhoTaiLieuDienTu> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdatePhienBanGiayToSoHoaKhoTaiLieuDienTuCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"PhienBanGiayToSoHoaKhoTaiLieuDienTu với mã: {request.Id} chưa được thêm vào hệ thống");

        var updatedPhienBanGiayToSoHoaKhoTaiLieuDienTu = itemExitst.Update(request.KhoTaiLieuDienTuId, request.MaHoSo, request.DinhKem, request.MaGiayTo, request.DungLuong);
        await _repositoryWithEvents.UpdateAsync(updatedPhienBanGiayToSoHoaKhoTaiLieuDienTu, cancellationToken);
        return (Result)Result.Success();
    }
}