using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.BuocXuLyApp.Commands;

public class UpdateBuocXuLyCommandHandler : ICommandHandler<UpdateBuocXuLyCommand>
{
    private readonly IRepositoryWithEvents<BuocXuLy> _repositoryWithEvents;

    public UpdateBuocXuLyCommandHandler(IRepositoryWithEvents<BuocXuLy> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateBuocXuLyCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"BuocXuLy với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.TenBuoc);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
