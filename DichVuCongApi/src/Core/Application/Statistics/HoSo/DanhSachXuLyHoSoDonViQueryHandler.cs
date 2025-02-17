
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Statistics.HoSo;
public class DanhSachXuLyHoSoDonViQueryHandler : IRequestHandler<DanhSachXuLyHoSoDonViQuery, PaginationResponse<string>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICacheService _cacheService;
    public DanhSachXuLyHoSoDonViQueryHandler(IDapperRepository dapperRepository, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheService;
    }
    public Task<PaginationResponse<string>> Handle(DanhSachXuLyHoSoDonViQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
