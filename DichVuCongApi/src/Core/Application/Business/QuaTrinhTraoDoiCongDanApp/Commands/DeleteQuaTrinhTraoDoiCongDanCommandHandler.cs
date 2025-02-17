using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.Commands;
public class DeleteKetQuaLienQuanCommandHandler : ICommandHandler<DeleteQuaTrinhTraoDoiCongDanCommand>
{
    private readonly IRepositoryWithEvents<QuaTrinhTraoDoiCongDan> _repositoryWithEvents;
    public DeleteKetQuaLienQuanCommandHandler(IRepositoryWithEvents<QuaTrinhTraoDoiCongDan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(DeleteQuaTrinhTraoDoiCongDanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"QuaTrinhTraoDoiCongDan với mã: {request.Id} chưa được thêm vào hệ thống");
        //await _repositoryWithEvents.DeleteAsync(itemExitst);
        return (Result)Result.Success();
    }
}
