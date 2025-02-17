using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.NgayNghiApp.Commands;
public class RestoreNgayNghiCommandHandler : ICommandHandler<RestoreNgayNghiCommand>
{
    private readonly IRepositoryWithEvents<NgayNghi> _repositoryWithEvents;
    public RestoreNgayNghiCommandHandler(IRepositoryWithEvents<NgayNghi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreNgayNghiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"NgayNghi với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
