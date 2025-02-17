using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.LoaiPhiLePhiApp.Queries;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.LogDGHLCongDanApp.Queries;

public class GetLogThongKeDGHLCongDanByIdSpec : Specification<LogThongKeDGHLCongDan>, ISingleResultSpecification
{
    public GetLogThongKeDGHLCongDanByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}
public class GetLogThongKeDGHLQueryHandler : IQueryHandler<GetLogThongKeDGHLQuery, LogThongKeDGHLCongDan>
{
    private readonly IReadRepository<LogThongKeDGHLCongDan> _readRepository;
    public GetLogThongKeDGHLQueryHandler(IReadRepository<LogThongKeDGHLCongDan> readRepository) => _readRepository = readRepository;
    public async Task<Result<LogThongKeDGHLCongDan>> Handle(GetLogThongKeDGHLQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetLogThongKeDGHLCongDanByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"LogThongKeDGHLCongDan với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<LogThongKeDGHLCongDan>.Success(item);
    }
}
