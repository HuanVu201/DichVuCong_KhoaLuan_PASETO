using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.BannerApp.Queries;

public class GetBannerByIdSpec : Specification<Banner>, ISingleResultSpecification
{
    public GetBannerByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetBannerQueryHandler : IQueryHandler<GetBannerQuery, Banner>
{
    private readonly IReadRepository<Banner> _readRepository;
    public GetBannerQueryHandler(IReadRepository<Banner> readRepository) => _readRepository = readRepository;
    public async Task<Result<Banner>> Handle(GetBannerQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetBannerByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Banner với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<Banner>.Success(item);
    }
}
