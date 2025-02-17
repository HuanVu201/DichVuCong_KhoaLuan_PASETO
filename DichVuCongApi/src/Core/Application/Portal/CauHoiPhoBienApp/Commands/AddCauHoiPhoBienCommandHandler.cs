using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.CauHoiPhoBienApp.Commands;
public class AddCauHoiPhoBienCommandHandler : ICommandHandler<AddCauHoiPhoBienCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<CauHoiPhoBien> _repositoryWithEvents;
    public AddCauHoiPhoBienCommandHandler(IRepositoryWithEvents<CauHoiPhoBien> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddCauHoiPhoBienCommand request, CancellationToken cancellationToken)
    {
        var cauHoiPhoBien = CauHoiPhoBien.Create(request.TieuDe, request.NoiDungCauHoi,request.NoiDungTraLoi,request.Type);
        await _repositoryWithEvents.AddAsync(cauHoiPhoBien, cancellationToken);
        return Result<DefaultIdType>.Success(cauHoiPhoBien.Id);
    }
}
