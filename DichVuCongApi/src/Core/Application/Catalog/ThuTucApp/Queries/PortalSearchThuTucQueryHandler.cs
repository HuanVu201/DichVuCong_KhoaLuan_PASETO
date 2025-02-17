using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;

public class PortalSearchThuTucQueryWhereBuilder
{
    public static string Build(PortalSearchThuTucQuery req)
    {
        string where = string.Empty;
        where += " AND tt.MucDo is not null AND tt.MucDo <> ''";
        if (!string.IsNullOrEmpty(req.TenTTHC))
            where += " AND tt.TenTTHC Like '%' + @TenTTHC + '%'";
        if (req.LaTieuBieu.HasValue)
            where += " AND tt.LaTieuBieu = @LaTieuBieu ";
        if (!string.IsNullOrEmpty(req.TuKhoa))
            where += " AND (tt.TenTTHC Like '%' + @TuKhoa + '%' OR tt.MaTTHC Like '%' + @TuKhoa + '%')";
        if (!string.IsNullOrEmpty(req.MaTTHC))
            where += " AND  tt.MaTTHC Like '%' + @MaTTHC + '%'";
        if (!string.IsNullOrEmpty(req.LoaiTTHC))
            where += " AND  tt.LoaiTTHC = @LoaiTTHC";
        if (!string.IsNullOrEmpty(req.MaLinhVucChinh))
            where += " AND tt.MaLinhVucChinh = @MaLinhVucChinh";
        if (!string.IsNullOrEmpty(req.DoiTuongThucHien))
            where += " AND EXISTS ( SELECT 1 FROM OPENJSON(tt.GoiTinThuTucQG, '$.DOITUONGTHUCHIEN') WITH (MADOITUONG NVARCHAR(100) '$.MADOITUONG') AS DoiTuongThucHien WHERE DoiTuongThucHien.MADOITUONG = @DoiTuongThucHien)";
        if (!string.IsNullOrEmpty(req.DonVi) && !string.IsNullOrEmpty(req.MucDo))
        {
            where += " AND dv.MucDoDVTT = @MucDo";
        }
        else if (!string.IsNullOrEmpty(req.MucDo)) where += " AND tt.MucDo = @MucDo";
        if(req.LaTTHCTrucTuyen == true)
        {
            where += " AND tt.MucDo != '2' ";
        }

        if (!string.IsNullOrEmpty(req.TuKhoa))
            where += " AND (tt.TenTTHC Like '%' + @TuKhoa + '%' OR tt.MaTTHC Like '%' + @TuKhoa + '%')";
        if (!string.IsNullOrEmpty(req.NguoiTiepNhanId))
            where += " AND dv.NguoiTiepNhanId like '%' + @NguoiTiepNhanId +'%'";
        if (!string.IsNullOrEmpty(req.CapThucHien))
            where += " AND tt.CapThucHien Like '%' + @CapThucHien +'%'";
        if(req.SuDung.HasValue)
        {
            where += " AND tt.SuDung = @SuDung ";
        }

        if (req.Removed == false)
            where += " AND tt.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND tt.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class PortalSearchThuTucQueryHandler : IRequestHandler<PortalSearchThuTucQuery, PaginationResponse<ThuTucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public PortalSearchThuTucQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    private string GetOrderBy(string[]? keys)
    {
        List<string> res = new List<string>();
        if (keys == null)
        {
            return "HoSoPhatSinhTrongNam DESC, MaTTHC ASC";
        }
        Dictionary<string, string> result = new Dictionary<string, string>();
        result.Add("ThuTu ASC", "ThuTu ASC");
        for (int i = 0; i < keys.Count(); i++)
        {
            var key = keys[i];
            if (result.ContainsKey(key))
            {
                res.Add(result[key]);
            }
        }
        if (res.Count > 0)
            return string.Join(",", res);
        else return "HoSoPhatSinhTrongNam DESC, MaTTHC ASC";
    }
    public async Task<PaginationResponse<ThuTucDto>> Handle(PortalSearchThuTucQuery request, CancellationToken cancellationToken)
    {
        var where = PortalSearchThuTucQueryWhereBuilder.Build(request);
        var searchByGroupCode = string.Empty;
        string orderBy = GetOrderBy(request.OrderBy);
        if (!string.IsNullOrEmpty(request.DonVi))
        {
            searchByGroupCode = @$"INNER JOIN (
	                select distinct dvtt.MaTTHC, dvtt.NguoiTiepNhanId, dvtt.MucDo AS MucDoDVTT from Catalog.DonViThuTucs dvtt where
	                dvtt.DonViId = @DonVi and dvtt.DeletedOn is null
                ) as dv on tt.MaTTHC = dv.MaTTHC";
        }
        var sql = $"SELECT ID, tt.MaTTHC,TenTTHC, MaLinhVucChinh, LinhVucChinh, CapThucHien, MucDo, " +
            $"LoaiTTHC, LienThong, HoSoPhatSinhTrongNam, ThuTu FROM Catalog.ThuTucs tt {searchByGroupCode} {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThuTucDto>(sql, request.PageSize, orderBy, cancellationToken, request.PageNumber, request);

        return data;
    }
}
