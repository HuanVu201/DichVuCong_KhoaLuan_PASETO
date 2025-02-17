using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.MenuApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.LogCSDLDanCuDoanhNghiepApp.Queries;

public class GetLogCSDLDanCuDoanhNghiepByIdSpec : Specification<LogCSDLDanCuDoanhNghiep>, ISingleResultSpecification
{
    public GetLogCSDLDanCuDoanhNghiepByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetLogCSDLDanCuDoanhNghiepQueryHandler : IQueryHandler<GetLogCSDLDanCuDoanhNghiepQuery, LogCSDLDanCuDoanhNghiep>
{
    private readonly IReadRepository<LogCSDLDanCuDoanhNghiep> _readRepository;
    public GetLogCSDLDanCuDoanhNghiepQueryHandler(IReadRepository<LogCSDLDanCuDoanhNghiep> readRepository) => _readRepository = readRepository;
    public async Task<Result<LogCSDLDanCuDoanhNghiep>> Handle(GetLogCSDLDanCuDoanhNghiepQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetLogCSDLDanCuDoanhNghiepByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"LogCSDLDanCuDoanhNghiep với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<LogCSDLDanCuDoanhNghiep>.Success(item);
    }
}
