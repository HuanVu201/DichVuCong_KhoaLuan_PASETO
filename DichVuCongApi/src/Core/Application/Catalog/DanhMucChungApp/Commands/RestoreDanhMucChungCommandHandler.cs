using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.DanhMucChungApp.Commands;
public class RestoreDanhMucChungCommandHandler : ICommandHandler<RestoreDanhMucChungCommand>
{
    private readonly IRepositoryWithEvents<DanhMucChung> _repositoryWithEvents;
    public RestoreDanhMucChungCommandHandler(IRepositoryWithEvents<DanhMucChung> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreDanhMucChungCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Danh mục chung với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedDanhMucChung = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedDanhMucChung, cancellationToken);
        return (Result)Result.Success();
    }
}
