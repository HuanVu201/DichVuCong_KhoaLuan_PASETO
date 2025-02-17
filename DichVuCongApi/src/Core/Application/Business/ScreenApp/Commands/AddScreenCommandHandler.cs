using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ScreenApp.Commands;
public class AddScreenCommandHandler : ICommandHandler<AddScreenCommand, DefaultIdType>
{
    private readonly IRepository<Screen> _repositoryWithEvents;
    public AddScreenCommandHandler(IRepository<Screen> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddScreenCommand request, CancellationToken cancellationToken)
    {
        var screen = new Screen(request.MoTa, request.Ma, request.ShowActionInModal, request.ShowActionInTable);
        await _repositoryWithEvents.AddAsync(screen, cancellationToken);
        return Result<DefaultIdType>.Success(screen.Id);
    }
}
