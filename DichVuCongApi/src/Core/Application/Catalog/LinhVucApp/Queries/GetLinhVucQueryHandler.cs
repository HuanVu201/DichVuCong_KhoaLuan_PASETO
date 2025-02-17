using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.LinhVucApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.LinhVucApp.Queries;

public class GetLinhVucByIdSpec : Specification<LinhVuc>, ISingleResultSpecification
{
    public GetLinhVucByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetLinhVucQueryHandler : IQueryHandler<GetLinhVucQuery, LinhVuc>
{
    private readonly IReadRepository<LinhVuc> _readRepository;
    public GetLinhVucQueryHandler(IReadRepository<LinhVuc> readRepository) => _readRepository = readRepository;
    public async Task<Result<LinhVuc>> Handle(GetLinhVucQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetLinhVucByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"LinhVuc với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<LinhVuc>.Success(item);
    }
}
