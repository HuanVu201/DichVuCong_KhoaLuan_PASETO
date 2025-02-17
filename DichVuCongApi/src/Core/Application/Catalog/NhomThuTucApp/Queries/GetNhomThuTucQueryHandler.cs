using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.NhomThuTucApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.NhomThuTucApp.Queries;

public class GetNhomThuTucByIdSpec : Specification<NhomThuTuc>, ISingleResultSpecification
{
    public GetNhomThuTucByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetNhomThuTucQueryHandler : IQueryHandler<GetNhomThuTucQuery, NhomThuTuc>
{
    private readonly IReadRepository<NhomThuTuc> _readRepository;
    public GetNhomThuTucQueryHandler(IReadRepository<NhomThuTuc> readRepository) => _readRepository = readRepository;
    public async Task<Result<NhomThuTuc>> Handle(GetNhomThuTucQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetNhomThuTucByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"NhomThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<NhomThuTuc>.Success(item);
    }
}
