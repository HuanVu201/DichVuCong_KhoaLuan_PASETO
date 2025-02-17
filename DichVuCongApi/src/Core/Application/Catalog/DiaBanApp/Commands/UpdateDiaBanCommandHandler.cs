using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp.Commands;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.DiaBanApp.Commands;
public class UpdateDiaBanCommandHandler : ICommandHandler<UpdateDiaBanCommand>
{
    private readonly IRepositoryWithEvents<DiaBan> _repositoryWithEvents;

    public UpdateDiaBanCommandHandler(IRepositoryWithEvents<DiaBan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateDiaBanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Địa bàn với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedDiaBan = itemExitst.Update(request.TenDiaBan, request.MaDiaBan, request.ThuTu, request.Active,request.MaTinh,request.MaHuyen,request.MaXa);
        await _repositoryWithEvents.UpdateAsync(updatedDiaBan, cancellationToken);
        return (Result)Result.Success();
    }
}
