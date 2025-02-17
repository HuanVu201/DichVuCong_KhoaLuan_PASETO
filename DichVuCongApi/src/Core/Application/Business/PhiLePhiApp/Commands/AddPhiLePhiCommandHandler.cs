using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.PhiLePhiApp.Commands;
public class AddPhiLePhiCommandHandler : ICommandHandler<AddPhiLePhiCommand, DefaultIdType>
{
    private readonly IRepository<PhiLePhi> _repositoryWithEvents;
    public AddPhiLePhiCommandHandler(IRepository<PhiLePhi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddPhiLePhiCommand request, CancellationToken cancellationToken)
    {
        var phiLePhi = PhiLePhi.Create(request.Ten, request.Ma, request.ThuTucId, request.TruongHopId, request.Loai, request.SoTien, request.MoTa, request.DinhKem);
        await _repositoryWithEvents.AddAsync(phiLePhi, cancellationToken);
        return Result<DefaultIdType>.Success(phiLePhi.Id);
    }
}
