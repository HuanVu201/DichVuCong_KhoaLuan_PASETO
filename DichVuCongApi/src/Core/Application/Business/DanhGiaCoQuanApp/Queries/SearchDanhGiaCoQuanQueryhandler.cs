using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp;
using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Business.LogDGHLCongDanApp;
using TD.DichVuCongApi.Application.Identity.Users;

namespace TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp.Queries;
public class SearchDanhGiaCoQuanWhereBuilder
{
    public static string Build(SearchDanhGiaCoQuanQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Quy))
            where += " AND dgcq.Quy = @Quy";
        if (!string.IsNullOrEmpty(req.Catalog))
            where += " AND Catalog = @Catalog ";
        if (!string.IsNullOrEmpty(req.Nam))
            where += " AND dgcq.Nam = @Nam";
        if (!string.IsNullOrEmpty(req.DonVi))
            where += " AND dgcq.DonVi = @DonVi";
       /* if (req.LayDonViCon == true)
            where += " AND (ofGroupCode = @UserGroupCode OR GroupCode = @UserGroupCode)";*/
        if (!string.IsNullOrEmpty(req.MaDinhDanh))
            where += " AND MaDinhDanh = @MaDinhDanh ";
        if (!string.IsNullOrEmpty(req.MaDinhDanhCha))
        {
            if (req.LayDonViCon == true)
            {
                where += $" AND (g.MaDinhDanh Like @MaDinhDanhCha +'%' AND g.MaDinhDanh != @MaDinhDanhCha) ";
            }
            else
            {
                where += $" AND g.MaDinhDanh Like @MaDinhDanhCha +'%' ";
            }
        }
        if (req.Removed == false)
            where += " AND dgcq.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND dgcq.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchDanhGiaCoQuanQueryhandler : IRequestHandler<SearchDanhGiaCoQuanQuery, PaginationResponse<DanhGiaCoQuanDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _currentUser;

    public SearchDanhGiaCoQuanQueryhandler(IDapperRepository dapperRepository, IUserService currentUser) {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    } 
    public async Task<PaginationResponse<DanhGiaCoQuanDto>> Handle(SearchDanhGiaCoQuanQuery request, CancellationToken cancellationToken)
    {
        var user = await _currentUser.GetCurrentUserAsync(cancellationToken);
        var where = SearchDanhGiaCoQuanWhereBuilder.Build(request);
        var sql = $@"SELECT g.GroupName,g.GroupCode,dgcq.Quy,dgcq.Nam,dgcq.SoPhieu,dgcq.MucDoRHL,dgcq.MucDoHL,dgcq.MucDoKHL,
				 dgcq.Id,dgcq.DonVi,dgcq.MaHoSo,dgcq.TraLoi1,dgcq.TraLoi2,dgcq.TraLoi3,dgcq.TraLoi4,dgcq.TraLoi5,
                 dgcq.TraLoi6,dgcq.TraLoi7,dgcq.TraLoi8,dgcq.TraLoi9,dgcq.TraLoi10,dgcq.TraLoi11
			        FROM 
			        Business.DanhGiaCoQuans as dgcq 
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
         
			            )
                    as g on g.GroupCode = dgcq.DonVi {where} AND  g.Type = 'don-vi'";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhGiaCoQuanDto>(sql, request.PageSize, request.OrderBy != null && request.OrderBy.Length > 0 ? request.OrderBy : new List<string>() { "GroupCode" }.ToArray(), cancellationToken, request.PageNumber, new
        {
            DonVi = request.DonVi,
            Quy = request.Quy,
            Nam = request.Nam,
            Catalog = request.Catalog,
            MaDinhDanh = request.MaDinhDanh,
            MaDinhDanhCha = request.MaDinhDanhCha,
            /*            MaDinhDanhCha = user.MaDinhDanhOfficeCode
            */
        });

        return data;
    }
}
