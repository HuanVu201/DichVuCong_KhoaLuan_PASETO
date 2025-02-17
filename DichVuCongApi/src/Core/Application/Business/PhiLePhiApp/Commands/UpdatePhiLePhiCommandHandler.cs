using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.PhiLePhiApp.Commands;

public class UpdatePhiLePhiCommandHandler : ICommandHandler<UpdatePhiLePhiCommand>
{
    private readonly IRepository<PhiLePhi> _repositoryWithEvents;

    public UpdatePhiLePhiCommandHandler(IRepository<PhiLePhi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdatePhiLePhiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"PhiLePhi với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.Ten, request.Ma, request.ThuTucId, request.TruongHopId, request.Loai, request.SoTien, request.MoTa, request.DinhKem);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
