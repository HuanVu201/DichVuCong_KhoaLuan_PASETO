using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhTraoDoiCongDanApp.Queries;

public class GetQuaTrinhTraoDoiCongDanByIdSpec : Specification<QuaTrinhTraoDoiCongDan>, ISingleResultSpecification
{
    public GetQuaTrinhTraoDoiCongDanByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetQuaTrinhTraoDoiCongDanQueryHandler : IQueryHandler<GetQuaTrinhTraoDoiCongDanQuery, QuaTrinhTraoDoiCongDan>
{
    private readonly IReadRepository<QuaTrinhTraoDoiCongDan> _readRepository;
    public GetQuaTrinhTraoDoiCongDanQueryHandler(IReadRepository<QuaTrinhTraoDoiCongDan> readRepository) => _readRepository = readRepository;
    public async Task<Result<QuaTrinhTraoDoiCongDan>> Handle(GetQuaTrinhTraoDoiCongDanQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetQuaTrinhTraoDoiCongDanByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"QuaTrinhTraoDoiCongDan với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<QuaTrinhTraoDoiCongDan>.Success(item);
    }
}
