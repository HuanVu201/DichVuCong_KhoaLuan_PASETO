using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TrangThaiHoSoApp.Queries;

public class GetTrangThaiHoSoByIdSpec : Specification<TrangThaiHoSo>, ISingleResultSpecification
{
    public GetTrangThaiHoSoByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetTrangThaiHoSoQueryHandler : IQueryHandler<GetTrangThaiHoSoQuery, TrangThaiHoSo>
{
    private readonly IReadRepository<TrangThaiHoSo> _readRepository;
    public GetTrangThaiHoSoQueryHandler(IReadRepository<TrangThaiHoSo> readRepository) => _readRepository = readRepository;
    public async Task<Result<TrangThaiHoSo>> Handle(GetTrangThaiHoSoQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetTrangThaiHoSoByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"TrangThaiHoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<TrangThaiHoSo>.Success(item);
    }
}
