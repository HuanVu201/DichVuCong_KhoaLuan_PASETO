using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.LinhVucApp.Commands;

public class UpdateLinhVucCommandHandler : ICommandHandler<UpdateLinhVucCommand>
{
    private readonly IRepositoryWithEvents<LinhVuc> _repositoryWithEvents;

    public UpdateLinhVucCommandHandler(IRepositoryWithEvents<LinhVuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateLinhVucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"LinhVuc với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedLinhVuc = itemExitst.Update(request.Ten, request.Ma, request.MaNganh, request.SuDung, request.SoLuongThuTuc, request.SoLuongThuTucCapTinh, request.SoLuongThuTucCapHuyen, request.SoLuongThuTucCapXa);
        await _repositoryWithEvents.UpdateAsync(updatedLinhVuc, cancellationToken);
        return (Result)Result.Success();
    }
}
