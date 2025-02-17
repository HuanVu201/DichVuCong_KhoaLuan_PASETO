using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.KhoTaiLieuDienTuApp.Commands;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.KhoTaiLieuDienTuApp.Commands;

public class RestoreKhoTaiLieuDienTuCommandHandler : ICommandHandler<RestoreKhoTaiLieuDienTuCommand>
{
    private readonly IRepositoryWithEvents<KhoTaiLieuDienTu> _repositoryWithEvents;
    public RestoreKhoTaiLieuDienTuCommandHandler(IRepositoryWithEvents<KhoTaiLieuDienTu> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreKhoTaiLieuDienTuCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"KhoTaiLieuDienTu với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}