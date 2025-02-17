using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;

public class GetThuTucByIdSpec : Specification<ThuTuc>, ISingleResultSpecification
{
    public GetThuTucByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetThuTucByMaTTHCSpec : Specification<ThuTuc>, ISingleResultSpecification
{
    public GetThuTucByMaTTHCSpec(string maTTHC)
    {
        Query.Where(x => x.MaTTHC == maTTHC);
    }
}

public class GetThuTucQueryHandler : IQueryHandler<GetThuTucQuery, ThuTuc>
{
    private readonly IReadRepository<ThuTuc> _readRepository;
    public GetThuTucQueryHandler(IReadRepository<ThuTuc> readRepository) => _readRepository = readRepository;
    public async Task<Result<ThuTuc>> Handle(GetThuTucQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetThuTucByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Thủ tục với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<ThuTuc>.Success(item);
    }
}
