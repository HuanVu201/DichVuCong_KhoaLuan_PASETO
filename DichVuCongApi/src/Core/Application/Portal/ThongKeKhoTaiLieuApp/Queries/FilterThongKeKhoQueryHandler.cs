using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

namespace TD.DichVuCongApi.Application.Portal.ThongKeKhoTaiLieuApp.Queries;
public class FilterThongKeKhoQueryWhereBuilder
{
    public static string Build(FilterThongKeKhoQuery req)
    {
        string where = string.Empty;

        if (!string.IsNullOrEmpty(req.DoiTuong))
        {
            if (req.DoiTuong.ToLower().Contains("congdan"))
            {
                where += " AND NgayThangNamSinh is not null";
            }
            else
            {
                where += " AND NgayThangNamSinh is null";
            }
        }

        if (!string.IsNullOrEmpty(req.FullName))
            where += " AND u.FullName Like N'%' + @FullName + '%'";
        if (!string.IsNullOrEmpty(req.UserName))
            where += " AND u.UserName Like N'%' + @UserName + '%'";
        if (!string.IsNullOrEmpty(req.SoDinhDanh))
            where += " AND u.SoDinhDanh Like N'%' + @SoDinhDanh + '%'";
        if (!string.IsNullOrEmpty(req.PhoneNumber))
            where += " AND u.PhoneNumber Like N'%' + @PhoneNumber + '%'";
        if (req.TuNgay.HasValue)
            where += " AND kho.CreatedOn >= @TuNgay";
        if (req.DenNgay.HasValue)
            where += " AND kho.CreatedOn <= @DenNgay";

        return where;
    }
}
public class FilterThongKeKhoQueryHandler : IRequestHandler<FilterThongKeKhoQuery, PaginationResponse<ThongKeKhoTaiLieuDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public FilterThongKeKhoQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<ThongKeKhoTaiLieuDto>> Handle(FilterThongKeKhoQuery request, CancellationToken cancellationToken)
    {
        var where = FilterThongKeKhoQueryWhereBuilder.Build(request);
        var sql = $@"SELECT u.Id, u.SoDinhDanh, u.UserName, u.FullName, u.PhoneNumber,
                        COUNT(DISTINCT kho.Id) AS SoLuongKho,
                        SUM(DISTINCT kho.dungLuong) AS TongDungLuong,
                        COUNT(gt.Id) AS SoLuongGiayTo
                    FROM [Identity].[Users] u
                    INNER JOIN [Business].[KhoTaiLieuDienTus] kho ON u.SoDinhDanh = kho.SoDinhDanh
                    LEFT JOIN [Business].[GiayToSoHoas] gt ON kho.Id = gt.KhoTaiLieuDienTuId
                    WHERE u.TypeUser = 'CongDan' AND u.SoDinhDanh IS NOT NULL AND kho.DeletedOn IS NULL {where}
                    GROUP BY u.Id, u.SoDinhDanh, u.UserName, u.FullName, u.PhoneNumber";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThongKeKhoTaiLieuDto>(sql, request.PageSize, "Id", cancellationToken, request.PageNumber, request);
        return data;
    }
}