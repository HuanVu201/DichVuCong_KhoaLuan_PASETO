using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Queries;
using TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Queries;

public class GetMaVanDonBuuDienByIdSpec : Specification<MaVanDonBuuDien>, ISingleResultSpecification
{
    public GetMaVanDonBuuDienByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetMaVanDonBuuDienQueryHandler : IQueryHandler<GetMaVanDonBuuDienQuery, MaVanDonBuuDien>
{
    private readonly IReadRepository<MaVanDonBuuDien> _readRepository;
    public GetMaVanDonBuuDienQueryHandler(IReadRepository<MaVanDonBuuDien> readRepository) => _readRepository = readRepository;
    public async Task<Result<MaVanDonBuuDien>> Handle(GetMaVanDonBuuDienQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetMaVanDonBuuDienByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Mã vận đơn với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<MaVanDonBuuDien>.Success(item);
    }
}
