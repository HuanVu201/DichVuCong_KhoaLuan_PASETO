using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;

public class SearchTruongHopThuTucQueryWhereBuilder
{
    public static string Build(SearchTruongHopThuTucQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.ThuTucId))
            where += " AND ThuTucId = @ThuTucId";
        if (!string.IsNullOrEmpty(req.DonViTiepNhan))
            where += " AND (DonViTiepNhanRieng LIKE '%' + @DonViTiepNhan + '%' OR DonViTiepNhanRieng is null OR DonViTiepNhanRieng = '')";
        if (req.ByUserOfficeCode == true)
            where += " AND (DonViTiepNhanRieng LIKE '%' + @UserOfficeCode + '%' OR DonViTiepNhanRieng is null OR DonViTiepNhanRieng = '')";
        if (req.KhongNopTrucTuyen == false)
            where += " AND (KhongNopTrucTuyen = 0 or KhongNopTrucTuyen is null)";
        else if (req.KhongNopTrucTuyen == true)
            where += " AND KhongNopTrucTuyen = 1";
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

public class SearchTruongHopThuTucQueryHandler : IRequestHandler<SearchTruongHopThuTucQuery, PaginationResponse<TruongHopThuTucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly ICurrentUser _currentUser;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchTruongHopThuTucQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    public async Task<PaginationResponse<TruongHopThuTucDto>> Handle(SearchTruongHopThuTucQuery request, CancellationToken cancellationToken)
    {
        string where = SearchTruongHopThuTucQueryWhereBuilder.Build(request);

        string sql = $@"SELECT ID, Ma, Ten, ThoiGianThucHien, LoaiThoiGianThucHien, YeuCauNopPhiTrucTuyen,ThoiGianThucHienTrucTuyen, KhongCoNgayHenTra
                    FROM Business.TruongHopThuTucs {where}";
        if (request.ByUserOfficeCode == true)
        {
            request.UserOfficeCode = _currentUser.GetUserOfficeCode();
        }

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<TruongHopThuTucDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
