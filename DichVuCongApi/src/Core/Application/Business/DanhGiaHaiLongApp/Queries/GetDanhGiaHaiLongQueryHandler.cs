using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Queries;

public class GetDanhGiaHaiLongByIdSpec : Specification<DanhGiaHaiLong, DanhGiaHaiLongDetailDto>, ISingleResultSpecification
{
    public GetDanhGiaHaiLongByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetDanhGiaHaiLongQueryHandler : IQueryHandler<GetDanhGiaHaiLongQuery, DanhGiaHaiLongDetailDto>
{
    private readonly IReadRepository<DanhGiaHaiLong> _readRepository;
    public GetDanhGiaHaiLongQueryHandler(IReadRepository<DanhGiaHaiLong> readRepository) => _readRepository = readRepository;
    public async Task<Result<DanhGiaHaiLongDetailDto>> Handle(GetDanhGiaHaiLongQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetDanhGiaHaiLongByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"DanhGiaHaiLong với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<DanhGiaHaiLongDetailDto>.Success(item);
    }
}
