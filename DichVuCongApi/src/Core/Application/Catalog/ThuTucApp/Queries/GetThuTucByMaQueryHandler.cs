using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Dto;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;

public class GetThuTucByMaSpec : Specification<ThuTuc, DetailThuTucDto>, ISingleResultSpecification
{
    public GetThuTucByMaSpec(string maTTHC)
    {
        Query.Where(x => x.MaTTHC == maTTHC);
    }
}

public class GetThuTucByMaQueryHandler : IQueryHandler<GetThuTucByMaQuery, DetailThuTucDto>
{
    private readonly IReadRepository<ThuTuc> _readRepository;
    public GetThuTucByMaQueryHandler(IReadRepository<ThuTuc> readRepository) => _readRepository = readRepository;
    public async Task<Result<DetailThuTucDto>> Handle(GetThuTucByMaQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetThuTucByMaSpec(request.MaTTHC), cancellationToken);
        //if (item == null)
        //    throw new NotFoundException($"Thủ tục với mã thủ tục: {request.MaTTHC} chưa được thêm vào hệ thống");
        return Result<DetailThuTucDto>.Success(data: item);
    }
}
