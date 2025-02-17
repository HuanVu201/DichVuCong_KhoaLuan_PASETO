using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.QuaTrinhXuLyHoSoApp.Queries;

public class GetQuaTrinhXuLyHoSoByIdSpec : Specification<QuaTrinhXuLyHoSo, QuaTrinhXuLyHoSoDetailDto>, ISingleResultSpecification
{
    public GetQuaTrinhXuLyHoSoByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetQuaTrinhXuLyHoSoQueryHandler : IQueryHandler<GetQuaTrinhXuLyHoSoQuery, QuaTrinhXuLyHoSoDetailDto>
{
    private readonly IReadRepository<QuaTrinhXuLyHoSo> _readRepository;
    public GetQuaTrinhXuLyHoSoQueryHandler(IReadRepository<QuaTrinhXuLyHoSo> readRepository) => _readRepository = readRepository;
    public async Task<Result<QuaTrinhXuLyHoSoDetailDto>> Handle(GetQuaTrinhXuLyHoSoQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetQuaTrinhXuLyHoSoByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"QuaTrinhXuLyHoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<QuaTrinhXuLyHoSoDetailDto>.Success(item);
    }
}
