using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
public class GetByGroupCodeQuerySpec : Specification<Group>, ISingleResultSpecification
{
    public GetByGroupCodeQuerySpec(string groupCode)
    {
        Query.Where(x => x.GroupCode == groupCode);
    }
}

public class GetByGroupCodeQueryHandler : IQueryHandler<GetByGroupCodeQuery, GroupDto>
{
    private readonly IReadRepository<Group> _readRepository;
    public GetByGroupCodeQueryHandler(IReadRepository<Group> readRepository) => _readRepository = readRepository;
    public async Task<Result<GroupDto>> Handle(GetByGroupCodeQuery request, CancellationToken cancellationToken)
    {
        if(string.IsNullOrEmpty(request.groupCode)) throw new ArgumentNullException(nameof(request.groupCode));
        var item = await _readRepository.FirstOrDefaultAsync(new GetByGroupCodeQuerySpec(request.groupCode), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Group với mã: {request.groupCode} chưa được thêm vào hệ thống");
        var res = item.Adapt<GroupDto>();
        return Result<GroupDto>.Success(res);
    }
}
