using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp;
using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.LogDGHLCongDanApp.Queries;

public class SearchLogThongKeDGHLWhereBuilder
{
    public static string Build(SearchLogThongKeDGHLQuery req)
    {
        string where = "[Type] = 'don-vi'";
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND MaHoSo = @MaHoSo";
        if (!string.IsNullOrEmpty(req.DonVi))
        {
            where += " AND (ofGroupCode = @DonVi OR GroupCode = @DonVi)";
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
public class SearchLogThongKeDGHLQueryHandler : IRequestHandler<SearchLogThongKeDGHLQuery, PaginationResponse<LogThongKeDGHLCongDanDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchLogThongKeDGHLQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<LogThongKeDGHLCongDanDto>> Handle(SearchLogThongKeDGHLQuery request, CancellationToken cancellationToken)
    {
        var where = SearchLogThongKeDGHLWhereBuilder.Build(request);
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
        var sql = $@"SELECT  g.GroupName,
				 logDGHL.Id,logDGHL.DonVi,logDGHL.MaHoSo, logDGHL.NgayTao,logDGHL.TraLoi1,logDGHL.TraLoi2,logDGHL.TraLoi3,logDGHL.TraLoi4,logDGHL.TraLoi5,
                 logDGHL.TraLoi6,logDGHL.TraLoi7,logDGHL.TraLoi8,logDGHL.TraLoi9,logDGHL.TraLoi10,logDGHL.TraLoi11
			        FROM 
			        Business.LogThongKeDGHLCongDans as logDGHL 
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
			            )
                    as g on g.GroupCode = logDGHL.DonVi {whereNgayTao}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<LogThongKeDGHLCongDanDto>(sql, request.PageSize, "NgayTao Desc", cancellationToken, request.PageNumber, new
        {
            DonVi = request.DonVi,
            TuNgay = request.TuNgay,
            DenNgay = request.DenNgay,
        });
        
        return data;
    }
}
