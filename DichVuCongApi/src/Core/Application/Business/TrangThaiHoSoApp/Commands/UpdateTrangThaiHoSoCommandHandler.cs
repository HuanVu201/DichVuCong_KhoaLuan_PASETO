using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TrangThaiHoSoApp.Commands;

public class UpdateTrangThaiHoSoCommandHandler : ICommandHandler<UpdateTrangThaiHoSoCommand>
{
    private readonly IRepositoryWithEvents<TrangThaiHoSo> _repositoryWithEvents;

    public UpdateTrangThaiHoSoCommandHandler(IRepositoryWithEvents<TrangThaiHoSo> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateTrangThaiHoSoCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"TrangThaiHoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTrangThaiHoSo = itemExitst.Update(request.Ten, request.Ma, request.MoTa, request.LaTrangThaiQuyTrinh);
        await _repositoryWithEvents.UpdateAsync(updatedTrangThaiHoSo, cancellationToken);
        return (Result)Result.Success();
    }
}
