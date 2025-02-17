using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Commands;
public class AddMaVanDonBuuDienCommandHandler : ICommandHandler<AddMaVanDonBuuDienCommand, Guid>
{
    private readonly IRepositoryWithEvents<MaVanDonBuuDien> _repositoryWithEvents;
    public AddMaVanDonBuuDienCommandHandler(IRepositoryWithEvents<MaVanDonBuuDien> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddMaVanDonBuuDienCommand request, CancellationToken cancellationToken)
    {
        var diaBan = MaVanDonBuuDien.Create(request.Ma, request.TrangThai, request.HoSo, request.NgayYeuCau);
        await _repositoryWithEvents.AddAsync(diaBan, cancellationToken);
        return Result<Guid>.Success(diaBan.Id);
    }
}
