using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.MenuApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.LoaiPhiLePhiApp.Queries;

public class GetLoaiPhiLePhiByIdSpec : Specification<LoaiPhiLePhi>, ISingleResultSpecification
{
    public GetLoaiPhiLePhiByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetLoaiPhiLePhiQueryHandler : IQueryHandler<GetLoaiPhiLePhiQuery, LoaiPhiLePhi>
{
    private readonly IReadRepository<LoaiPhiLePhi> _readRepository;
    public GetLoaiPhiLePhiQueryHandler(IReadRepository<LoaiPhiLePhi> readRepository) => _readRepository = readRepository;
    public async Task<Result<LoaiPhiLePhi>> Handle(GetLoaiPhiLePhiQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetLoaiPhiLePhiByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"LoaiPhiLePhi với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<LoaiPhiLePhi>.Success(item);
    }
}
