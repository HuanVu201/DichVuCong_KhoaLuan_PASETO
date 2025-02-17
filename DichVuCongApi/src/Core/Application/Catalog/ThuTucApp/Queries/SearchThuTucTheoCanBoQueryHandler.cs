using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Identity.Users;
using static TD.DichVuCongApi.Domain.Business.Events.HoSo.HoSoEventUtils;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;

public class SearchThuTucTheoCanBoQueryWhereBuilder
{
    public static string Build(SearchThuTucTheoCanBoQuery req)
    {
        string where = "dv.NguoiTiepNhanId like '%' + @NguoiTiepNhanId +'%'";
        if (!string.IsNullOrEmpty(req.TenTTHC))
            where += " AND tt.TenTTHC Like '%' + @TenTTHC + '%'";
        if (req.LaTieuBieu.HasValue)
            where += " AND tt.LaTieuBieu = @LaTieuBieu ";

        if (!string.IsNullOrEmpty(req.MaTTHC))
            where += " AND  tt.MaTTHC Like '%' + @MaTTHC + '%'";
        if (!string.IsNullOrEmpty(req.LoaiTTHC))
            where += " AND  tt.LoaiTTHC = @LoaiTTHC";
        if (!string.IsNullOrEmpty(req.MaLinhVucChinh))
            where += " AND tt.MaLinhVucChinh = @MaLinhVucChinh";
        if (req.SuDung != null)
            where += " AND tt.SuDung = @SuDung";
        if (req.QuyetDinh == true)
            where += " AND tt.QuyetDinh is not null ";
        else if (req.QuyetDinh == false)
            where += " AND tt.QuyetDinh is null ";
        if (req.TrangThaiPhiLePhi != null)
            where += " AND tt.TrangThaiPhiLePhi = @TrangThaiPhiLePhi";
        if (req.ThucHienTaiBoPhanMotCua != null)
            where += " AND tt.ThucHienTaiBoPhanMotCua = @ThucHienTaiBoPhanMotCua";
        if (!string.IsNullOrEmpty(req.MucDo))
            where += " AND tt.MucDo = @MucDo";
       /* if (!string.IsNullOrEmpty(req.NguoiTiepNhanId))
            where += " AND dv.NguoiTiepNhanId like '%' + @NguoiTiepNhanId +'%'";*/
        if (!string.IsNullOrEmpty(req.CapThucHien))
            where += " AND tt.CapThucHien Like '%' + @CapThucHien +'%'";
        if (req.LaThuTucChungThuc != null)
            where += " AND tt.LaThuTucChungThuc = @LaThuTucChungThuc";
        if (req.LaPhiDiaGioi != null)
            where += " AND tt.LaPhiDiaGioi = @LaPhiDiaGioi";
        if (req.SuDung != null)
            where += " AND tt.SuDung = @SuDung";
        if (!string.IsNullOrEmpty(req.TuKhoa))
            where += " AND (tt.TenTTHC Like '%' + @TuKhoa + '%' OR tt.MaTTHC Like '%' + @TuKhoa + '%')";
        if (req.Removed == false)
            where += " AND tt.DeletedOn is null ";
        else if (req.Removed == true)
            where += " AND tt.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchThuTucTheoCanBoQueryHandler : IRequestHandler<SearchThuTucTheoCanBoQuery, PaginationResponse<ThuTucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly string donViThuTucTableName = "Catalog.DonViThuTucs";
    private readonly string thuTucTableName = "Catalog.ThuTucs";
    private readonly string linhVucTableName = "Catalog.LinhVucs";
    private readonly string groupTableName = "Catalog.Groups";
    private readonly IUserService _userService;
    public SearchThuTucTheoCanBoQueryHandler(IDapperRepository dapperRepository, IUserService userService)
    {
        _dapperRepository = dapperRepository;
        _userService = userService;
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
    public async Task<PaginationResponse<ThuTucDto>> Handle(SearchThuTucTheoCanBoQuery request, CancellationToken cancellationToken)
    {
        var where = SearchThuTucTheoCanBoQueryWhereBuilder.Build(request);
        var searchByGroupCode = string.Empty;
        if (request.currentDonVi == true)
        {
            var currentUser = await _userService.GetCurrentUserAsync(cancellationToken);
            request.DonVi = currentUser.OfficeCode;
        }
        string orderBy = GetOrderBy(request.OrderBy);
        if (!string.IsNullOrEmpty(request.NguoiTiepNhanId) || request.currentDonVi == true)
        {
            searchByGroupCode = @$"INNER JOIN (
	                select distinct dvtt.MaTTHC, dvtt.NguoiTiepNhanId from Catalog.DonViThuTucs dvtt where dvtt.DeletedOn is null)
                    as dv on tt.MaTTHC = dv.MaTTHC";
        }
        var sql = $@"SELECT ID,tt.SuDung,TrangThaiPhiLePhi,QuyetDinh,DinhKemQuyetDinh,ThucHienTaiBoPhanMotCua ,tt.MaTTHC,tt.LaThuTucChungThuc ,TenTTHC, MaLinhVucChinh, LinhVucChinh, NgayCapNhat,CapThucHien, MucDo,
                    LoaiTTHC, LienThong, HoSoPhatSinhTrongNam, ThuTu FROM Catalog.ThuTucs tt {searchByGroupCode} {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<ThuTucDto>(sql, request.PageSize, orderBy, cancellationToken, request.PageNumber, new
        {
            NguoiTiepNhanId = request.NguoiTiepNhanId,
        });

        return data;
    }
}
