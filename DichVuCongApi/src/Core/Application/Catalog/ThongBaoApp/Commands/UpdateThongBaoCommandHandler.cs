using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThongBaoApp.Commands;

public class UpdateThongBaoCommandHandler : ICommandHandler<UpdateThongBaoCommand>
{
    private readonly IRepositoryWithEvents<ThongBao> _repositoryWithEvents;

    public UpdateThongBaoCommandHandler(IRepositoryWithEvents<ThongBao> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateThongBaoCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ThongBao với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedThongBao = itemExitst.Update(request.TieuDe, request.NoiDung, request.TepDinhKem, request.DonViId, request.ToanHeThong, request.QuanTrong, request.SuDung);
        await _repositoryWithEvents.UpdateAsync(updatedThongBao, cancellationToken);
        return (Result)Result.Success();
    }
}
