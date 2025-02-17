using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.ConfigApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;

public class GetConfigByIdSpec : Specification<Config>, ISingleResultSpecification
{
    public GetConfigByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetConfigQueryHandler : IQueryHandler<GetConfigQuery, Config>
{
    private readonly IReadRepository<Config> _readRepository;
    public GetConfigQueryHandler(IReadRepository<Config> readRepository) => _readRepository = readRepository;
    public async Task<Result<Config>> Handle(GetConfigQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetConfigByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Cấu hình với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<Config>.Success(item);
    }
}
