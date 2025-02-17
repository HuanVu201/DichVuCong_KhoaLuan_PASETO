using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.FooterApp.Commands;
public class AddFooterCommandHandler : ICommandHandler<AddFooterCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<Footer> _repositoryWithEvents;
    public AddFooterCommandHandler(IRepositoryWithEvents<Footer> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddFooterCommand request, CancellationToken cancellationToken)
    {
        var footer = Footer.Create(request.TieuDe, request.NoiDung, request.ImageUrl);
        await _repositoryWithEvents.AddAsync(footer, cancellationToken);
        return Result<DefaultIdType>.Success(footer.Id);
    }
}
