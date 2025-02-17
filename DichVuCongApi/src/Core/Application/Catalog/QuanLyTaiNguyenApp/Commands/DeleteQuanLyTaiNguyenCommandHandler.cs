using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Catalog.QuanLyTaiNguyenApp.Commands;
public class DeleteQuanLyTaiNguyenCommandHandler : ICommandHandler<DeleteQuanLyTaiNguyenCommand>
{
    private readonly IRepositoryWithEvents<QuanLyTaiNguyen> _repositoryWithEvents;
    public DeleteQuanLyTaiNguyenCommandHandler(IRepositoryWithEvents<QuanLyTaiNguyen> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteQuanLyTaiNguyenCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"QuanLyTaiNguyen với mã: {request.Id} chưa được thêm vào hệ thống");
        //if (request.ForceDelete)
        //    await _repositoryWithEvents.DeleteAsync(itemExitst);
        var updatedItem = itemExitst.SoftDelete();
        await _repositoryWithEvents.UpdateAsync(updatedItem);
        return (Result)Result.Success();
    }
}
