using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.CauHoiPhoBienApp.Commands;

public class UpdateCauHoiPhoBienCommandHandler : ICommandHandler<UpdateCauHoiPhoBienCommand>
{
    private readonly IRepositoryWithEvents<CauHoiPhoBien> _repositoryWithEvents;

    public UpdateCauHoiPhoBienCommandHandler(IRepositoryWithEvents<CauHoiPhoBien> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateCauHoiPhoBienCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"CauHoiPhoBien với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.TieuDe, request.NoiDungCauHoi,request.NoiDungTraLoi,request.Type);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
