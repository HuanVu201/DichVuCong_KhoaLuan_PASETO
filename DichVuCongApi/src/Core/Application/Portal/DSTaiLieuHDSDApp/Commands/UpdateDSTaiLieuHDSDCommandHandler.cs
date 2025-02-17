using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.DSTaiLieuHDSDApp.Commands;

public class UpdateDSTaiLieuHDSDCommandHandler : ICommandHandler<UpdateDSTaiLieuHDSDCommand>
{
    private readonly IRepositoryWithEvents<DSTaiLieuHDSD> _repositoryWithEvents;

    public UpdateDSTaiLieuHDSDCommandHandler(IRepositoryWithEvents<DSTaiLieuHDSD> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateDSTaiLieuHDSDCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"DSTaiLieuHDSD với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedTinBai = itemExitst.Update(request.ThuTu, request.TenTaiLieu,request.TepDinhKem,request.MoTa,request.NgayDang, request.TaiLieuDanhCho);
        await _repositoryWithEvents.UpdateAsync(updatedTinBai, cancellationToken);
        return (Result)Result.Success();
    }
}
