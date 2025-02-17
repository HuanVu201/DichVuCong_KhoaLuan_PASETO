using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThietYeuApp.Queries;
public class GetThuTucThietYeuByIdSpec : Specification<ThuTucThietYeu>, ISingleResultSpecification
{
    public GetThuTucThietYeuByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetThuTucThietYeuQueryHandler : IQueryHandler<GetThuTucThietYeuQuery, ThuTucThietYeu>
{
    private readonly IReadRepository<ThuTucThietYeu> _readRepository;
    public GetThuTucThietYeuQueryHandler(IReadRepository<ThuTucThietYeu> readRepository) => _readRepository = readRepository;
    public async Task<Result<ThuTucThietYeu>> Handle(GetThuTucThietYeuQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetThuTucThietYeuByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"ThuTucThietYeu với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<ThuTucThietYeu>.Success(item);
    }
}