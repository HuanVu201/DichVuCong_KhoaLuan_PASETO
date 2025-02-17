using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.Commands;

public class UpdateQuaTrinhTraoDoiCongDanCommandHandler : ICommandHandler<UpdateQuaTrinhTraoDoiCongDanCommand>
{
    private readonly IRepositoryWithEvents<QuaTrinhTraoDoiCongDan> _repositoryWithEvents;

    public UpdateQuaTrinhTraoDoiCongDanCommandHandler(IRepositoryWithEvents<QuaTrinhTraoDoiCongDan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateQuaTrinhTraoDoiCongDanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"QuaTrinhTraoDoiCongDan với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedAction = itemExitst.Update(request.MaHoSo, request.NguoiGuiTraoDoi, request.NgayGui, request.NoiDungTraoDoi, request.Email, request.SMS, request.Zalo);
        await _repositoryWithEvents.UpdateAsync(updatedAction, cancellationToken);
        return (Result)Result.Success();
    }
}
