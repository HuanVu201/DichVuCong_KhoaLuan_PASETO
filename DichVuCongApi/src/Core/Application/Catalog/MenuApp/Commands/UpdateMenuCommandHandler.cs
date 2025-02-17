﻿using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.MenuApp.Commands;

public class UpdateMenuCommandHandler : ICommandHandler<UpdateMenuCommand>
{
    private readonly IRepositoryWithEvents<Menu> _repositoryWithEvents;

    public UpdateMenuCommandHandler(IRepositoryWithEvents<Menu> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateMenuCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Menu với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.TenMenu, request.ParentId, request.ThuTuMenu, request.Active, request.Module, request.FullPath, request.IconName, request.Permission, request.IsTopMenu, request.MaScreen);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
