using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.NhomNguoiDungApp;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.NhomNguoiDungApp.Queries;

public class GetNhomNguoiDungByIdSpec : Specification<NhomNguoiDung>, ISingleResultSpecification
{
    public GetNhomNguoiDungByIdSpec(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetNhomNguoiDungQueryHandler : IQueryHandler<GetNhomNguoiDungQuery, NhomNguoiDung>
{
    private readonly IReadRepository<NhomNguoiDung> _readRepository;
    public GetNhomNguoiDungQueryHandler(IReadRepository<NhomNguoiDung> readRepository) => _readRepository = readRepository;
    public async Task<Result<NhomNguoiDung>> Handle(GetNhomNguoiDungQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetNhomNguoiDungByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"NhomNguoiDung với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<NhomNguoiDung>.Success(item);
    }
}
