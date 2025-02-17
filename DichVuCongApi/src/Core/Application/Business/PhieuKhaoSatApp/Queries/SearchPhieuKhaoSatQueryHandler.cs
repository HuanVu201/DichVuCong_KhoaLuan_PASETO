using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.ActionApp.Queries;
using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;
using TD.DichVuCongApi.Application.Catalog.ConfigApp;
using TD.DichVuCongApi.Application.Common.Caching;
using System.Text.RegularExpressions;
using TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using TD.DichVuCongApi.Application.Business.LogDGHLCongDanApp;

namespace TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Queries;
public class SearchPhieuKhaoSatWhereBuilder
{
    public static string Build(SearchPhieuKhaoSatQuery req)
    {
        string where = "[Type] = 'don-vi'";
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND pks.MaHoSo = @MaHoSo";
        if (!string.IsNullOrEmpty(req.DonVi))
        {
            if(req.TatCa == true)
                 where += " AND (ofGroupCode = @DonVi OR GroupCode = @DonVi)";
            else
                 where += " AND  GroupCode = @DonVi";
        }

        if (req.Removed == false)
            where += " AND DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchPhieuKhaoSatQueryHandler : IRequestHandler<SearchPhieuKhaoSatQuery, PaginationResponse<PhieuKhaoSatDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchPhieuKhaoSatQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<PhieuKhaoSatDto>> Handle(SearchPhieuKhaoSatQuery request, CancellationToken cancellationToken)
    {
        var where = SearchPhieuKhaoSatWhereBuilder.Build(request);
        var whereNgayTao = string.Empty;
        if (request.TuNgay != null && request.DenNgay != null)
        {
            whereNgayTao = "WHERE CONVERT(DATE, NgayTao, 23) >= @TuNgay AND CONVERT(DATE, NgayTao, 23) <= @DenNgay";
        }
        else if (request.TuNgay != null)
        {
            whereNgayTao = "WHERE CONVERT(DATE, NgayTao, 23) >= @TuNgay";
        }
        else if (request.DenNgay != null)
        {
            whereNgayTao = "WHERE CONVERT(DATE, NgayTao, 23) <= @DenNgay";
        }

        if (!string.IsNullOrEmpty(request.Quy) && !string.IsNullOrEmpty(request.Nam))
        {
            // Chuyển đổi quý từ chuỗi sang số nguyên
            if (int.TryParse(request.Quy, out int quy))
            {
                int thangBatDau = (quy - 1) * 3 + 1; // Quý 1: tháng 1, Quý 2: tháng 4, Quý 3: tháng 7, Quý 4: tháng 10
                int thangKetThuc = thangBatDau + 2;

                if (!string.IsNullOrEmpty(whereNgayTao))
                {
                    whereNgayTao += " AND"; // Nếu đã có điều kiện WHERE, thêm AND để nối các điều kiện
                }
                else
                {
                    whereNgayTao = "WHERE"; // Nếu chưa có điều kiện WHERE, bắt đầu với WHERE
                }

                whereNgayTao += $" (YEAR(NgayTao) = @Nam AND MONTH(NgayTao) BETWEEN {thangBatDau} AND {thangKetThuc})";
            }
        }
        else if (!string.IsNullOrEmpty(request.Quy))
        {
            if (int.TryParse(request.Quy, out int quy))
            {
                int thangBatDau = (quy - 1) * 3 + 1;
                int thangKetThuc = thangBatDau + 2;

                if (!string.IsNullOrEmpty(whereNgayTao))
                {
                    whereNgayTao += " AND";
                }
                else
                {
                    whereNgayTao = "WHERE";
                }

                whereNgayTao += $" (MONTH(NgayTao) BETWEEN {thangBatDau} AND {thangKetThuc})";
            }
        }
        else if (!string.IsNullOrEmpty(request.Nam))
        {
            if (!string.IsNullOrEmpty(whereNgayTao))
            {
                whereNgayTao += " AND";
            }
            else
            {
                whereNgayTao = "WHERE";
            }

            whereNgayTao += $" YEAR(NgayTao) = @Nam";
        }
        var sql = $@"SELECT g.GroupName,
                      pks.Id, 
                      pks.[MaHoSo], 
                      pks.DonVi, 
                      pks.NgayTao,
                      pks.MucDoRHL,
                      pks.MucDoHL,
                      pks.MucDoKHL,
                      CAST(pks.[TraLoi1] AS INT) AS ChiSo1, 
                      CAST(pks.[TraLoi2] AS INT) AS ChiSo2, 
                      CAST(pks.[TraLoi3] AS INT) AS ChiSo3, 
                      CAST(pks.[TraLoi4] AS INT) AS ChiSo4, 
                      CAST(pks.[TraLoi6] AS INT) AS ChiSo6, 
                      CAST(pks.[TraLoi7] AS INT) AS ChiSo7, 
                      CAST(pks.[TraLoi10] AS INT) AS ChiSo10, 
                      CAST(pks.[TraLoi11] AS INT) AS ChiSo11, 
                      CAST(pks.[TraLoi1] AS INT) + CAST(pks.[TraLoi2] AS INT) + CAST(pks.[TraLoi3] AS INT) + CAST(pks.[TraLoi4] AS INT) + CAST(pks.[TraLoi6] AS INT) + CAST(pks.[TraLoi7] AS INT) AS TongDiem, 
                      CASE WHEN CAST(pks.[TraLoi1] AS INT) + CAST(pks.[TraLoi2] AS INT) + CAST(pks.[TraLoi3] AS INT) + CAST(pks.[TraLoi4] AS INT) + CAST(pks.[TraLoi6] AS INT) + CAST(pks.[TraLoi7] AS INT) >= 5 THEN '100%' WHEN CAST(pks.[TraLoi1] AS INT) + CAST(pks.[TraLoi2] AS INT) + CAST(pks.[TraLoi3] AS INT) + CAST(pks.[TraLoi4] AS INT) + CAST(pks.[TraLoi6] AS INT) + CAST(pks.[TraLoi7] AS INT) >= 3.5 
                      AND CAST(pks.[TraLoi1] AS INT) + CAST(pks.[TraLoi2] AS INT) + CAST(pks.[TraLoi3] AS INT) + CAST(pks.[TraLoi4] AS INT) + CAST(pks.[TraLoi6] AS INT) + CAST(pks.[TraLoi7] AS INT) < 5 THEN '70 - 100%' ELSE '< 3.5' END AS xepLoai 
                    FROM 
                      [Business].[PhieuKhaoSats] pks 
                      inner join (
                        SELECT 
                          DISTINCT ID, 
                          GroupCode, 
                          GroupName, 
                          OfGroupCode, 
                          OfGroupName, 
                          Type, 
                          Catalog, 
                          OtherCatalog, 
                          GroupOrder, 
                          MaDinhDanh, 
                          DeletedOn 
                        FROM 
                          [Catalog].[Groups] g
                        {where}
                      ) as g on g.GroupCode = pks.DonVi {whereNgayTao}
                        ";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<PhieuKhaoSatDto>(sql, request.PageSize, "NgayTao Desc", cancellationToken, request.PageNumber, new
        {
            DonVi = request.DonVi,
            TuNgay = request.TuNgay,
            DenNgay = request.DenNgay,
            Nam = request.Nam,
            Quy = request.Quy,
        });
        return data;

    }
}
