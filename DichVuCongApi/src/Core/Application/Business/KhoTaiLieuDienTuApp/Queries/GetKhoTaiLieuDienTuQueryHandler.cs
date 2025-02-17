using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.KhoTaiLieuDienTuApp.Queries;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.KhoTaiLieuDienTuApp.Queries;
public class GetKhoTaiLieuDienTuByIdSpec : Specification<KhoTaiLieuDienTu>, ISingleResultSpecification
{
    public GetKhoTaiLieuDienTuByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetKhoTaiLieuDienTuQueryHandler : IQueryHandler<GetKhoTaiLieuDienTuQuery, KhoTaiLieuDienTu>
{
    private readonly IReadRepository<KhoTaiLieuDienTu> _readRepository;
    public GetKhoTaiLieuDienTuQueryHandler(IReadRepository<KhoTaiLieuDienTu> readRepository) => _readRepository = readRepository;
    public async Task<Result<KhoTaiLieuDienTu>> Handle(GetKhoTaiLieuDienTuQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetKhoTaiLieuDienTuByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"KhoTaiLieuDienTu với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<KhoTaiLieuDienTu>.Success(item);
    }
}