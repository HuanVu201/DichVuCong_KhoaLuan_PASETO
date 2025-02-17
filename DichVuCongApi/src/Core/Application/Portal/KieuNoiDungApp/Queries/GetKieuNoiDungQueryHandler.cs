using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Portal.KieuNoiDungApp;
using TD.DichVuCongApi.Domain.Portal;

namespace TD.DichVuCongApi.Application.Portal.KieuNoiDungApp.Queries;

public class GetKieuNoiDungById : Specification<KieuNoiDung>
{
    public GetKieuNoiDungById(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetKieuNoiDungByIdFormated : Specification<KieuNoiDung, KieuNoiDungDto>
{
    public GetKieuNoiDungByIdFormated(Guid Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetLoaiDichVuQueryHandler : IQueryHandler<GetKieuNoiDungQuery, KieuNoiDungDto>
{
    private readonly IReadRepository<KieuNoiDung> _readRepository;
    public GetLoaiDichVuQueryHandler(IReadRepository<KieuNoiDung> readRepository) => _readRepository = readRepository;

    public async Task<Result<KieuNoiDungDto>> Handle(GetKieuNoiDungQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetKieuNoiDungByIdFormated(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"Kiểu nội dung với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<KieuNoiDungDto>.Success(item);
    }
}
