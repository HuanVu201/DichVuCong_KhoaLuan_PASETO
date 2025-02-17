using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Interfaces;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;

public class SearchTruongHopThuTucTheoDonViQueryWhereBuilder
{
    public static string Build(SearchTruongHopThuTucTheoDonViQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.ThuTucId))
            where += " AND ThuTucId = @ThuTucId";
        if (!string.IsNullOrEmpty(req.DonViTiepNhan))
            where += " AND (DonViTiepNhanRieng LIKE '%' + @DonViTiepNhan + '%' OR DonViTiepNhanRieng is null OR DonViTiepNhanRieng = '')";
        if (req.Removed == false)
            where += " AND DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchTruongHopThuTucTheoDonViQueryHandler : IRequestHandler<SearchTruongHopThuTucTheoDonViQuery, PaginationResponse<TruongHopThuTucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly ICurrentUser _currentUser;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchTruongHopThuTucTheoDonViQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    public async Task<PaginationResponse<TruongHopThuTucDto>> Handle(SearchTruongHopThuTucTheoDonViQuery request, CancellationToken cancellationToken)
    {
        string where = SearchTruongHopThuTucTheoDonViQueryWhereBuilder.Build(request);
        string sqlTakeGroup = $@"SELECT * FROM [Catalog].[Groups] where OfGroupCode = @OfGroupCode OR GroupCode = @OfGroupCode";
        string sql = $@"SELECT ID, Ma, Ten, ThoiGianThucHien, LoaiThoiGianThucHien, YeuCauNopPhiTrucTuyen,ThoiGianThucHienTrucTuyen, KhongCoNgayHenTra, DonViTiepNhanRieng
                        FROM Business.TruongHopThuTucs {where}";
        var dataGroup = await _dapperRepository.QueryAsync<GroupDto>(sqlTakeGroup, new { OfGroupCode = _currentUser.GetUserOfficeCode() });
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<TruongHopThuTucDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        var filteredData = data.Data
          .Where(item =>
          {
              var donViList = item.DonViTiepNhanRieng?.Split("##", StringSplitOptions.RemoveEmptyEntries) ?? Array.Empty<string>();
              return dataGroup.Any(group => donViList.Contains(group.GroupCode)) || item.DonViTiepNhanRieng == "";
          })
          .ToList();

        return new PaginationResponse<TruongHopThuTucDto>(
        data: filteredData,
        count: filteredData.Count,
        page: request.PageNumber,
        pageSize: request.PageSize
        );
    }
}
