using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp.Queries;
using TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp;
using TD.DichVuCongApi.Application.Business.DanhGiaHaiLongApp.Queries;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Identity.Users;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using MediatR;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;

public class SearchThongKeLienThongQueryWhereBuilder
{
    public static string Build(ThongKeHSLienThongQuery req)
    {
        string where = string.Empty;
/*        if (!string.IsNullOrEmpty(req.Catalog))
            where += " AND gr.Catalog = @Catalog";*/
        if (!string.IsNullOrEmpty(req.MaDinhDanh))
            where += " AND gr.MaDinhDanh = @MaDinhDanh ";
        if (!string.IsNullOrEmpty(req.MaDinhDanhCha))
        {
            if (req.ChiBaoGomDonViCon == true)
            {
                where += $" AND (gr.MaDinhDanh Like @MaDinhDanhCha +'%' AND gr.MaDinhDanh != @MaDinhDanhCha) ";
            }
            else
            {
                where += $" AND gr.MaDinhDanh Like @MaDinhDanhCha +'%' ";
            }
        }
        if (req.Removed == false)
            where += " AND  hs.DeletedOn is null and gr.GroupCode is not null ";
        else if (req.Removed == true)
            where += " AND gr.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class ThongKeHSLienThongQueryHandler : IRequestHandler<ThongKeHSLienThongQuery, PaginationResponse<ThongKeHSLienThongDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _currentUser;
    public ThongKeHSLienThongQueryHandler(IDapperRepository dapperRepository, IUserService currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<PaginationResponse<ThongKeHSLienThongDto>> Handle(ThongKeHSLienThongQuery request, CancellationToken cancellationToken)
    {
        string whereJoin = string.Empty;
        string whereCatalog = "where type = 'don-vi'";
        string join = "g.MaDinhDanh = gr.MaDinhDanh";
        if (!string.IsNullOrEmpty(request.Catalog))
            whereCatalog += " AND Catalog = @Catalog";
        if (request.TuNgay.HasValue) whereJoin += $" AND hs.NgayNopHoSo >= @TuNgay ";
        if (request.DenNgay.HasValue) whereJoin += $" AND hs.NgayNopHoSo <= @DenNgay ";
        if (request.BaoGomDonViCon == true)
            join = "g.MaDinhDanh like gr.MaDinhDanh + '%'";
        var user = await _currentUser.GetCurrentUserAsync(cancellationToken);
        var where = SearchThongKeLienThongQueryWhereBuilder.Build(request);
        var sql = $@" select gr.MaDinhDanh,gr.GroupName,MAX(gr.GroupCode) as GroupCode,MAX(gr.GroupOrder) as GroupOrder,
            COUNT(hs.Id) as TongSoLuongHoSo,
            COUNT(CASE WHEN hs.LoaiDuLieuKetNoi = 'LTKT' THEN 1 END) AS SoLuongHoSoKT,
            COUNT(CASE WHEN hs.LoaiDuLieuKetNoi = 'LTKS' THEN 1 END) AS SoLuongHoSoKS
            from Business.hosos hs inner join Catalog.Groups g on hs.DonViId = g.GroupCode
            full outer join (SELECT MaDinhDanh,GroupName,GroupOrder,GroupCode from Catalog.Groups {whereCatalog}) gr
            on {join} and LoaiDuLieuKetNoi in ('LTKS', 'LTKT') {whereJoin}
            {where}
            group by gr.MaDinhDanh,gr.GroupName
          ";
        /*     var sql = $@"SELECT 
                   gr.GroupName,MAX(gr.GroupCode) as GroupCode,MAX(gr.GroupOrder) as GroupOrder,MAX(gr.MaDinhDanh) as MaDinhDanh,
                   COUNT(CASE WHEN hs.LoaiDuLieuKetNoi = 'LTKT' THEN 1 END) AS SoLuongHoSoKT,
                   COUNT(CASE WHEN hs.LoaiDuLieuKetNoi = 'LTKS' THEN 1 END) AS SoLuongHoSoKS,
                   COUNT(CASE WHEN hs.LoaiDuLieuKetNoi = 'LTKT' THEN 1 END) + 
                   COUNT(CASE WHEN hs.LoaiDuLieuKetNoi = 'LTKS' THEN 1 END) AS TongSoLuongHoSo
                   FROM [Business].[HoSos] hs
                   FULL OUTER JOIN Catalog.Groups gr on gr.GroupCode = hs.DonViId {whereJoin}
                   {where}
                   GROUP BY GroupName ";*/

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThongKeHSLienThongDto>(sql, request.PageSize, request.OrderBy != null && request.OrderBy.Length > 0 ? request.OrderBy : new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray(), cancellationToken, request.PageNumber, new
        {
            Catalog = request.Catalog,
            MaDinhDanh = request.MaDinhDanh,
            MaDinhDanhCha = request.MaDinhDanhCha,
            TuNgay = request.TuNgay,
            DenNgay = request.DenNgay,
        }, "GroupCode");

        return data;
    }
}
