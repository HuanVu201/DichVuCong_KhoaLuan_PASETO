using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucLienQuanApp.Queries;
public class GetThuTucLienQuanByIdSpec : Specification<ThuTucLienQuan>, ISingleResultSpecification
{
    public GetThuTucLienQuanByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetThuTucLienQuanQueryHandler : IQueryHandler<GetThuTucLienQuanQuery, ThuTucLienQuan>
{
    private readonly IReadRepository<ThuTucLienQuan> _readRepository;
    public GetThuTucLienQuanQueryHandler(IReadRepository<ThuTucLienQuan> readRepository) => _readRepository = readRepository;
    public async Task<Result<ThuTucLienQuan>> Handle(GetThuTucLienQuanQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetThuTucLienQuanByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"ThuTucLienQuan với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<ThuTucLienQuan>.Success(item);
    }
}