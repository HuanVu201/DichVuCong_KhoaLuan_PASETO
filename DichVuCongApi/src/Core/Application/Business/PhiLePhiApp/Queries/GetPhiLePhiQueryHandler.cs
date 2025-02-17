using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.PhiLePhiApp.Queries;

public class GetPhiLePhiByIdSpec : Specification<PhiLePhi, PhiLePhiDetailDto>, ISingleResultSpecification
{
    public GetPhiLePhiByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetPhiLePhiQueryHandler : IQueryHandler<GetPhiLePhiQuery, PhiLePhiDetailDto>
{
    private readonly IReadRepository<PhiLePhi> _readRepository;
    public GetPhiLePhiQueryHandler(IReadRepository<PhiLePhi> readRepository) => _readRepository = readRepository;
    public async Task<Result<PhiLePhiDetailDto>> Handle(GetPhiLePhiQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetPhiLePhiByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"PhiLePhi với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<PhiLePhiDetailDto>.Success(item);
    }
}
