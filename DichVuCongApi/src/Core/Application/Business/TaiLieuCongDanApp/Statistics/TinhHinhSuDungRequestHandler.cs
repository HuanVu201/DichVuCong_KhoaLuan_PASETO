using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.Statistics;
public class TinhHinhSuDungRequestHandler : IRequestHandler<TinhHinhSuDungRequest, Result<TinhHinhSuDungTaiLieuResponse>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICacheService _cacheService;
    public TinhHinhSuDungRequestHandler(IDapperRepository dapperRepository, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheService;
    }

    public async Task<Result<TinhHinhSuDungTaiLieuResponse>> Handle(TinhHinhSuDungRequest request, CancellationToken cancellationToken)
    {
        var data = new TinhHinhSuDungTaiLieuResponse();
        string sqlQueryTaiSuDung = @"SELECT	COUNT(CASE WHEN tl.SoLuotTaiSuDung > 0 THEN 1 END) AS SoLuongTaiSuDung,
		                                    COUNT(CASE WHEN tl.SoLuotTaiSuDung = 0 OR tl.SoLuotTaiSuDung is null THEN 1 END) AS SoLuongChuaTaiSuDung
                                    FROM [Business].[TaiLieuKhoLuuTruCongDans] tl";

        string sqlQuerySoLuongSuDung = @"SELECT	COUNT(CASE WHEN kho.SoLuong > 0 THEN 1 END) AS SoLuongSuDung
                                            FROM [Business].[KhoLuuTruCongDans] kho";

        string sqlQueryTotalUserHaveSoDinhDanh = @"SELECT COUNT(CASE WHEN u.TypeUser = 'CongDan' AND u.SoDinhDanh is not null THEN 1 END) AS TotalUser
                                                    FROM [Identity].[Users] u";

        var taiSuDungData = await _cacheService.GetOrSetAsync("TaiSuDung", async () =>
            await _dapperRepository.QueryFirstOrDefaultAsync<TinhHinhSuDungTaiLieuResponse>(sqlQueryTaiSuDung), TimeSpan.FromMinutes(1), cancellationToken);

        var soLuongSuDungData = await _cacheService.GetOrSetAsync("SoLuongSuDung", async () =>
            await _dapperRepository.QueryFirstOrDefaultAsync<TinhHinhSuDungTaiLieuResponse>(sqlQuerySoLuongSuDung), TimeSpan.FromMinutes(1), cancellationToken);

        var totalUserHaveSoDinhDanh = await _cacheService.GetOrSetAsync("totalUserHaveSoDinhDanh", async () =>
            await _dapperRepository.QueryFirstOrDefaultAsync<CountUser>(sqlQueryTotalUserHaveSoDinhDanh), TimeSpan.FromMinutes(1), cancellationToken);

        data.SoLuongTaiSuDung = taiSuDungData.SoLuongTaiSuDung;
        data.SoLuongChuaTaiSuDung = taiSuDungData.SoLuongChuaTaiSuDung;
        data.SoLuongSuDung = soLuongSuDungData.SoLuongSuDung;
        data.SoLuongChuaSuDung = totalUserHaveSoDinhDanh.TotalUser - soLuongSuDungData.SoLuongSuDung;

        return Result<TinhHinhSuDungTaiLieuResponse>.Success(data: data);
    }

    private class CountUser
    {
        public int TotalUser { get; set; } = 0;
    }
}
