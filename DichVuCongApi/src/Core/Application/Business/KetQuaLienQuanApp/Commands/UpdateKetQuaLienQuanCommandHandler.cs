using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.KetQuaLienQuanApp.Commands;

public class UpdateKetQuaLienQuanCommandHandler : ICommandHandler<UpdateKetQuaLienQuanCommand>
{
    private readonly IRepository<KetQuaLienQuan> _repositoryWithEvents;

    public UpdateKetQuaLienQuanCommandHandler(IRepository<KetQuaLienQuan> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateKetQuaLienQuanCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"KetQuaLienQuan với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedAction = itemExitst.Update(request.MaHoSo, request.LoaiKetQua, request.SoKyHieu, request.TrichYeu, request.NgayKy, request.NguoiKy, request.CoQuanBanHanh, request.NgayCoHieuLuc, request.NgayHetHieuLuc, request.TrangThai, request.DinhKem);
        await _repositoryWithEvents.UpdateAsync(updatedAction, cancellationToken);
        return (Result)Result.Success();
    }
}
