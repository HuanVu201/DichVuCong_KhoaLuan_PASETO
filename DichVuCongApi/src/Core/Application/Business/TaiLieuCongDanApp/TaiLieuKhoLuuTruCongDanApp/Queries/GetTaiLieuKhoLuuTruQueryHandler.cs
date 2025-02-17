using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Queries;
public class GetTaiLieuKhoLuuTruByIdSpec : Specification<TaiLieuKhoLuuTruCongDan>, ISingleResultSpecification
{
    public GetTaiLieuKhoLuuTruByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetTaiLieuKhoLuuTruQueryHandler : IQueryHandler<GetTaiLieuKhoLuuTruQuery, TaiLieuKhoLuuTruCongDan>
{
    private readonly IReadRepository<TaiLieuKhoLuuTruCongDan> _readRepository;
    public GetTaiLieuKhoLuuTruQueryHandler(IReadRepository<TaiLieuKhoLuuTruCongDan> readRepository) => _readRepository = readRepository;
    public async Task<Result<TaiLieuKhoLuuTruCongDan>> Handle(GetTaiLieuKhoLuuTruQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetTaiLieuKhoLuuTruByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"TaiLieuKhoLuuTru với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<TaiLieuKhoLuuTruCongDan>.Success(item);
    }
}