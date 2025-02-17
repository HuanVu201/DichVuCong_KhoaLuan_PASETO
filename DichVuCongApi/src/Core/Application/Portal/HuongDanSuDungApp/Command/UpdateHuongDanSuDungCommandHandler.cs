using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.HuongDanSuDungApp.Commands;

public class UpdateHuongDanSuDungCommandHandler : ICommandHandler<UpdateHuongDanSuDungCommand>
{
    private readonly IRepositoryWithEvents<HuongDanSuDung> _repositoryWithEvents;

    public UpdateHuongDanSuDungCommandHandler(IRepositoryWithEvents<HuongDanSuDung> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateHuongDanSuDungCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"HuongDanSuDung với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.TenHuongDanSuDung,request.NoiDungHuongDanSuDung,request.ThuTu);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
