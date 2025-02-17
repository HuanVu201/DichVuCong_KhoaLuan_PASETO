using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.HoiDapApp.Queries;

public class GetHoiDapByIdSpec : Specification<HoiDap>, ISingleResultSpecification
{
    public GetHoiDapByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetHoiDapQueryHandler : IQueryHandler<GetHoiDapQuery, HoiDap>
{
    private readonly IReadRepository<HoiDap> _readRepository;
    public GetHoiDapQueryHandler(IReadRepository<HoiDap> readRepository) => _readRepository = readRepository;
    public async Task<Result<HoiDap>> Handle(GetHoiDapQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetHoiDapByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"HoiDap với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<HoiDap>.Success(item);
    }
}
