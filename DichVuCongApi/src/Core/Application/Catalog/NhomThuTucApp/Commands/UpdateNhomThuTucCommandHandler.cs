using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.NhomThuTucApp.Commands;

public class UpdateNhomThuTucCommandHandler : ICommandHandler<UpdateNhomThuTucCommand>
{
    private readonly IRepositoryWithEvents<NhomThuTuc> _repositoryWithEvents;

    public UpdateNhomThuTucCommandHandler(IRepositoryWithEvents<NhomThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateNhomThuTucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"NhomThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedNhomThuTuc = itemExitst.Update(request.Ten, request.MoTa,request.Icon,request.MauSac,request.DoiTuong,request.ThuTu);
        await _repositoryWithEvents.UpdateAsync(updatedNhomThuTuc, cancellationToken);
        return (Result)Result.Success();
    }
}
