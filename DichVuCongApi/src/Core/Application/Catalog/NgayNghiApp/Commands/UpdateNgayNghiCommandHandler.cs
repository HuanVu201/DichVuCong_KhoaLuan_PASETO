using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.NgayNghiApp.Commands;

public class UpdateNgayNghiCommandHandler : ICommandHandler<UpdateNgayNghiCommand>
{
    private readonly IRepositoryWithEvents<NgayNghi> _repositoryWithEvents;

    public UpdateNgayNghiCommandHandler(IRepositoryWithEvents<NgayNghi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateNgayNghiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"NgayNghi với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.Date, request.Description);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
