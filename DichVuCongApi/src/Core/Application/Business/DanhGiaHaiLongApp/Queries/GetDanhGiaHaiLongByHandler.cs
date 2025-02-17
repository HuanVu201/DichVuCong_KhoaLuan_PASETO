using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Queries;

public class GetDanhGiaHaiLongByMaHoSoSpec : Specification<DanhGiaHaiLong, DanhGiaHaiLongDetailDto>, ISingleResultSpecification
{
    public GetDanhGiaHaiLongByMaHoSoSpec(string maHoSo, string nguoiDanhGia)
    {
        Query.Where(x => x.MaHoSo == maHoSo && x.NguoiDanhGia == nguoiDanhGia);
    }
}

public class GetDanhGiaHaiLongByQueryHandler : IQueryHandler<GetDanhGiaHaiLongBy, DanhGiaHaiLongDetailDto>
{
    private readonly IReadRepository<DanhGiaHaiLong> _readRepository;
    public GetDanhGiaHaiLongByQueryHandler(IReadRepository<DanhGiaHaiLong> readRepository) => _readRepository = readRepository;
    public async Task<Result<DanhGiaHaiLongDetailDto>> Handle(GetDanhGiaHaiLongBy request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetDanhGiaHaiLongByMaHoSoSpec(request.MaHoSo, request.NguoiDanhGia), cancellationToken);
        
        return Result<DanhGiaHaiLongDetailDto>.Success(item);
    }
}
