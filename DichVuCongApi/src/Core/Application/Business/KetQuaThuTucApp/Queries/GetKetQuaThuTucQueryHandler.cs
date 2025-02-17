using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.KetQuaThuTucApp.Queries;

public class GetKetQuaThuTucByIdSpec : Specification<KetQuaThuTuc>, ISingleResultSpecification
{
    public GetKetQuaThuTucByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetKetQuaThuTucQueryHandler : IQueryHandler<GetKetQuaThuTucQuery, KetQuaThuTuc>
{
    private readonly IReadRepository<KetQuaThuTuc> _readRepository;
    public GetKetQuaThuTucQueryHandler(IReadRepository<KetQuaThuTuc> readRepository) => _readRepository = readRepository;
    public async Task<Result<KetQuaThuTuc>> Handle(GetKetQuaThuTucQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetKetQuaThuTucByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"KetQuaThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<KetQuaThuTuc>.Success(item);
    }
}
