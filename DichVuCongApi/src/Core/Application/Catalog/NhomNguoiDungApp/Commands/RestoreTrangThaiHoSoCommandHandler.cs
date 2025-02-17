﻿using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.NhomNguoiDungApp.Commands;
public class RestoreNhomNguoiDungCommandHandler : ICommandHandler<RestoreNhomNguoiDungCommand>
{
    private readonly IRepositoryWithEvents<NhomNguoiDung> _repositoryWithEvents;
    public RestoreNhomNguoiDungCommandHandler(IRepositoryWithEvents<NhomNguoiDung> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreNhomNguoiDungCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"NhomNguoiDung với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
