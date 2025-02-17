using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.DSTaiLieuHDSDApp.Queries;

public class GetDSTaiLieuHDSDByIdSpec : Specification<DSTaiLieuHDSD>, ISingleResultSpecification
{
    public GetDSTaiLieuHDSDByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetDSTaiLieuHDSDQueryHandler : IQueryHandler<GetDSTaiLieuHDSDQuery, DSTaiLieuHDSD>
{
    private readonly IReadRepository<DSTaiLieuHDSD> _readRepository;
    public GetDSTaiLieuHDSDQueryHandler(IReadRepository<DSTaiLieuHDSD> readRepository) => _readRepository = readRepository;
    public async Task<Result<DSTaiLieuHDSD>> Handle(GetDSTaiLieuHDSDQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetDSTaiLieuHDSDByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"DSTaiLieuHDSD với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<DSTaiLieuHDSD>.Success(item);
    }
}
