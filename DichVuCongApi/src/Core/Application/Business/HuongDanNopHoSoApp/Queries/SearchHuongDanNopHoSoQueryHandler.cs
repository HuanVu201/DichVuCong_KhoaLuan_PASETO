using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.MenuApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.HuongDanNopHoSoApp.Queries;

public class SearchHuongDanNopHoSoQueryWhereBuilder
{
    private readonly string tableName = "Business.HuongDanNopHoSos";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    public static string Build(SearchHuongDanNopHoSo req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TuKhoa))
            where += $" AND (Business.HuongDanNopHoSos.ChuHoSo Like N'%' + @TuKhoa + '%' OR Catalog.ThuTucs.TenTTHC Like N'%' + @TuKhoa + '%')";
        if (!string.IsNullOrEmpty(req.SoGiayToChuHoSo))
            where += $"AND Business.HuongDanNopHoSos.SoGiayToChuHoSo = @SoGiayToChuHoSo";
        if (req.TuNgay.HasValue)
            where += $"AND Business.HuongDanNopHoSos.NgayTiepNhan >= @TuNgay";
        if (req.DenNgay.HasValue)
            where += $"AND Business.HuongDanNopHoSos.NgayTiepNhan <= @DenNgay";
        if (req.Removed == false)
            where += " AND Business.HuongDanNopHoSos.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND Business.HuongDanNopHoSos.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchHuongDanNopHoSoQueryHandler : IRequestHandler<SearchHuongDanNopHoSo, PaginationResponse<HuongDanNopHoSoDto>>
{
    private readonly string tableName = "Business.HuongDanNopHoSos";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly string groupsTableName = "Catalog.Groups";
    private readonly string usersTableName = "[Identity].[Users]";
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchHuongDanNopHoSoQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<HuongDanNopHoSoDto>> Handle(SearchHuongDanNopHoSo request, CancellationToken cancellationToken)
    {
        var where = SearchHuongDanNopHoSoQueryWhereBuilder.Build(request);
        string tuNgay =  string.Empty;
        string denNgay = string.Empty;
        if(request.TuNgay.HasValue) tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        if (request.DenNgay.HasValue) denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var sql = $"SELECT {tableName}.[ID],{tableName}.[ChuHoSo],{tableName}.[SoDienThoaiChuHoSo],{tableName}.[SoGiayToChuHoSo],{tableName}.[DiaChiChuHoSo],{tableName}.[TrichYeuHoSo]" +
            $",{tableName}.[NgayTiepNhan],{tableName}.[DeletedOn] ,{tableName}.MaTTHC,{thuTucTableName}.TenTTHC, {groupsTableName}.GroupName, {groupsTableName}.Catalog,{tableName}.NguoiNhanHoSo, {usersTableName}.FullName TenNguoiNhanHoSo," +
            $"{usersTableName}.PhoneNumber SoDienThoaiNguoiNhanHoSo " +
            $" FROM {tableName} " +
            $"INNER JOIN {thuTucTableName} " +
            $"ON {tableName}.MaTTHC = {thuTucTableName}.MaTTHC " +
            $"INNER JOIN {groupsTableName} " +
            $"ON {groupsTableName}.GroupCode = {tableName}.DonViId " +
            $"INNER JOIN {usersTableName} " +
            $"ON {usersTableName}.Id = {tableName}.NguoiNhanHoSo" +
            $"{where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HuongDanNopHoSoDto>(sql, request.PageSize, "NgayTiepNhan", cancellationToken, request.PageNumber, new
        {
            TuNgay = tuNgay,
            DenNgay = denNgay,
            TuKhoa = request.TuKhoa,
            SoGiayToChuHoSo = request.SoGiayToChuHoSo
        });
        ;
        return data;
    }
}
