using TD.DichVuCongApi.Application.Application.Catalog.LinhVucApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Catalog.LinhVucApp.Queries;
public class SearchDonViLinhVucHandler : IRequestHandler<SearchDonViLinhVucRequest, PaginationResponse<LinhVucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly string tableName = "Catalog.LinhVucs";
    private readonly string thuTucsTableName = "[Catalog].[ThuTucs]";
    private readonly string donViThuTucTableName = "[Catalog].[DonViThuTucs]";
    private readonly string groupTableName = "[Catalog].[Groups]";
    public SearchDonViLinhVucHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public class SearchDonViLinhVucRequestWhereBuilder
    {
        public static string Build(SearchDonViLinhVucRequest req)
        {
            string tableName = "Catalog.LinhVucs";
            TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
            string groupTableName = "[Catalog].[Groups]";
            string where = string.Empty;
            if (!string.IsNullOrEmpty(req.Ten))
                where += $" AND {tableName}.Ten Like N'%' + @Ten + '%'";
            if (!string.IsNullOrEmpty(req.Ma))
                where += $" AND {tableName}.Ma Like N'%' + @Ma + '%'";
            if (!string.IsNullOrEmpty(req.MaNganh))
                where += $" AND {tableName}.MaNganh Like N'%' + @MaNganh + '%'";
            if (!string.IsNullOrEmpty(req.MaDonVi))
                where += $" AND {groupTableName}.MaDonVi  = @MaDonVi";
            if (!string.IsNullOrEmpty(req.MaDinhDanh))
                where += $" AND {groupTableName}.MaDinhDanh  = @MaDinhDanh";
            if (!string.IsNullOrEmpty(req.MaDinhDanhCha))
            {
                if (req.ChiBaoGomDonViCon == true)
                {
                    where += $" AND ({groupTableName}.MaDinhDanh Like @MaDinhDanhCha +'%' AND {groupTableName}.MaDinhDanh != @MaDinhDanhCha) ";
                }
                else
                {
                    where += $" AND {groupTableName}.MaDinhDanh Like @MaDinhDanhCha +'%' ";
                }
            }
            if (!string.IsNullOrEmpty(req.Catalog) && string.IsNullOrEmpty(req.MaDinhDanh) && string.IsNullOrEmpty(req.MaDinhDanhCha))
            {
                //if(req.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH)
                //{
                //    where += $" AND {linhVucTableName}.SoLuongThuTucCapTinh IS NOT NULL AND {linhVucTableName}.SoLuongThuTucCapTinh >0 ";
                //}
                //else if (req.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.QUAN_HUYEN)
                //{
                //    where += $" AND {linhVucTableName}.SoLuongThuTucCapHuyen IS NOT NULL AND {linhVucTableName}.SoLuongThuTucCapHuyen >0 ";
                //}
                //else if (req.Catalog == _tiepNhanHoSoTrucTuyenConstants.CATALOG.XA_PHUONG)
                //{
                //    where += $" AND {linhVucTableName}.SoLuongThuTucCapXa IS NOT NULL AND {linhVucTableName}.SoLuongThuTucCapXa >0 ";
                //}
                if (req.Catalog != _tiepNhanHoSoTrucTuyenConstants.CATALOG.SO_BAN_NGANH && req.Catalog != _tiepNhanHoSoTrucTuyenConstants.CATALOG.QUAN_HUYEN
                     && req.Catalog != _tiepNhanHoSoTrucTuyenConstants.CATALOG.CNVPDK && req.Catalog != _tiepNhanHoSoTrucTuyenConstants.CATALOG.XA_PHUONG)
                {
                    where += $" AND {groupTableName}.DonViQuanLy = @Catalog ";
                }
                else
                {
                    where += $" AND {groupTableName}.Catalog = @Catalog";
                }
            }
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
    public async Task<PaginationResponse<LinhVucDto>> Handle(SearchDonViLinhVucRequest req, CancellationToken cancellationToken)
    {

        string where = SearchDonViLinhVucRequestWhereBuilder.Build(req);
        string sql = $"SELECT DISTINCT {tableName}.ID, {tableName}.Ten, {tableName}.Ma, {tableName}.MaNganh, {groupTableName}.GroupCode, {groupTableName}.GroupName, {groupTableName}.GroupOrder FROM {tableName} " +
          $"INNER JOIN {thuTucsTableName} " +
          $"ON {tableName}.Ma = {thuTucsTableName}.MaLinhVucChinh " +
          $"INNER JOIN {donViThuTucTableName} " +
          $"ON {thuTucsTableName}.MaTTHC = {donViThuTucTableName}.MaTTHC " +
          $"INNER JOIN {groupTableName} " +
          $"ON {donViThuTucTableName}.DonViId = {groupTableName}.GroupCode " +
          $" {where} ";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<LinhVucDto>(sql, req.PageSize, "GroupOrder", cancellationToken, req.PageNumber, req);
        return data;
    }
}
