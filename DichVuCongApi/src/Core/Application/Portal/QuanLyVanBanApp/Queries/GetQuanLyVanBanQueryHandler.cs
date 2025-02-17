using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.QuanLyVanBanApp.Queries;

public class GetQuanLyVanBanByIdSpec : Specification<QuanLyVanBan>, ISingleResultSpecification
{
    public GetQuanLyVanBanByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetQuanLyVanBanQueryHandler : IQueryHandler<GetQuanLyVanBanQuery, QuanLyVanBan>
{
    private readonly IReadRepository<QuanLyVanBan> _readRepository;
    public GetQuanLyVanBanQueryHandler(IReadRepository<QuanLyVanBan> readRepository) => _readRepository = readRepository;
    public async Task<Result<QuanLyVanBan>> Handle(GetQuanLyVanBanQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetQuanLyVanBanByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"QuanLyVanBan với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<QuanLyVanBan>.Success(item);
    }
}
