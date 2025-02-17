using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp.Queries;
using TD.DichVuCongApi.Application.Catalog.DiaBanApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.DiaBanApp.Queries;

public class GetDiaBanByIdSpec : Specification<DiaBan>, ISingleResultSpecification
{
    public GetDiaBanByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetDiaBanQueryHandler : IQueryHandler<GetDiaBanQuery, DiaBan>
{
    private readonly IReadRepository<DiaBan> _readRepository;
    public GetDiaBanQueryHandler(IReadRepository<DiaBan> readRepository) => _readRepository = readRepository;
    public async Task<Result<DiaBan>> Handle(GetDiaBanQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetDiaBanByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Địa bàn với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<DiaBan>.Success(item);
    }
}
