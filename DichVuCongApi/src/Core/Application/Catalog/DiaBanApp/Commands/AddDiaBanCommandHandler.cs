using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.DiaBanApp.Commands;
public class AddDiaBanCommandHandler : ICommandHandler<AddDiaBanCommand, Guid>
{
    private readonly IRepositoryWithEvents<DiaBan> _repositoryWithEvents;
    public AddDiaBanCommandHandler(IRepositoryWithEvents<DiaBan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddDiaBanCommand request, CancellationToken cancellationToken)
    {
        var diaBan = DiaBan.Create(request.TenDiaBan, request.MaDiaBan, request.ThuTu, request.Active);
        await _repositoryWithEvents.AddAsync(diaBan, cancellationToken);
        return Result<Guid>.Success(diaBan.Id);
    }
}
