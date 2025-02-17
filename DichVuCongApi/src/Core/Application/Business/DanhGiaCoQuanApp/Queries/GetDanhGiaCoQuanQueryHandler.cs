using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp.Queries;

public class GetDanhGiaCoQuanByIdSpec : Specification<DanhGiaCoQuan>, ISingleResultSpecification
{
    public GetDanhGiaCoQuanByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetDanhGiaCoQuanQueryHandler : IQueryHandler<GetDanhGiaCoQuanQuery, DanhGiaCoQuan>
{
    private readonly IReadRepository<DanhGiaCoQuan> _readRepository;
    public GetDanhGiaCoQuanQueryHandler(IReadRepository<DanhGiaCoQuan> readRepository) => _readRepository = readRepository;
    public async Task<Result<DanhGiaCoQuan>> Handle(GetDanhGiaCoQuanQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetDanhGiaCoQuanByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"DanhGiaCoQuan với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<DanhGiaCoQuan>.Success(item);
    }
}