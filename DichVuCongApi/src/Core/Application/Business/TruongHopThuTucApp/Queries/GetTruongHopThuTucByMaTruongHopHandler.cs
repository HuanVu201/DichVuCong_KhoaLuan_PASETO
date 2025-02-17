using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;

public class GetTruongHopThuTucByMaTruongHopSpec : Specification<TruongHopThuTuc>, ISingleResultSpecification
{
    public GetTruongHopThuTucByMaTruongHopSpec(string MaTruongHop)
    {
        Query.Where(x => x.Ma == MaTruongHop);
    }
}

public class GetTruongHopThuTucByMaTruongHopHandler : IQueryHandler<GetTruongHopThuTucByMaTruongHop, TruongHopThuTuc>
{
    private readonly IReadRepository<TruongHopThuTuc> _readRepository;
    public GetTruongHopThuTucByMaTruongHopHandler(IReadRepository<TruongHopThuTuc> readRepository) => _readRepository = readRepository;
    public async Task<Result<TruongHopThuTuc>> Handle(GetTruongHopThuTucByMaTruongHop request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetTruongHopThuTucByMaTruongHopSpec(request.MaTruongHop), cancellationToken);
        if (item == null)
            throw new NotFoundException($"TruongHopThuTuc với mã: {request.MaTruongHop} chưa được thêm vào hệ thống");
        return Result<TruongHopThuTuc>.Success(item);
    }
}
