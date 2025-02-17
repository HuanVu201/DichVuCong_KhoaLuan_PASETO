using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.KetQuaLienQuanApp.Queries;

public class GetKetQuaLienQuanByIdSpec : Specification<KetQuaLienQuan>, ISingleResultSpecification
{
    public GetKetQuaLienQuanByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetActionQueryHandler : IQueryHandler<GetKetQuaLienQuanQuery, KetQuaLienQuan>
{
    private readonly IReadRepository<KetQuaLienQuan> _readRepository;
    public GetActionQueryHandler(IReadRepository<KetQuaLienQuan> readRepository) => _readRepository = readRepository;
    public async Task<Result<KetQuaLienQuan>> Handle(GetKetQuaLienQuanQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetKetQuaLienQuanByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"KetQuaLienQuan với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<KetQuaLienQuan>.Success(item);
    }
}
