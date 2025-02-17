using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucThuocLoaiApp;
using TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucThuocLoaiApp.Queries;
 
public class SearchThuTucThuocLoaiTheoBaoCaoTongHopQueryHandler : IRequestHandler<SearchThuTucThuocLoaiTheoBaoCaoTongHopQuery, PaginationResponse<ThuTucThuocLoaiDto>>
{
    private readonly string linhVucTableName = "Catalog.ThuTucThuocLoais";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly string donViThuTucTableName = "Catalog.DonViThuTucs";
    private readonly string groupsTableName = "Catalog.Groups";
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    public SearchThuTucThuocLoaiTheoBaoCaoTongHopQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
    } 
    public async Task<PaginationResponse<ThuTucThuocLoaiDto>> Handle(SearchThuTucThuocLoaiTheoBaoCaoTongHopQuery request, CancellationToken cancellationToken)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(request.Ten))
            where += $" AND {linhVucTableName}.Ten Like N'%' + @Ten + '%'";
        if (!string.IsNullOrEmpty(request.Ma))
            where += $" AND {linhVucTableName}.Ma Like N'%' + @Ma + '%'";
        if (!string.IsNullOrEmpty(request.MaNganh))
            where += $" AND {linhVucTableName}.MaNganh Like N'%' + @MaNganh + '%'";
        if (!string.IsNullOrEmpty(request.MaDonVi))
            where += $" AND {groupsTableName}.MaDonVi  = @MaDonVi";
        if (!string.IsNullOrEmpty(request.MaDinhDanh))
            where += $" AND {groupsTableName}.MaDinhDanh  = @MaDinhDanh";
        if (!string.IsNullOrEmpty(request.MaDinhDanhCha))
        {
            if (request.ChiBaoGomDonViCon == true)
            {
                where += $" AND ({groupsTableName}.MaDinhDanh Like @MaDinhDanhCha +'%' AND {groupsTableName}.MaDinhDanh != @MaDinhDanhCha) ";
            }
            else
            {
                where += $" AND {groupsTableName}.MaDinhDanh Like @MaDinhDanhCha +'%' ";
            }
        }
        if (!string.IsNullOrEmpty(request.Catalog) && string.IsNullOrEmpty(request.MaDinhDanh) && string.IsNullOrEmpty(request.MaDinhDanhCha))
        {
            //if(request.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH)
            //{
            //    where += $" AND {linhVucTableName}.SoLuongThuTucCapTinh IS NOT NULL AND {linhVucTableName}.SoLuongThuTucCapTinh >0 ";
            //}
            //else if (request.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.QUAN_HUYEN)
            //{
            //    where += $" AND {linhVucTableName}.SoLuongThuTucCapHuyen IS NOT NULL AND {linhVucTableName}.SoLuongThuTucCapHuyen >0 ";
            //}
            //else if (request.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.XA_PHUONG)
            //{
            //    where += $" AND {linhVucTableName}.SoLuongThuTucCapXa IS NOT NULL AND {linhVucTableName}.SoLuongThuTucCapXa >0 ";
            //}
            where += $" AND {groupsTableName}.Catalog  = @Catalog ";
        }
        if (request.Removed == false)
            where += $" AND {linhVucTableName}.DeletedOn is null  AND {thuTucTableName}.DeletedOn is null ";
        else if (request.Removed == true)
            where += $" AND {linhVucTableName}.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            where = $" WHERE ({where})";
        var sql = $"SELECT DISTINCT {linhVucTableName}.ID, {linhVucTableName}.Ten, {linhVucTableName}.Ma, {linhVucTableName}.MaNganh, " +
            $"{linhVucTableName}.SoLuongThuTucCapTinh, {linhVucTableName}.SoLuongThuTucCapHuyen, {linhVucTableName}.SoLuongThuTucCapXa FROM {linhVucTableName} " +
            $" INNER JOIN {thuTucTableName} " +
            $"ON {linhVucTableName}.Ma = {thuTucTableName}.MaThuTucThuocLoaiChinh ";
           
        if(string.IsNullOrEmpty(request.MaDinhDanh) && string.IsNullOrEmpty(request.MaDonVi)
            && string.IsNullOrEmpty(request.MaDinhDanhCha) && string.IsNullOrEmpty(request.Catalog))
        {
            sql += where;
        }
        else
        {
            sql += $"INNER JOIN {donViThuTucTableName} " +
            $"ON {thuTucTableName}.MaTTHC = {donViThuTucTableName}.MaTTHC "+
            $"INNER JOIN {groupsTableName} " +
            $"ON {groupsTableName}.GroupCode = {donViThuTucTableName}.DonViId " +
            $"{where} AND {groupsTableName}.DeletedOn is null  AND {donViThuTucTableName}.DeletedOn is null ";
        }
           
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThuTucThuocLoaiDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
