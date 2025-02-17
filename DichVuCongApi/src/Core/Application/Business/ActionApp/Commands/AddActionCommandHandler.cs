﻿using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.ActionApp.Commands;
public class AddActionCommandHandler : ICommandHandler<AddActionCommand, DefaultIdType>
{
    private readonly IRepository<Domain.Business.Action> _repositoryWithEvents;
    public AddActionCommandHandler(IRepository<Domain.Business.Action> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddActionCommand request, CancellationToken cancellationToken)
    {
        var action = new Domain.Business.Action(request.Ten, request.Ma, request.ThuTu, request.Quyen,request.MoTa, request.IconName, request.ColorCode, request.ShowInModal, request.ShowInTable, request.ApplyForUsers, request.ApplyForUserGroups);
        await _repositoryWithEvents.AddAsync(action, cancellationToken);
        return Result<DefaultIdType>.Success(action.Id);
    }
}
