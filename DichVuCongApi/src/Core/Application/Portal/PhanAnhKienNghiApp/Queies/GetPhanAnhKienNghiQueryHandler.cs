using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Portal.PhanAnhKienNghiApp.Queries;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.PhanAnhKienNghiApp.Queies;

public class GetPhanAnhKienNghiByIdSpec : Specification<PhanAnhKienNghi>, ISingleResultSpecification
{
    public GetPhanAnhKienNghiByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetPhanAnhKienNghiQueryHandler : IQueryHandler<GetPhanAnhKienNghiQuery, PhanAnhKienNghi>
{
    private readonly IReadRepository<PhanAnhKienNghi> _readRepository;
    public GetPhanAnhKienNghiQueryHandler(IReadRepository<PhanAnhKienNghi> readRepository) => _readRepository = readRepository;
    public async Task<Result<PhanAnhKienNghi>> Handle(GetPhanAnhKienNghiQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetPhanAnhKienNghiByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Phản ánh kiến nghị với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<PhanAnhKienNghi>.Success(item);
    }
}
