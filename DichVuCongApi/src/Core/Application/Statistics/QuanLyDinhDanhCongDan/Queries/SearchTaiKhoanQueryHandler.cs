using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Statistics.QuanLyDinhDanhCongDan;

public class SearchTaiKhoanQueryWhereBuilder
{
    public static string Build(SearchTaiKhoanQuery req)
    {
        string where = string.Empty;
        where += " AND TypeUser = 'CongDan'";

        if (!string.IsNullOrEmpty(req.DoiTuong))
        {
            if (req.DoiTuong.ToLower().Contains("congdan"))
            {
                where += " AND NgayThangNamSinh is not null";
            }
            else
            {
                where += " AND NgayThangNamSinh is null";
            }
        }

        if (!string.IsNullOrEmpty(req.FullName))
            where += " AND FullName Like N'%' + @FullName + '%'";
        if (!string.IsNullOrEmpty(req.UserName))
            where += " AND UserName Like N'%' + @UserName + '%'";
        if (!string.IsNullOrEmpty(req.Email))
            where += " AND Email Like N'%' + @Email + '%'";
        if (!string.IsNullOrEmpty(req.PhoneNumber))
            where += " AND PhoneNumber Like N'%' + @PhoneNumber + '%'";
        if (req.DaDinhDanh == true)
            where += " AND SoDinhDanh is not null";
        else if (req.DaDinhDanh == false)
            where += " AND SoDinhDanh is null";

        if (!string.IsNullOrEmpty(req.GioiTinh))
            where += " AND GioiTinh Like N'%' + @GioiTinh + '%'";
        if (!string.IsNullOrEmpty(req.DoTuoi))
        {
            string[] value = req.DoTuoi.Split("##");
            string startAge = value[0];
            string endAge = value[1];
            int currentYear = DateTime.Now.Year;

            where += $" AND ({currentYear} - NamSinh) >= {startAge} AND ({currentYear} - NamSinh) <= {endAge}";
        }

        string tuNgay = req.TuNgay.HasValue ? req.TuNgay.Value.ToString("yyyy-MM-dd") : string.Empty;
        string denNgay = req.DenNgay.HasValue ? req.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59") : string.Empty;

        if (!string.IsNullOrEmpty(tuNgay))
            where += $" AND CreatedOn >= '{tuNgay}'";

        if (!string.IsNullOrEmpty(denNgay))
            where += $" AND CreatedOn <= '{denNgay}'";

        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchTaiKhoanQueryHandler : IRequestHandler<SearchTaiKhoanQuery, PaginationResponse<UserAppDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchTaiKhoanQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<UserAppDto>> Handle(SearchTaiKhoanQuery request, CancellationToken cancellationToken)
    {
        string where = SearchTaiKhoanQueryWhereBuilder.Build(request);
        string sql = @$"SELECT u.ID, u.FullName, u.UserName, u.SoDinhDanh, u.Email, u.PhoneNumber,
                            u.GioiTinh, u.NgayThangNamSinh, u.TypeUser, u.LockoutEnabled, 
                    CASE WHEN EXISTS 
	                    (SELECT 1 FROM [Business].[KhoTaiLieuDienTus] kho WHERE kho.SoDinhDanh = u.SoDinhDanh) 
                               THEN 1 ELSE 0 
                         END AS SuDungKhoTaiLieuDienTu
                    FROM [Identity].[Users] u
                    {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<UserAppDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, new
        {
            TuNgay = request.TuNgay,
            DenNgay = request.DenNgay,
            FullName = request.FullName,
            UserName = request.UserName,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            DaDinhDanh = request.DaDinhDanh,
            TypeUser = request.TypeUser,
            DoTuoi = request.DoTuoi,
            GioiTinh = request.GioiTinh,
            DoiTuong = request.DoiTuong,
            PageSize = request.PageSize,
            PageNumber = request.PageNumber,
        });
        return data;
    }
}