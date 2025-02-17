using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Catalog.QuanLyTaiNguyenApp.Commands;
public class RestoreQuanLyTaiNguyenCommandHandler : ICommandHandler<RestoreQuanLyTaiNguyenCommand>
{
    private readonly IRepositoryWithEvents<QuanLyTaiNguyen> _repositoryWithEvents;
    public RestoreQuanLyTaiNguyenCommandHandler(IRepositoryWithEvents<QuanLyTaiNguyen> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;
    public async Task<Result> Handle(RestoreQuanLyTaiNguyenCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"QuanLyTaiNguyen với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKenhtin = itemExitst.Restore();
        await _repositoryWithEvents.UpdateAsync(updatedKenhtin, cancellationToken);
        return (Result)Result.Success();
    }
}
