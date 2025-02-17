using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.PhienBanGiayToSoHoaKhoTaiLieuDienTuApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.PhienBanGiayToSoHoaPhienBanGiayToSoHoaKhoTaiLieuDienTuApp.Commands;
public class RestorePhienBanGiayToSoHoaKhoTaiLieuDienTuCommandHandler : ICommandHandler<RestorePhienBanGiayToSoHoaKhoTaiLieuDienTuCommand>
{
    private readonly IRepositoryWithEvents<PhienBanGiayToSoHoaKhoTaiLieuDienTu> _repositoryWithEvents;
    public RestorePhienBanGiayToSoHoaKhoTaiLieuDienTuCommandHandler(IRepositoryWithEvents<PhienBanGiayToSoHoaKhoTaiLieuDienTu> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestorePhienBanGiayToSoHoaKhoTaiLieuDienTuCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"PhienBanGiayToSoHoaKhoTaiLieuDienTu với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}