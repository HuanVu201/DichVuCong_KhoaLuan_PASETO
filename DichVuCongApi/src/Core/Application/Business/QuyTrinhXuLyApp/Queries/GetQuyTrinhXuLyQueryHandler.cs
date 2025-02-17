using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.QuyTrinhXuLyApp.Queries;

public class GetQuyTrinhXuLyByIdSpec : Specification<QuyTrinhXuLy>, ISingleResultSpecification
{
    public GetQuyTrinhXuLyByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetQuyTrinhXuLyQueryHandler : IQueryHandler<GetQuyTrinhXuLyQuery, QuyTrinhXuLy>
{
    private readonly IReadRepository<QuyTrinhXuLy> _readRepository;
    public GetQuyTrinhXuLyQueryHandler(IReadRepository<QuyTrinhXuLy> readRepository) => _readRepository = readRepository;
    public async Task<Result<QuyTrinhXuLy>> Handle(GetQuyTrinhXuLyQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetQuyTrinhXuLyByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"QuyTrinhXuLy với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<QuyTrinhXuLy>.Success(item);
    }
}
