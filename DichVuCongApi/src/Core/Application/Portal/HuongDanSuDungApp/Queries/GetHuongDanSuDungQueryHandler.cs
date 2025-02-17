using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.HuongDanSuDungApp.Queries;

public class GetHuongDanSuDungByIdSpec : Specification<HuongDanSuDung>, ISingleResultSpecification
{
    public GetHuongDanSuDungByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetHuongDanSuDungQueryHandler : IQueryHandler<GetHuongDanSuDungQuery, HuongDanSuDung>
{
    private readonly IReadRepository<HuongDanSuDung> _readRepository;
    public GetHuongDanSuDungQueryHandler(IReadRepository<HuongDanSuDung> readRepository) => _readRepository = readRepository;
    public async Task<Result<HuongDanSuDung>> Handle(GetHuongDanSuDungQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetHuongDanSuDungByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"HuongDanSuDung với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<HuongDanSuDung>.Success(item);
    }
}
