using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.KetQuaThuTucApp.Commands;

public class UpdateKetQuaThuTucCommandHandler : ICommandHandler<UpdateKetQuaThuTucCommand>
{
    private readonly IRepository<KetQuaThuTuc> _repositoryWithEvents;

    public UpdateKetQuaThuTucCommandHandler(IRepository<KetQuaThuTuc> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateKetQuaThuTucCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"KetQuaThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");
        var updatedAction = itemExitst.Update(request.MaNhanDienOCR, request.MaKetQua, request.TenKetQua, request.TenTep, request.Url, request.MaTTHC, request.EFormKetQua, request.ThoiHanMacDinh, request.LoaiThoiHan, request.LaThuTucThongDung, request.DinhKemPhoi);
        await _repositoryWithEvents.UpdateAsync(updatedAction, cancellationToken);
        return (Result)Result.Success();
    }
}
