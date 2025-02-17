using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanThuTucApp.Queries;

public class GetThanhPhanThuTucByIdSpec : Specification<ThanhPhanThuTuc>, ISingleResultSpecification
{
    public GetThanhPhanThuTucByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}
public class GetThanhPhanThuTucByMaTTHCSpec : Specification<ThanhPhanThuTuc>
{
    public GetThanhPhanThuTucByMaTTHCSpec(string maTruongHopThuTuc)
    {
        Query.Where(x => x.TruongHopId == maTruongHopThuTuc);
    }
}


public class GetThanhPhanThuTucQueryHandler : IQueryHandler<GetThanhPhanThuTucQuery, ThanhPhanThuTuc>
{
    private readonly IReadRepository<ThanhPhanThuTuc> _readRepository;
    public GetThanhPhanThuTucQueryHandler(IReadRepository<ThanhPhanThuTuc> readRepository) => _readRepository = readRepository;
    public async Task<Result<ThanhPhanThuTuc>> Handle(GetThanhPhanThuTucQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetThanhPhanThuTucByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"ThanhPhanThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<ThanhPhanThuTuc>.Success(item);
    }
}
