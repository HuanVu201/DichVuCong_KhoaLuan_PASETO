using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.LoaiGiayToKhoLuuTruApp.Queries;
public class GetLoaiGiayToKhoLuuTruByIdSpec : Specification<LoaiGiayToKhoLuuTru>, ISingleResultSpecification
{
    public GetLoaiGiayToKhoLuuTruByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetLoaiGiayToKhoLuuTruQueryHandler : IQueryHandler<GetLoaiGiayToKhoLuuTruQuery, LoaiGiayToKhoLuuTru>
{
    private readonly IReadRepository<LoaiGiayToKhoLuuTru> _readRepository;
    public GetLoaiGiayToKhoLuuTruQueryHandler(IReadRepository<LoaiGiayToKhoLuuTru> readRepository) => _readRepository = readRepository;
    public async Task<Result<LoaiGiayToKhoLuuTru>> Handle(GetLoaiGiayToKhoLuuTruQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetLoaiGiayToKhoLuuTruByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"LoaiGiayToKhoLuuTru với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<LoaiGiayToKhoLuuTru>.Success(item);
    }
}