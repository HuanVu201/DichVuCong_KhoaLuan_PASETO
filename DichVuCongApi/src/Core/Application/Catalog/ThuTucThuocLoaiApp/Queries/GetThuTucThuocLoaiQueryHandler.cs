using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Queries;

public class GetThuTucThuocLoaiByIdSpec : Specification<ThuTucThuocLoai>, ISingleResultSpecification
{
    public GetThuTucThuocLoaiByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetThuTucThuocLoaiQueryHandler : IQueryHandler<GetThuTucThuocLoaiQuery, ThuTucThuocLoai>
{
    private readonly IReadRepository<ThuTucThuocLoai> _readRepository;
    public GetThuTucThuocLoaiQueryHandler(IReadRepository<ThuTucThuocLoai> readRepository) => _readRepository = readRepository;
    public async Task<Result<ThuTucThuocLoai>> Handle(GetThuTucThuocLoaiQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetThuTucThuocLoaiByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"ThuTucThuocLoai với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<ThuTucThuocLoai>.Success(item);
    }
}
