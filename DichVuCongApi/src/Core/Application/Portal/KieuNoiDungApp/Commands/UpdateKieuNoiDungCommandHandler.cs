using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.KieuNoiDungApp.Commands;
public class UpdateLoaiDichVuCommandHandler : ICommandHandler<UpdateKieuNoiDungCommand>
{
    private readonly IRepositoryWithEvents<KieuNoiDung> _repositoryWithEvents;
    public UpdateLoaiDichVuCommandHandler(IRepositoryWithEvents<KieuNoiDung> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateKieuNoiDungCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"Kiểu nội dung với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedKieuNoiDung = itemExitst.Update(request.TenNoiDung, request.ChoPhepNhapNoiDung, request.ChoPhepNhapLoaiLienKet, request.ChoPhepNhapTinBai);
        await _repositoryWithEvents.UpdateAsync(updatedKieuNoiDung, cancellationToken);
        return (Result)Result.Success();
    }
}
