using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Portal.LoaiNhomGiayToCaNhanApp.Queries;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.LoaiNhomGiayToCaNhanApp.Queries;
public class GetLoaiNhomGiayToCaNhanByIdSpec : Specification<LoaiNhomGiayToCaNhan>, ISingleResultSpecification
{
    public GetLoaiNhomGiayToCaNhanByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetLoaiNhomGiayToCaNhanQueryHandler : IQueryHandler<GetLoaiNhomGiayToCaNhanQuery, LoaiNhomGiayToCaNhan>
{
    private readonly IReadRepository<LoaiNhomGiayToCaNhan> _readRepository;
    public GetLoaiNhomGiayToCaNhanQueryHandler(IReadRepository<LoaiNhomGiayToCaNhan> readRepository) => _readRepository = readRepository;
    public async Task<Result<LoaiNhomGiayToCaNhan>> Handle(GetLoaiNhomGiayToCaNhanQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetLoaiNhomGiayToCaNhanByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"LoaiNhomGiayToCaNhan với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<LoaiNhomGiayToCaNhan>.Success(item);
    }
}
