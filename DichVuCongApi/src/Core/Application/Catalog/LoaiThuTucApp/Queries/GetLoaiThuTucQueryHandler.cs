using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.LoaiThuTucApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.LoaiThuTucApp.Queries;

public class GetLoaiThuTucByIdSpec : Specification<LoaiThuTuc>, ISingleResultSpecification
{
    public GetLoaiThuTucByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetLoaiThuTucQueryHandler : IQueryHandler<GetLoaiThuTucQuery, LoaiThuTuc>
{
    private readonly IReadRepository<LoaiThuTuc> _readRepository;
    public GetLoaiThuTucQueryHandler(IReadRepository<LoaiThuTuc> readRepository) => _readRepository = readRepository;
    public async Task<Result<LoaiThuTuc>> Handle(GetLoaiThuTucQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetLoaiThuTucByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"LoaiThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<LoaiThuTuc>.Success(item);
    }
}
