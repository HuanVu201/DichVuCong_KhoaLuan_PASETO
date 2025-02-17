using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.LoaiPhiLePhiApp.Commands;
public class AddLoaiPhiLePhiCommandHandler : ICommandHandler<AddLoaiPhiLePhiCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<LoaiPhiLePhi> _repositoryWithEvents;
    public AddLoaiPhiLePhiCommandHandler(IRepositoryWithEvents<LoaiPhiLePhi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddLoaiPhiLePhiCommand request, CancellationToken cancellationToken)
    {
        var menu = LoaiPhiLePhi.Create(request.Ten, request.Ma, request.SuDung);
        await _repositoryWithEvents.AddAsync(menu, cancellationToken);
        return Result<DefaultIdType>.Success(menu.Id);
    }
}
