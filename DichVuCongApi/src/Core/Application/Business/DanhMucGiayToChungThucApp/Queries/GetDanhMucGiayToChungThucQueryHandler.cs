using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.DanhMucGiayToChungThucApp.Queries;

public class GetDanhMucGiayToChungThucByIdSpec : Specification<DanhMucGiayToChungThuc>, ISingleResultSpecification
{
    public GetDanhMucGiayToChungThucByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetDanhMucGiayToChungThucQueryHandler : IQueryHandler<GetDanhMucGiayToChungThucQuery, DanhMucGiayToChungThuc>
{
    private readonly IReadRepository<DanhMucGiayToChungThuc> _readRepository;
    public GetDanhMucGiayToChungThucQueryHandler(IReadRepository<DanhMucGiayToChungThuc> readRepository) => _readRepository = readRepository;
    public async Task<Result<DanhMucGiayToChungThuc>> Handle(GetDanhMucGiayToChungThucQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetDanhMucGiayToChungThucByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"DanhMucGiayToChungThuc với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<DanhMucGiayToChungThuc>.Success(item);
    }
}
