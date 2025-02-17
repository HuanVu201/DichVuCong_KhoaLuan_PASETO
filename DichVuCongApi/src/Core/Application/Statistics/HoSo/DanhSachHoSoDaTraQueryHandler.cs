using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Statistics.HoSo;
public class DanhSachHoSoDaTraQueryHandler : ICommandHandler<DanhSachHoSoDaTraQuery, IReadOnlyList<DanhSachHoSoDaTraDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICacheService _cacheService;
    public DanhSachHoSoDaTraQueryHandler(IDapperRepository dapperRepository, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheService;
    }
    public async Task<Result<IReadOnlyList<DanhSachHoSoDaTraDto>>> Handle(DanhSachHoSoDaTraQuery request, CancellationToken cancellationToken)
    {
        string sqlGetHoSo = @"SELECT Top 10 ID, ChuHoSo, MaHoSo, NgayTra, NgayHenTra, NgayKetThucXuLy FROM Business.HoSos
            WHERE TrangThaiHoSoId = '9' ORDER BY NgayKetThucXuLy DESC";
        //var data = await _cacheService.GetOrSetAsync(request,
        //    async () => await _dapperRepository.PaginatedListSingleQueryAsync<DanhSachHoSoDaTraDto>(sqlGetHoSo, request.PageSize, "NgayKetThucXuLy DESC", cancellationToken, request.PageNumber, request),
        //    TimeSpan.FromMinutes(request.CacheTime ?? 30),
        //    cancellationToken);
        var data = await _cacheService.GetOrSetAsync(request,
            async () => await _dapperRepository.QueryAsync<DanhSachHoSoDaTraDto>(sqlGetHoSo),
            TimeSpan.FromMinutes(request.CacheTime ?? 30),
            cancellationToken);
        return Result<IReadOnlyList<DanhSachHoSoDaTraDto>>.Success(data);
    }
}
