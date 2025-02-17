using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Queries;
using TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.MaVanDonBuuDienApp.Queries;

public class GetMaVanDonBuuDienByMaHoSoSpec : Specification<MaVanDonBuuDien>, ISingleResultSpecification
{
    public GetMaVanDonBuuDienByMaHoSoSpec(string maHoSo)
    {
        Query.Where(x => x.HoSo == maHoSo && x.DeletedOn == null);
    }
}

public class GetMaVanDonBuuDienByMaHoSoHandler : IQueryHandler<GetMaVanDonBuuDienByMaHoSo, MaVanDonBuuDien>
{
    private readonly IReadRepository<MaVanDonBuuDien> _readRepository;
    public GetMaVanDonBuuDienByMaHoSoHandler(IReadRepository<MaVanDonBuuDien> readRepository) => _readRepository = readRepository;
    public async Task<Result<MaVanDonBuuDien>> Handle(GetMaVanDonBuuDienByMaHoSo request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetMaVanDonBuuDienByMaHoSoSpec(request.maHoSo), cancellationToken);
        return Result<MaVanDonBuuDien>.Success(item);
    }
}
