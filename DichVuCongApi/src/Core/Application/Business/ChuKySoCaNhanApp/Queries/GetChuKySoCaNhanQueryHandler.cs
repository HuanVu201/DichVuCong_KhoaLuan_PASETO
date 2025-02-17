using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.ChuKySoCaNhanApp.Queries;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.ChuKySoCaNhanApp.Queries;

public class GetChuKySoCaNhanByIdSpec : Specification<ChuKySoCaNhan>, ISingleResultSpecification
{
    public GetChuKySoCaNhanByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetChuKySoCaNhanQueryHandler : IQueryHandler<GetChuKySoCaNhanQuery, ChuKySoCaNhan>
{
    private readonly IReadRepository<ChuKySoCaNhan> _readRepository;
    public GetChuKySoCaNhanQueryHandler(IReadRepository<ChuKySoCaNhan> readRepository) => _readRepository = readRepository;
    public async Task<Result<ChuKySoCaNhan>> Handle(GetChuKySoCaNhanQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetChuKySoCaNhanByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"ChuKySoCaNhan với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<ChuKySoCaNhan>.Success(item);
    }
}
