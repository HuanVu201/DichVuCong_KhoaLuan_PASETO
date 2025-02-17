using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp.Queries;

public class GetThanhPhanHuongDanNopHoSoByIdSpec : Specification<ThanhPhanHuongDanNopHoSo>, ISingleResultSpecification
{
    public GetThanhPhanHuongDanNopHoSoByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id).Where(x => x.DeletedOn == null);
    }
}

public class GetThanhPhanHuongDanNopHoSoQueryHandler : IQueryHandler<GetThanhPhanHuongDanNopHoSoQuery, ThanhPhanHuongDanNopHoSo>
{
    private readonly IReadRepository<ThanhPhanHuongDanNopHoSo> _readRepository;
    public GetThanhPhanHuongDanNopHoSoQueryHandler(IReadRepository<ThanhPhanHuongDanNopHoSo> readRepository) => _readRepository = readRepository;
    public async Task<Result<ThanhPhanHuongDanNopHoSo>> Handle(GetThanhPhanHuongDanNopHoSoQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetThanhPhanHuongDanNopHoSoByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"ThanhPhanHuongDanNopHoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<ThanhPhanHuongDanNopHoSo>.Success(item);
    }
}
