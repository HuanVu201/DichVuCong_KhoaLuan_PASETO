using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.LoaiPhiLePhiApp.Commands;

public class UpdateLoaiPhiLePhiCommandHandler : ICommandHandler<UpdateLoaiPhiLePhiCommand>
{
    private readonly IRepositoryWithEvents<LoaiPhiLePhi> _repositoryWithEvents;

    public UpdateLoaiPhiLePhiCommandHandler(IRepositoryWithEvents<LoaiPhiLePhi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateLoaiPhiLePhiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Menu với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.Name, request.Ma, request.SuDung);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
