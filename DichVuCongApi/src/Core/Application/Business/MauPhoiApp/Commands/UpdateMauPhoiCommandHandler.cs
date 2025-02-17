using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;

public class UpdateMauPhoiCommandHandler : ICommandHandler<UpdateMauPhoiCommand>
{
    private readonly IRepository<MauPhoi> _repositoryWithEvents;

    public UpdateMauPhoiCommandHandler(IRepository<MauPhoi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(UpdateMauPhoiCommand request, CancellationToken cancellationToken)
    {
        var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
        if (itemExitst == null)
            throw new NotFoundException($"MauPhoi với mã: {request.Id} chưa được thêm vào hệ thống");

        var updatedMauPhoi = itemExitst.Update(request.LoaiPhoi, request.Code, request.TenMauPhoi, request.MaDonVi, request.MaLinhVuc, request.MaThuTuc, request.UrlMauPhoi, request.HtmlPhoi, request.LaPhoiEmail, request.LaPhoiMacDinh);
        await _repositoryWithEvents.UpdateAsync(updatedMauPhoi, cancellationToken);
        return (Result)Result.Success();
    }
}