using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.QuanLyLienKetApp.Queries;

public class GetQuanLyLienKetByIdSpec : Specification<QuanLyLienKet>, ISingleResultSpecification
{
    public GetQuanLyLienKetByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetQuanLyLienKetQueryHandler : IQueryHandler<GetQuanLyLienKetQuery, QuanLyLienKet>
{
    private readonly IReadRepository<QuanLyLienKet> _readRepository;
    public GetQuanLyLienKetQueryHandler(IReadRepository<QuanLyLienKet> readRepository) => _readRepository = readRepository;
    public async Task<Result<QuanLyLienKet>> Handle(GetQuanLyLienKetQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetQuanLyLienKetByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"QuanLyLienKet với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<QuanLyLienKet>.Success(item);
    }
}
