using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.MenuKetQuaThuTucApp.Commands;

public class UpdateMenuKetQuaThuTucCommandHandler : ICommandHandler<UpdateMenuKetQuaThuTucCommand>
{
    private readonly IRepositoryWithEvents<MenuKetQuaThuTuc> _repositoryWithEvents;

    public UpdateMenuKetQuaThuTucCommandHandler(IRepositoryWithEvents<MenuKetQuaThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateMenuKetQuaThuTucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Menu với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.TenMenu, request.ParentId, request.ThuTuMenu, request.Active, request.IconName, request.MaDonVi, request.MaTTHC, request.QueryStringParams, request.Catalog, request.MaKetQuaTTHC);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
