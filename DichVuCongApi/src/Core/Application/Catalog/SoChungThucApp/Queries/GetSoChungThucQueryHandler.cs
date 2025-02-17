using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Queries;
using TD.DichVuCongApi.Application.Catalog.SoChungThucApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.SoChungThucApp.Queries;

public class GetSoChungThucByIdSpec : Specification<SoChungThuc>, ISingleResultSpecification
{
    public GetSoChungThucByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id)
            .Where(x => x.DeletedOn == null).AsNoTracking();

    }
}

public class GetSoChungThucByIdsSpec: Specification<SoChungThuc>
{
    public GetSoChungThucByIdsSpec(List<Guid> Ids)
    {
        Query.Where(x => Ids.Contains(x.Id))
            .Where(x => x.DeletedOn == null).
            Where(x => x.NgayBatDau <= DateTime.Now && x.NgayDongSo >= DateTime.Now);
    }
}

public class GetSoChungThucQueryHandler : IQueryHandler<GetSoChungThucQuery, SoChungThuc>
{
    private readonly IReadRepository<SoChungThuc> _readRepository;
    public GetSoChungThucQueryHandler(IReadRepository<SoChungThuc> readRepository) => _readRepository = readRepository;
    public async Task<Result<SoChungThuc>> Handle(GetSoChungThucQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetSoChungThucByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Sổ chứng thực với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<SoChungThuc>.Success(item);
    }
}
