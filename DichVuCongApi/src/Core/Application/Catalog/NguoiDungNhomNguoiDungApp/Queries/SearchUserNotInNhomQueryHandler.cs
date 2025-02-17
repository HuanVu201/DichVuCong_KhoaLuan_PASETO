using TD.DichVuCongApi.Application.Business.ActionApp;
using TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp;
using TD.DichVuCongApi.Application.Business.ScreenActionApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.NguoiDungNhomNguoiDungApp.Queries;

public class SearchUserNotInNhomQueryWhereBuilder
{
    public static string Build(SearchUserNotInNhomQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.NhomNguoiDungId))
            where += " AND NND.NhomNguoiDungId = @NhomNguoiDungId ";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchUserNotInNhomQueryWhereOuterBuilder
{
    public static string Build(SearchUserNotInNhomQuery req)
    {
        string where = " AND U.TypeUser = 'CanBo'";
        if (!string.IsNullOrEmpty(req.PositionName))
            where += " AND U.PositionName = @PositionName ";
        if (!string.IsNullOrEmpty(req.ChucDanh))
            where += " AND U.ChucDanh Like '%' + @ChucDanh + '%'";
        if (!string.IsNullOrEmpty(req.OfficeCode))
            where += " AND U.OfficeCode = @OfficeCode ";
        if (!string.IsNullOrEmpty(req.GroupCode))
            where += " AND U.GroupCode = @GroupCode ";
        if (!string.IsNullOrEmpty(req.UserName))
            where += " AND U.UserName Like '%' + @UserName + '%'";
        if (!string.IsNullOrEmpty(req.FullName))
            where += " AND U.FullName Like '%' + @FullName + '%'";
        return where;
    }
}

public class SearchUserNotInNhomQueryHandler : IRequestHandler<SearchUserNotInNhomQuery, PaginationResponse<UserNotInNhomDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchUserNotInNhomQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<UserNotInNhomDto>> Handle(SearchUserNotInNhomQuery request, CancellationToken cancellationToken)
    {
        var whereInner = SearchUserNotInNhomQueryWhereBuilder.Build(request);
        var whereOuter = SearchUserNotInNhomQueryWhereOuterBuilder.Build(request);
        var sql = $@"SELECT U.ID, U.UserName,  U.FullName, U.GroupCode, U.GroupName, U.OfficeCode, U.OfficeName, U.PositionName ,U.ChucDanh
                    from [Identity].[Users] as U
                    WHERE U.UserName NOT IN (
                        SELECT NND.TaiKhoan
                        FROM Catalog.NguoiDungNhomNguoiDungs NND
	                    {whereInner}) {whereOuter}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<UserNotInNhomDto>(sql, request.PageSize, "GroupCode", cancellationToken, request.PageNumber, request);
        return data;
    }
}
