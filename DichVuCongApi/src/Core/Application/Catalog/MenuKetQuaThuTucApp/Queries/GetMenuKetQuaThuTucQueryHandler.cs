using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.MenuKetQuaThuTucApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.MenuKetQuaThuTucApp.Queries;

public class GetMenuKetQuaThuTucByIdSpec : Specification<MenuKetQuaThuTuc>, ISingleResultSpecification
{
    public GetMenuKetQuaThuTucByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetMenuKetQuaThuTucQueryHandler : IQueryHandler<GetMenuKetQuaThuTucQuery, MenuKetQuaThuTuc>
{
    private readonly IReadRepository<MenuKetQuaThuTuc> _readRepository;
    public GetMenuKetQuaThuTucQueryHandler(IReadRepository<MenuKetQuaThuTuc> readRepository) => _readRepository = readRepository;
    public async Task<Result<MenuKetQuaThuTuc>> Handle(GetMenuKetQuaThuTucQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetMenuKetQuaThuTucByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Menu với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<MenuKetQuaThuTuc>.Success(item);
    }
}
