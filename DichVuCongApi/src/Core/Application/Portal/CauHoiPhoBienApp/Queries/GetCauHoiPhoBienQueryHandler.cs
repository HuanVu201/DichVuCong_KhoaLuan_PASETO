using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.CauHoiPhoBienApp.Queries;

public class GetCauHoiPhoBienByIdSpec : Specification<CauHoiPhoBien>, ISingleResultSpecification
{
    public GetCauHoiPhoBienByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetCauHoiPhoBienQueryHandler : IQueryHandler<GetCauHoiPhoBienQuery, CauHoiPhoBien>
{
    private readonly IReadRepository<CauHoiPhoBien> _readRepository;
    public GetCauHoiPhoBienQueryHandler(IReadRepository<CauHoiPhoBien> readRepository) => _readRepository = readRepository;
    public async Task<Result<CauHoiPhoBien>> Handle(GetCauHoiPhoBienQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetCauHoiPhoBienByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"CauHoiPhoBien với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<CauHoiPhoBien>.Success(item);
    }
}
