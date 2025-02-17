using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Commands;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Commands;
public class UpdateMaVanDonBuuDienCommandHandler : ICommandHandler<UpdateMaVanDonBuuDienCommand>
{
    private readonly IRepositoryWithEvents<MaVanDonBuuDien> _repositoryWithEvents;

    public UpdateMaVanDonBuuDienCommandHandler(IRepositoryWithEvents<MaVanDonBuuDien> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateMaVanDonBuuDienCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Mã vẫn đơn với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedMaVanDonBuuDien = itemExitst.Update(request.Ma,request.TrangThai,request.HoSo,request.NgayYeuCau);
        await _repositoryWithEvents.UpdateAsync(updatedMaVanDonBuuDien, cancellationToken);
        return (Result)Result.Success();
    }
}
