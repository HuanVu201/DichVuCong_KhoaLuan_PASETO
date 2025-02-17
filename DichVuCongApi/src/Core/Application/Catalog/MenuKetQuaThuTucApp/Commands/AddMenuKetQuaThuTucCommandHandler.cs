using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.MenuKetQuaThuTucApp.Commands;
public class AddMenuKetQuaThuTucCommandHandler : ICommandHandler<AddMenuKetQuaThuTucCommand, Guid>
{
    private readonly IRepositoryWithEvents<MenuKetQuaThuTuc> _repositoryWithEvents;
    public AddMenuKetQuaThuTucCommandHandler(IRepositoryWithEvents<MenuKetQuaThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddMenuKetQuaThuTucCommand request, CancellationToken cancellationToken)
    {
        var menu = new MenuKetQuaThuTuc(request.TenMenu, request.ParentId, request.ThuTuMenu, request.Active, request.IconName, request.MaDonVi, request.MaTTHC, request.Catalog, request.MaKetQuaTTHC);
        await _repositoryWithEvents.AddAsync(menu, cancellationToken);
        return Result<Guid>.Success(menu.Id);
    }
}
