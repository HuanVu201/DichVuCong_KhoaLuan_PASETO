using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.BuocXuLyApp.Commands;
public class AddBuocXuLyCommandHandler : ICommandHandler<AddBuocXuLyCommand, Guid>
{
    private readonly IRepositoryWithEvents<BuocXuLy> _repositoryWithEvents;
    public AddBuocXuLyCommandHandler(IRepositoryWithEvents<BuocXuLy> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddBuocXuLyCommand request, CancellationToken cancellationToken)
    {
        var menu = BuocXuLy.Create(request.TenBuoc);
        await _repositoryWithEvents.AddAsync(menu, cancellationToken);
        return Result<Guid>.Success(menu.Id);
    }
}
