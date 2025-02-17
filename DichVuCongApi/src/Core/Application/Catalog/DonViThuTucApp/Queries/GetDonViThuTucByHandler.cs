using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Application.Catalog.DonViThuTucApp;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.DonViThuTucApp.Queries;
class GetDonViThuTucBySpec : Specification<DonViThuTuc>, ISingleResultSpecification
{
    public GetDonViThuTucBySpec(string DonViId, string MaTTHC)
    {
        Query.Where(x => x.MaTTHC == MaTTHC && x.DonViId == DonViId);
    }
}

public class GetDonViThuTucByHandler : IQueryHandler<GetDonViThuTucBy, DonViThuTuc>
{
    private readonly IReadRepository<DonViThuTuc> _readRepository;
    private readonly IDapperRepository _dapperRepository;
    public GetDonViThuTucByHandler(IReadRepository<DonViThuTuc> readRepository, IDapperRepository dapperRepository)
    {
        _readRepository = readRepository;
        _dapperRepository = dapperRepository;
    }
    public async Task<Result<DonViThuTuc>> Handle(GetDonViThuTucBy request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetDonViThuTucBySpec(request.DonViId, request.MaTTHC), cancellationToken);
        if (item == null) return Result<DonViThuTuc>.Fail();

        return Result<DonViThuTuc>.Success(item);
    }
}
