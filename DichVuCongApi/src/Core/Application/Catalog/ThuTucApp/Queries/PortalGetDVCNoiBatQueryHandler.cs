using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Identity.Users;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
public class PortalGetDVCNoiBatQueryWhereBuilder
{
    public static string Build(PortalGetDVCNoiBatQuery req)
    {
        string where = string.Empty;
        if (req.LaTieuBieu.HasValue)
            where += " AND tt.LaTieuBieu = @LaTieuBieu ";
        if (req.SuDung != null)
            where += " AND tt.SuDung = @SuDung";
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
public class PortalGetDVCNoiBatQueryHandler : IRequestHandler<PortalGetDVCNoiBatQuery, List<ThuTucDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IUserService _userService;
    public PortalGetDVCNoiBatQueryHandler(IDapperRepository dapperRepository, IUserService userService, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _userService = userService;
        _cacheService = cacheService;
    }

    public async Task<List<ThuTucDto>> Handle(PortalGetDVCNoiBatQuery request, CancellationToken cancellationToken)
    {
        string where = PortalGetDVCNoiBatQueryWhereBuilder.Build(request);

        string sql = $@"SELECT TOP (15) ID,tt.SuDung,TrangThaiPhiLePhi,QuyetDinh,DinhKemQuyetDinh,ThucHienTaiBoPhanMotCua ,tt.MaTTHC,tt.LaThuTucChungThuc ,TenTTHC, MaLinhVucChinh, LinhVucChinh, NgayCapNhat,CapThucHien, MucDo,
                    LoaiTTHC, LienThong, HoSoPhatSinhTrongNam, ThuTu FROM Catalog.ThuTucs tt {where} ORDER BY ThuTu ASC";

        var data = await _cacheService.GetOrSetAsync(request,
            async () => await _dapperRepository.QueryAsync<ThuTucDto>(sql, request),
            TimeSpan.FromMinutes(30), cancellationToken);

        return data.ToList();
    }
}
