using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.FooterApp.Queries;

public class GetFooterByIdSpec : Specification<Footer>, ISingleResultSpecification
{
    public GetFooterByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetFooterQueryHandler : IQueryHandler<GetFooterQuery, Footer>
{
    private readonly IReadRepository<Footer> _readRepository;
    public GetFooterQueryHandler(IReadRepository<Footer> readRepository) => _readRepository = readRepository;
    public async Task<Result<Footer>> Handle(GetFooterQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetFooterByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Footer với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<Footer>.Success(item);
    }
}
