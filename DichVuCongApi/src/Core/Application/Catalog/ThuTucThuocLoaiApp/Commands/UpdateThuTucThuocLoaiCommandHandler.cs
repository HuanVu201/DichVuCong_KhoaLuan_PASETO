using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Commands;

public class UpdateThuTucThuocLoaiCommandHandler : ICommandHandler<UpdateThuTucThuocLoaiCommand>
{
    private readonly IRepositoryWithEvents<ThuTucThuocLoai> _repositoryWithEvents;

    public UpdateThuTucThuocLoaiCommandHandler(IRepositoryWithEvents<ThuTucThuocLoai> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateThuTucThuocLoaiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"ThuTucThuocLoai với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedThuTucThuocLoai = itemExitst.Update(request.ThuTu);
        await _repositoryWithEvents.UpdateAsync(updatedThuTucThuocLoai, cancellationToken);
        return (Result)Result.Success();
    }
}
