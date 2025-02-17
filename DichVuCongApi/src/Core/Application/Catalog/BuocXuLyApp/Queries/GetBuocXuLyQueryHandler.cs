using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.BuocXuLyApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.BuocXuLyApp.Queries;

public class GetBuocXuLyByIdSpec : Specification<BuocXuLy>, ISingleResultSpecification
{
    public GetBuocXuLyByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetBuocXuLyQueryHandler : IQueryHandler<GetBuocXuLyQuery, BuocXuLy>
{
    private readonly IReadRepository<BuocXuLy> _readRepository;
    public GetBuocXuLyQueryHandler(IReadRepository<BuocXuLy> readRepository) => _readRepository = readRepository;
    public async Task<Result<BuocXuLy>> Handle(GetBuocXuLyQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetBuocXuLyByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"BuocXuLy với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<BuocXuLy>.Success(item);
    }
}
