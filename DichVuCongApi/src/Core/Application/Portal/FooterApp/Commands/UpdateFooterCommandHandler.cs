using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.FooterApp.Commands;

public class UpdateFooterCommandHandler : ICommandHandler<UpdateFooterCommand>
{
    private readonly IRepositoryWithEvents<Footer> _repositoryWithEvents;

    public UpdateFooterCommandHandler(IRepositoryWithEvents<Footer> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateFooterCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Footer với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.TieuDe,request.NoiDung,request.ImageUrl);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
