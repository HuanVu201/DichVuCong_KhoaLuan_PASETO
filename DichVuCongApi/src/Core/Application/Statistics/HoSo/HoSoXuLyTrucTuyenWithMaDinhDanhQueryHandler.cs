using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Statistics.HoSo;
public class HoSoXuLyTrucTuyenWithMaDinhDanhQueryHandler : IQueryHandler<HoSoXuLyTrucTuyenWithMaDinhDanhQuery, HoSoXuLyTrucTuyenWithMaDinhDanhDto>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly ICacheService _cacheService;
    public HoSoXuLyTrucTuyenWithMaDinhDanhQueryHandler(IDapperRepository dapperRepository, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheService;
    }
    public async Task<Result<HoSoXuLyTrucTuyenWithMaDinhDanhDto>> Handle(HoSoXuLyTrucTuyenWithMaDinhDanhQuery request, CancellationToken cancellationToken)
    {
        string queryMaDinhDanh = string.Empty;
        if (!string.IsNullOrEmpty(request.MaDinhDanh))
        {
            queryMaDinhDanh += " AND g.MaDinhDanh = @MaDinhDanh";
        }

        var cons = new BaoCaoTongHopConstants();
        var builder = new ThongKeWhereBuilder(request.TuNgay, request.DenNgay, null, null);
        var where = builder.where;
        string sqlGetData = @$"SELECT 
            SUM(case when {where.DaXuLyDungHanVaTruocHan} then 1 else 0 end) as DaHoanThanhDungHan,
            SUM(case when {where.DaXuLyQuaHan} then 1 else 0 end) as DaHoanThanhQuaHan
            FROM {hoSoTableName}
            INNER JOIN Catalog.Groups g ON g.GroupCode = Business.HoSos.DonViId
            where {hoSoTableName}.NgayTiepNhan >= @TuNgay AND {hoSoTableName}.NgayTiepNhan <= @DenNgay
            {queryMaDinhDanh}";

        var data = await _cacheService.GetOrSetAsync(request,
            async () => await _dapperRepository.QueryFirstOrDefaultAsync<HoSoXuLyDto>(sqlGetData, request, cancellationToken: cancellationToken), TimeSpan.FromMinutes(request.CacheTime ?? 30),
            cancellationToken);

        HoSoXuLyTrucTuyenWithMaDinhDanhDto tyLeXuLyDungHan = new HoSoXuLyTrucTuyenWithMaDinhDanhDto();

        if (data != null)
        {
            string sqlQueryCoQuan = @"SELECT Catalog, GroupName
                                        FROM [Catalog].[Groups]
                                        WHERE MaDinhDanh = @MaDinhDanh";
            if (!string.IsNullOrEmpty(request.MaDinhDanh))
            {
                var resCoQuan = await _dapperRepository.QueryFirstOrDefaultAsync<GroupDto>(sqlQueryCoQuan, new { MaDinhDanh = request.MaDinhDanh });

                if (resCoQuan != null)
                {
                    tyLeXuLyDungHan.TenDonVi = resCoQuan.GroupName;
                }
            }

            double totalValue = data.DaHoanThanhDungHan + data.DaHoanThanhQuaHan;
            double realValue = totalValue > 0 ? (data.DaHoanThanhDungHan / totalValue) * 100 : 0;
            string tyLeXuLyDungHanResponse;
            if (realValue >= 99.5)
            {
                tyLeXuLyDungHanResponse = string.Format("{0:0.##}", realValue).Replace('.', ',');
            }
            else
            {
                //if (realValue == 0)
                //{
                //    return Result<HoSoXuLyTrucTuyenWithMaDinhDanhDto>.Fail("Không có số liệu thống kê!");
                //}

                if (request.Type == 0)
                {
                    tyLeXuLyDungHanResponse = "99,5";
                }
                else
                {
                    tyLeXuLyDungHanResponse = string.Format("{0:0.##}", realValue).Replace('.', ',');
                }

            }

            tyLeXuLyDungHan.TyLeXuLyDungHan = tyLeXuLyDungHanResponse;
        }

        return Result<HoSoXuLyTrucTuyenWithMaDinhDanhDto>.Success(tyLeXuLyDungHan);
    }
}