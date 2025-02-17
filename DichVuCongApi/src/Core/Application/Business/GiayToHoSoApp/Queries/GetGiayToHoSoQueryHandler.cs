using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.MauPhoiApp.Queries;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.GiayToHoSoApp.Queries;

public class GetGiayToHoSoByIdSpec : Specification<GiayToHoSo>, ISingleResultSpecification
{
    public GetGiayToHoSoByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetGiayToHoSoQueryHandler : IQueryHandler<GetGiayToHoSoQuery, GiayToHoSo>
{
    private readonly IReadRepository<GiayToHoSo> _readRepository;
    public GetGiayToHoSoQueryHandler(IReadRepository<GiayToHoSo> readRepository) => _readRepository = readRepository;
    public async Task<Result<GiayToHoSo>> Handle(GetGiayToHoSoQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetGiayToHoSoByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"GiayToHoSo với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<GiayToHoSo>.Success(item);
    }
}