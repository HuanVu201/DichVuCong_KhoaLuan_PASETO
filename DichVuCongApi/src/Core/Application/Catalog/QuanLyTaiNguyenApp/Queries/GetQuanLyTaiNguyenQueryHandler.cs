using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Catalog.QuanLyTaiNguyenApp.Queries;

public class GetQuanLyTaiNguyenByIdSpec : Specification<QuanLyTaiNguyen>, ISingleResultSpecification
{
    public GetQuanLyTaiNguyenByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetQuanLyTaiNguyenQueryHandler : IQueryHandler<GetQuanLyTaiNguyenQuery, QuanLyTaiNguyen>
{
    private readonly IReadRepository<QuanLyTaiNguyen> _readRepository;
    public GetQuanLyTaiNguyenQueryHandler(IReadRepository<QuanLyTaiNguyen> readRepository) => _readRepository = readRepository;
    public async Task<Result<QuanLyTaiNguyen>> Handle(GetQuanLyTaiNguyenQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetQuanLyTaiNguyenByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"QuanLyTaiNguyen với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<QuanLyTaiNguyen>.Success(item);
    }
}
