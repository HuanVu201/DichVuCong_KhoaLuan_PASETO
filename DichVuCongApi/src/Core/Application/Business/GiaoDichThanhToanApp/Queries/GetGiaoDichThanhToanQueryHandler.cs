using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiaoDichThanhToanApp.Queries;

public class GetGiaoDichThanhToanByIdSpec : Specification<GiaoDichThanhToan>, ISingleResultSpecification
{
    public GetGiaoDichThanhToanByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetGiaoDichThanhToanQueryHandler : IQueryHandler<GetGiaoDichThanhToanQuery, GiaoDichThanhToan>
{
    private readonly IReadRepository<GiaoDichThanhToan> _readRepository;
    public GetGiaoDichThanhToanQueryHandler(IReadRepository<GiaoDichThanhToan> readRepository) => _readRepository = readRepository;
    public async Task<Result<GiaoDichThanhToan>> Handle(GetGiaoDichThanhToanQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetGiaoDichThanhToanByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"GiaoDichThanhToan với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<GiaoDichThanhToan>.Success(item);
    }
}
