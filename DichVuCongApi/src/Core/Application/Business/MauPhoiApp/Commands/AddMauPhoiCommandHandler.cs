using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.MauPhoiApp.Commands;

public class AddMauPhoiCommandHandler : ICommandHandler<AddMauPhoiCommand, Guid>
{
    private readonly IRepository<MauPhoi> _repositoryWithEvents;
    public AddMauPhoiCommandHandler(IRepository<MauPhoi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddMauPhoiCommand request, CancellationToken cancellationToken)
    {
        var mauPhoi = MauPhoi.Create(request.LoaiPhoi, request.Code, request.TenMauPhoi, request.MaDonVi, request.MaLinhVuc, request.MaThuTuc, request.UrlMauPhoi, request.HtmlPhoi, request.LaPhoiEmail, request.LaPhoiMacDinh, request.CustomerId);
        await _repositoryWithEvents.AddAsync(mauPhoi, cancellationToken);
        return Result<Guid>.Success(mauPhoi.Id);

    }
}