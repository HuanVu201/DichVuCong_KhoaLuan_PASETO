using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.MenuApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.NgayNghiApp.Queries;

public class GetNgayNghiByIdSpec : Specification<NgayNghi>, ISingleResultSpecification
{
    public GetNgayNghiByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetNgayNghiQueryHandler : IQueryHandler<GetNgayNghiQuery, NgayNghi>
{
    private readonly IReadRepository<NgayNghi> _readRepository;
    private readonly IDapperRepository _dapperRepository;
    public GetNgayNghiQueryHandler(IReadRepository<NgayNghi> readRepository, IDapperRepository dapperRepository)
    {
        _readRepository = readRepository;
        _dapperRepository = dapperRepository;
    }
    public async Task<Result<NgayNghi>> Handle(GetNgayNghiQuery request, CancellationToken cancellationToken)
    {
        //var item = await _readRepository.FirstOrDefaultAsync(new GetNgayNghiByIdSpec(request.Id), cancellationToken);
        var item = await _dapperRepository.QueryFirstOrDefaultAsync<NgayNghi>("SELECT * FROM CATALOG.NgayNghis WHERE ID = @ID", request);
        if (item == null)
            throw new NotFoundException($"NgayNghi với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<NgayNghi>.Success(item);
    }
}
