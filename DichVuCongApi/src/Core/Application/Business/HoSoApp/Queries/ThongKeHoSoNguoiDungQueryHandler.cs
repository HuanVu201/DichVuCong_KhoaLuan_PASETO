using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Identity.Users;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class ThongKeHoSoNguoiDungQueryHandler : IQueryHandler<ThongKeHoSoNguoiDungQuery, ThongKeHoSoNguoiDungDto>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _currentUser;
    private readonly int _cacheTime = 3;
    private readonly ICacheService _cacheService;
    public ThongKeHoSoNguoiDungQueryHandler(IDapperRepository dapperRepository, IUserService currentUser, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _cacheService = cacheService;
    }

    public async Task<Result<ThongKeHoSoNguoiDungDto>> Handle(ThongKeHoSoNguoiDungQuery request, CancellationToken cancellationToken)
    {
        var user = await _currentUser.GetCurrentUserAsync(cancellationToken);
        string sqlThongKe = @"SELECT SUM(case when TrangThaiHoSoId = '2' then 1 else 0 end) as TongSoHoSoDangXuLy,
                            SUM(case when TrangThaiHoSoId = '9' then 1 else 0 end) as TongSoHoSoDaHoanThanh  FROM Business.HoSos
                            where NguoiGui = @UserId AND DeletedOn is null";
        var data = await _cacheService.GetOrSetAsync(
            new { ChucNang = "ThongKeHoSoNguoiDung", Key = user.SoDinhDanh },
            async () => await _dapperRepository.QueryFirstOrDefaultAsync<ThongKeHoSoNguoiDungDto>(sqlThongKe, new
            {
                UserId = user.SoDinhDanh
            }),
            TimeSpan.FromMinutes(_cacheTime),
            cancellationToken);

        return Result<ThongKeHoSoNguoiDungDto>.Success(data);
    }
}
