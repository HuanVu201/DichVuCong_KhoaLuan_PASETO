using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.BannerApp.Commands;
public class AddBannerCommandHandler : ICommandHandler<AddBannerCommand, DefaultIdType>
{
    private readonly IRepositoryWithEvents<Banner> _repositoryWithEvents;
    public AddBannerCommandHandler(IRepositoryWithEvents<Banner> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddBannerCommand request, CancellationToken cancellationToken)
    {
        var banner = Banner.Create(request.ImageUrl, request.SuDung);
        await _repositoryWithEvents.AddAsync(banner, cancellationToken);
        return Result<DefaultIdType>.Success(banner.Id);
    }
}
