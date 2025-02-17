using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Dtos;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;

public class GetTruongHopThuTucByIdSpec : Specification<TruongHopThuTuc>, ISingleResultSpecification
{
    public GetTruongHopThuTucByIdSpec(DefaultIdType Id)
    {
        Query.Where(x => x.Id == Id);
    }
}

public class GetTruongHopThuTucByMaTTHCSpec : Specification<TruongHopThuTuc>, ISingleResultSpecification
{
    public GetTruongHopThuTucByMaTTHCSpec(string maTTHC, string? loaiDuLieuKetNoi = null)
    {
        Query.Where(x => x.ThuTucId == maTTHC);
        Query.Where(x => x.DeletedOn == null);

        if (!string.IsNullOrEmpty(loaiDuLieuKetNoi))
        {
            Query.Where(x => x.LoaiDuLieuKetNoi == loaiDuLieuKetNoi);
        }

    }
}

public class GetTruongHopThuTucsByMaTTHCSpec : Specification<TruongHopThuTuc>
{
    public GetTruongHopThuTucsByMaTTHCSpec(string maTTHC, string? loaiDuLieuKetNoi = null)
    {
        Query.Where(x => x.ThuTucId == maTTHC);
        Query.Where(x => x.DeletedOn == null);

        if (!string.IsNullOrEmpty(loaiDuLieuKetNoi))
        {
            Query.Where(x => x.LoaiDuLieuKetNoi == loaiDuLieuKetNoi);
        }

    }
}

public class GetTruongHopThuTucQueryHandler : IQueryHandler<GetTruongHopThuTucQuery, TruongHopThuTuc>
{
    private readonly IReadRepository<TruongHopThuTuc> _readRepository;
    public GetTruongHopThuTucQueryHandler(IReadRepository<TruongHopThuTuc> readRepository) => _readRepository = readRepository;
    public async Task<Result<TruongHopThuTuc>> Handle(GetTruongHopThuTucQuery request, CancellationToken cancellationToken)
    {
        var item = await _readRepository.FirstOrDefaultAsync(new GetTruongHopThuTucByIdSpec(request.Id), cancellationToken);
        if (item == null)
            throw new NotFoundException($"TruongHopThuTuc với mã: {request.Id} chưa được thêm vào hệ thống");
        return Result<TruongHopThuTuc>.Success(item);
    }
}
