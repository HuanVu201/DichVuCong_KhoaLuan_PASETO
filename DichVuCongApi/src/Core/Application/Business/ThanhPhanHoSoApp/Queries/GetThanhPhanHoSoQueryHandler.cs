using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ThanhPhanHoSoApp.Queries;

public class GetThanhPhanHoSoByIdSpec : Specification<ThanhPhanHoSo>, ISingleResultSpecification
{
    public GetThanhPhanHoSoByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id).Where(x => x.DeletedOn == null);
    }
}
public class GetAllThanhPhanHoSoBySpec : Specification<ThanhPhanHoSo, ThanhPhanHoSoDto>
{
    public GetAllThanhPhanHoSoBySpec(string maHoSo)
    {
        Query.Where(x => x.HoSo == maHoSo).Where(x => x.DeletedOn == null);
    }
}
public class GetThanhPhanHoSoQueryHandler : IQueryHandler<GetThanhPhanHoSoQuery, ThanhPhanHoSo>
{
    private readonly IReadRepository<ThanhPhanHoSo> _readRepository;
    public GetThanhPhanHoSoQueryHandler(IReadRepository<ThanhPhanHoSo> readRepository) => _readRepository = readRepository;
    public async Task<Result<ThanhPhanHoSo>> Handle(GetThanhPhanHoSoQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetThanhPhanHoSoByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"ThanhPhanHoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<ThanhPhanHoSo>.Success(item);
    }
}
