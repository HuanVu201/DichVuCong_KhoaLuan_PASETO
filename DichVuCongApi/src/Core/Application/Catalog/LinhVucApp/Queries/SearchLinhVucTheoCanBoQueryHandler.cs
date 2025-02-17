using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.LinhVucApp;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.LinhVucApp.Queries;

public class SearchLinhVucTheoCanBoQueryWhereBuilder
{
    public static string Build(SearchLinhVucTheoCanBoQuery req)
    {
        string tableName = "Catalog.LinhVucs";
        string thuTucsTableName = "[Catalog].[ThuTucs]";
        string donViThuTucTableName = "[Catalog].[DonViThuTucs]";
        string where = "NguoiTiepNhanId like '%' + @NguoiTiepNhanId +'%' ";
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
public class SearchLinhVucTheoCanBoQueryHandler : IRequestHandler<SearchLinhVucTheoCanBoQuery, PaginationResponse<LinhVucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly string tableName = "Catalog.LinhVucs";
    private readonly string thuTucsTableName = "[Catalog].[ThuTucs]";
    private readonly string donViThuTucTableName = "[Catalog].[DonViThuTucs]";
    public SearchLinhVucTheoCanBoQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<LinhVucDto>> Handle(SearchLinhVucTheoCanBoQuery request, CancellationToken cancellationToken)
    {
        var where = SearchLinhVucTheoCanBoQueryWhereBuilder.Build(request);
        var sql = $"SELECT distinct {tableName}.ID, {tableName}.Ten, {tableName}.Ma, {tableName}.MaNganh, SoLuongThuTucCapTinh,SoLuongThuTucCapHuyen,SoLuongThuTucCapXa FROM {tableName} " +
            $"LEFT JOIN {thuTucsTableName} " +
            $"ON {tableName}.Ma = {thuTucsTableName}.MaLinhVucChinh " +
            $"INNER JOIN {donViThuTucTableName} " +
            $"ON {thuTucsTableName}.MaTTHC = {donViThuTucTableName}.MaTTHC " +
            $" {where} " 
            ;
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<LinhVucDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, new
        {
            NguoiTiepNhanId = request.NguoiTiepNhanId,
        });
        return data;
    }
}
