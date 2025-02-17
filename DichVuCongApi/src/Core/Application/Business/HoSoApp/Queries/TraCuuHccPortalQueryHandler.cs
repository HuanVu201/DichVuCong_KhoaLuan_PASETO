using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class TraCuuHccPortalQueryWhereBuilder
{
    public static string Build(TraCuuHccPortalQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.MaHoSo))
            where += " AND hs.MaHoSo = @MaHoSo ";
        if (!string.IsNullOrEmpty(req.Params))
            where += " AND (hs.SoGiayToChuHoSo = @Params OR hs.SoGiayToNguoiUyQuyen = @Params OR hs.SoDienThoaiNguoiUyQuyen = @Params OR hs.SoDienThoaiChuHoSo = @Params) ";

        if (req.Removed == false)
            where += " AND hs.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND hs.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class TraCuuHccPortalQueryHandler : IRequestHandler<TraCuuHccPortalQuery, PaginationResponse<TraCuuHccPortalDto>>
{
    private readonly IDapperRepository _dapperRepository;
    public TraCuuHccPortalQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }

    public async Task<PaginationResponse<TraCuuHccPortalDto>> Handle(TraCuuHccPortalQuery request, CancellationToken cancellationToken)
    {
        string where = TraCuuHccPortalQueryWhereBuilder.Build(request);

        string sql = $@"SELECT TOP 10 hs.ID, hs.MaHoSo, ChuHoSo, SoDienThoaiChuHoSo, hs.TrangThaiHoSoId,
		            hs.CreatedOn, KenhThucHien, DiaChiChuHoSo, NgayTiepNhan, NgayHenTra, hs.MaTTHC, tt.TenTTHC
                    FROM Business.HoSos as hs
                    INNER JOIN Catalog.ThuTucs tt on hs.MaTTHC = tt.MaTTHC
                    {where}";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<TraCuuHccPortalDto>(sql, request.PageSize, "CreatedOn DESC", cancellationToken, request.PageNumber, request);
        return data;
    }

}
