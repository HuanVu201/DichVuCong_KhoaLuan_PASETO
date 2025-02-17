using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.ThongBaoApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThongBaoApp.Queries;

public class GetThongBaoByIdSpec : Specification<ThongBao>, ISingleResultSpecification
{
    public GetThongBaoByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetThongBaoQueryHandler : IQueryHandler<GetThongBaoQuery, ThongBao>
{
    private readonly IReadRepository<ThongBao> _readRepository;
    public GetThongBaoQueryHandler(IReadRepository<ThongBao> readRepository) => _readRepository = readRepository;
    public async Task<Result<ThongBao>> Handle(GetThongBaoQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetThongBaoByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"ThongBao với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<ThongBao>.Success(item);
    }
}
