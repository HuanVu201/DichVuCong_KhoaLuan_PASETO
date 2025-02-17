using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.DanhMucGiayToChungThucApp.Commands;

public class UpdateDanhMucGiayToChungThucCommandHandler : ICommandHandler<UpdateDanhMucGiayToChungThucCommand>
{
    private readonly IRepository<DanhMucGiayToChungThuc> _repositoryWithEvents;

    public UpdateDanhMucGiayToChungThucCommandHandler(IRepository<DanhMucGiayToChungThuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateDanhMucGiayToChungThucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DanhMucGiayToChungThuc với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.Ma, request.Ten, request.SuDung);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
