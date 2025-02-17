using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;

namespace TD.DichVuCongApi.Application.Statistics.HoSo;
public class HoSoXuLyQueryHandler : IQueryHandler<HoSoXuLyQuery, HoSoXuLyDto>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly ICacheService _cacheService;
    public HoSoXuLyQueryHandler(IDapperRepository dapperRepository, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheService;
    }
    public async Task<Result<HoSoXuLyDto>> Handle(HoSoXuLyQuery request, CancellationToken cancellationToken)
    {
        var cons = new BaoCaoTongHopConstants();
        var builder = new ThongKeWhereBuilder(request.TuNgay, request.DenNgay, null, null);
        var where = builder.where;
        string sqlGetData = @$"SELECT 
            SUM(case when {where.DaXuLyDungHanVaTruocHan} then 1 else 0 end) as DaHoanThanhDungHan,
            SUM(case when {where.DaXuLyQuaHan} then 1 else 0 end) as DaHoanThanhQuaHan,
            SUM(case when {where.TiepNhan} then 1 else 0 end) as DaTiepNhan,
            SUM(case when {where.DaXuLy} then 1 else 0 end) as DaGiaiQuyet,
            SUM(case when {where.TiepNhan} then 1 else 0 end) - SUM(case when {where.DaXuLy} then 1 else 0 end) as DangXuLy,
            SUM(case when {where.TiepNhanTrucTiep} then 1 else 0 end) as TiepNhanTrucTiep,
            SUM(case when {where.TiepNhanQuaBCCI} then 1 else 0 end) as TiepNhanQuaBCCI,
            SUM(case when {where.TiepNhanQuaMang} then 1 else 0 end) as TiepNhanQuaMang
            FROM {hoSoTableName}
            where {hoSoTableName}.NgayTiepNhan >= @TuNgay AND {hoSoTableName}.NgayTiepNhan <= @DenNgay";
        //if (request.Month != null)
        //{
        //    sqlGetData += " AND MONTH(NgayTiepNhan) = @Month";
        //}
        //if (request.Year != null)
        //{
        //    sqlGetData += " AND YEAR(NgayTiepNhan) = @Year";
        //}

        var data = await _cacheService.GetOrSetAsync(request,
            async () => await _dapperRepository.QueryFirstOrDefaultAsync<HoSoXuLyDto>(sqlGetData, request, cancellationToken: cancellationToken), TimeSpan.FromMinutes(request.CacheTime ?? 30),
            cancellationToken);
        return Result<HoSoXuLyDto>.Success(data);
    }
}
