using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Queries;

public class GetDanhGiaHaiLongByMaHoSoMaHoSoSpec : Specification<DanhGiaHaiLong, DanhGiaHaiLongDetailDto>, ISingleResultSpecification
{
    public GetDanhGiaHaiLongByMaHoSoMaHoSoSpec(string maHoSo)
    {
        Query.Where(x => x.MaHoSo == maHoSo);
    }
}

public class GetDanhGiaHaiLongByMaHoSoQueryHandler : IQueryHandler<GetDanhGiaHaiLongByMaHoSo, DanhGiaHaiLongDetailDto>
{
    private readonly IReadRepository<DanhGiaHaiLong> _readRepository;
    public GetDanhGiaHaiLongByMaHoSoQueryHandler(IReadRepository<DanhGiaHaiLong> readRepository) => _readRepository = readRepository;
    public async Task<Result<DanhGiaHaiLongDetailDto>> Handle(GetDanhGiaHaiLongByMaHoSo request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetDanhGiaHaiLongByMaHoSoMaHoSoSpec(request.MaHoSo), cancellationToken);
        
        return Result<DanhGiaHaiLongDetailDto>.Success(item);
    }
}
