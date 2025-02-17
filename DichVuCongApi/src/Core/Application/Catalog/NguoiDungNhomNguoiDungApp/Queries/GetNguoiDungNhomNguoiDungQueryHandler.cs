using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp.Queries;

public class GetNguoiDungNhomNguoiDungByIdSpec : Specification<NguoiDungNhomNguoiDung>, ISingleResultSpecification
{
    public GetNguoiDungNhomNguoiDungByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetNguoiDungNhomNguoiDungQueryHandler : IQueryHandler<GetNguoiDungNhomNguoiDungQuery, NguoiDungNhomNguoiDung>
{
    private readonly IReadRepository<NguoiDungNhomNguoiDung> _readRepository;
    public GetNguoiDungNhomNguoiDungQueryHandler(IReadRepository<NguoiDungNhomNguoiDung> readRepository) => _readRepository = readRepository;
    public async Task<Result<NguoiDungNhomNguoiDung>> Handle(GetNguoiDungNhomNguoiDungQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetNguoiDungNhomNguoiDungByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"NguoiDungNhomNguoiDung với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<NguoiDungNhomNguoiDung>.Success(item);
    }
}
