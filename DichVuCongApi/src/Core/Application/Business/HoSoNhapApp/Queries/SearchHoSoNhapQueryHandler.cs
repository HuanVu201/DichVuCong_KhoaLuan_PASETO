
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Queries;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp;
using TD.DichVuCongApi.Application.Business.HoSoNhapApp.Dtos;
using TD.DichVuCongApi.Domain.Constant;
using Mapster;
using TD.DichVuCongApi.Domain.Business.Events;
using TD.DichVuCongApi.Application.Identity.Users;

namespace TD.DichVuCongApi.Application.Business.HoSoNhapApp.Queries;


public class SearchHoSoNhapQueryWhereBuilder
{
    public static string Build(SearchHoSoNhapQuery req)
    {
        string where = " hs.DeletedOn is null AND hs.NguoiGui = @NguoiGui";
        /*if (!string.IsNullOrEmpty(req.UserId))
        {
            where += " AND SoGiayToChuHoSo = @UserId";
        }*/
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchHoSoNhapQueryHandler : IRequestHandler<SearchHoSoNhapQuery, PaginationResponse<HoSoNhapDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private readonly IUserService _user;

    public SearchHoSoNhapQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser, IUserService user)
    {
        _currentUser = currentUser;
        _dapperRepository = dapperRepository;
        _user = user;
    }
    public async Task<PaginationResponse<HoSoNhapDto>> Handle(SearchHoSoNhapQuery request, CancellationToken cancellationToken)
    {
        var currentUser = _currentUser.GetUserId();
        var user = await _user.GetCurrentUserAsync(cancellationToken);

        var query = request.Adapt<SearchHoSoNhapQuery>();
        var where = SearchHoSoNhapQueryWhereBuilder.Build(query);
        var sql = $@"SELECT hs.Id,hs.ChuHoSo,hs.SoDienThoaiChuHoSo,hs.EmailChuHoSo,hs.TrichYeuHoSo,hs.MaTTHC,hs.MaTruongHop,hs.UyQuyen,hs.SoGiayToChuHoSo,hs.CreatedOn as NgayTao,g.GroupName as TenDonVi,hs.DonViId,hs.DangKyNhanHoSoQuaBCCIData
                        From {SchemaNames.Business}.{TableNames.HoSoNhaps} hs
                        LEFT JOIN {SchemaNames.Catalog}.{TableNames.Groups} g on hs.DonViId = g.GroupCode  {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoNhapDto>(sql, request.PageSize, "NgayTao DESC", cancellationToken, request.PageNumber, new
        {
            NguoiGui = user.SoDinhDanh,
        });
        return data;
    }
}
