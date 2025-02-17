using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.LoaiThuTucApp.Commands;

public class UpdateLoaiThuTucCommandHandler : ICommandHandler<UpdateLoaiThuTucCommand>
{
    private readonly IRepositoryWithEvents<LoaiThuTuc> _repositoryWithEvents;

    public UpdateLoaiThuTucCommandHandler(IRepositoryWithEvents<LoaiThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateLoaiThuTucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"LoaiThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedLoaiThuTuc = itemExitst.Update(request.Ten,request.MoTa,request.ThuTu);
        await _repositoryWithEvents.UpdateAsync(updatedLoaiThuTuc, cancellationToken);
        return (Result)Result.Success();
    }
}
