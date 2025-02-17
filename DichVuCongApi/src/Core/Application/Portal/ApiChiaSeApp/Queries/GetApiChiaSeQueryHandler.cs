using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.Queries;
public class GetLichSuApiChiaSeByIdSpec : Specification<APIChiaSe>, ISingleResultSpecification
{
    public GetLichSuApiChiaSeByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetApiChiaSeQueryHandler : IQueryHandler<GetApiChiaSeQuery, APIChiaSe>
{
    private readonly IReadRepository<APIChiaSe> _readRepository;
    private readonly IDapperRepository _dapperRepository;
    public GetApiChiaSeQueryHandler(IReadRepository<APIChiaSe> readRepository, IDapperRepository dapperRepository)
    {
        _readRepository = readRepository;
        _dapperRepository = dapperRepository;
    }
    public async Task<Result<APIChiaSe>> Handle(GetApiChiaSeQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetLichSuApiChiaSeByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"APIChiaSe với Id: {request.Id} chưa được thêm vào hệ thống");
        return Result<APIChiaSe>.Success(item);
    }
}