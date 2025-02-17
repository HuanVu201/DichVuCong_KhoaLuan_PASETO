using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Queries;


public class GetPhieuKhaoSatByIdSpec : Specification<PhieuKhaoSat>, ISingleResultSpecification
{
    public GetPhieuKhaoSatByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}
public class GetPhieuKhaoSatQueryHandler : IQueryHandler<GetPhieuKhaoSatQuery, PhieuKhaoSat>
{
    private readonly IReadRepository<PhieuKhaoSat> _readRepository;
    public GetPhieuKhaoSatQueryHandler(IReadRepository<PhieuKhaoSat> readRepository) => _readRepository = readRepository;
    public async Task<Result<PhieuKhaoSat>> Handle(GetPhieuKhaoSatQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetPhieuKhaoSatByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Phiếu Khảo Sát với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<PhieuKhaoSat>.Success(item);
    }
}
