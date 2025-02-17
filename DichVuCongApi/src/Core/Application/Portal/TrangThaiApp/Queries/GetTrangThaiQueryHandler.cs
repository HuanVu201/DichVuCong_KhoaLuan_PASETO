using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Portal.TinBaiApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.TrangThaiApp.Queries;

public class GetTrangThaiByIdSpec : Specification<TrangThai>
{
    public GetTrangThaiByIdSpec(string Id)
    {
        Query.Where(x => x.Id.ToString() == Id);
    }
}

public class GetTrangThaiQueryHandler : IQueryHandler<GetTrangThaiQuery, TrangThai>
{
    private readonly IReadRepository<TrangThai> _readRepository;
    public GetTrangThaiQueryHandler(IReadRepository<TrangThai> readRepository) => _readRepository = readRepository;

    public async Task<Result<TrangThai>> Handle(GetTrangThaiQuery request, CancellationToken cancellationToken)
    {
        var itemExist = await _readRepository.FirstOrDefaultAsync(new GetTrangThaiByIdSpec(request.Id));
        if (itemExist == null)
            throw new NotFoundException($"Trạng thái với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<TrangThai>.Success(itemExist);
    }
}
