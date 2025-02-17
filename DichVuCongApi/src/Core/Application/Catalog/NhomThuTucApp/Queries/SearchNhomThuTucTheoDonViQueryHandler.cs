using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.NhomThuTucApp;
using TD.DichVuCongApi.Application.Catalog.NhomThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.NhomThuTucApp.Queries;

public class SearchNhomThuTucTheoDonViQueryWhereBuilder
{
    public static string Build(SearchNhomThuTucTheoDonViQuery req)
    {
        string tableName = "Catalog.NhomThuTucs";
        string thuTucsTableName = "[Catalog].[ThuTucs]";
        string donViThuTucTableName = "[Catalog].[DonViThuTucs]";
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ten))
            where += $" AND {tableName}.Ten Like N'%' + @Ten + '%'";
        if (!string.IsNullOrEmpty(req.Ma))
            where += $" AND {tableName}.Ma Like N'%' + @Ma + '%'";
        if (!string.IsNullOrEmpty(req.MaNganh))
            where += $" AND {tableName}.MaNganh Like N'%' + @MaNganh + '%'";
        if (!string.IsNullOrEmpty(req.DonViId))
            where += $" AND {donViThuTucTableName}.DonViId = @DonViId ";
        if (req.HasThuTuc.HasValue)
            where += $" AND {tableName}.SoLuongThuTuc > 0";
        if (req.HasThuTucCapTinh.HasValue)
            where += $" AND {tableName}.SoLuongThuTucCapTinh > 0";
        if (req.HasThuTucCapHuyen.HasValue)
            where += $" AND {tableName}.SoLuongThuTucCapHuyen > 0";
        if (req.HasThuTucCapXa.HasValue)
            where += $" AND {tableName}.SoLuongThuTucCapXa > 0";
        where += $" AND {tableName}.SuDung = 1";

        if (req.Removed == false)
            where += $" AND {tableName}.DeletedOn is null";
        else if (req.Removed == true)
            where += $" AND {tableName}.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchNhomThuTucTheoDonViQueryHandler : IRequestHandler<SearchNhomThuTucTheoDonViQuery, PaginationResponse<NhomThuTucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly string tableName = "Catalog.NhomThuTucs";
    private readonly string thuTucsTableName = "[Catalog].[ThuTucs]";
    private readonly string donViThuTucTableName = "[Catalog].[DonViThuTucs]";
    public SearchNhomThuTucTheoDonViQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<NhomThuTucDto>> Handle(SearchNhomThuTucTheoDonViQuery request, CancellationToken cancellationToken)
    {
        var where = SearchNhomThuTucTheoDonViQueryWhereBuilder.Build(request);
        var sql = $"SELECT {tableName}.ID, {tableName}.Ten, {tableName}.Ma, {tableName}.MaNganh FROM {tableName} " +
            $"LEFT JOIN {thuTucsTableName} " +
            $"ON {tableName}.Ma = {thuTucsTableName}.MaNhomThuTucChinh " +
            $"INNER JOIN {donViThuTucTableName} " +
            $"ON {thuTucsTableName}.MaTTHC = {donViThuTucTableName}.MaTTHC " +
            $" {where} " +
            $"GROUP BY {tableName}.ID, {tableName}.Ten, {tableName}.Ma, {tableName}.MaNganh";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<NhomThuTucDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
