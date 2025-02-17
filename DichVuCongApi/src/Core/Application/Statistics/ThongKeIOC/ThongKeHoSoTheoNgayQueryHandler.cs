using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Statistics.ThongKeIOC.Dto;

namespace TD.DichVuCongApi.Application.Statistics.ThongKeIOC;
public class ThongKeHoSoTheoNgayQueryWhereBuilder
{
    public static string Build(ThongKeHoSoTheoNgayQuery req)
    {
        string where = string.Empty;
        /*  if (req.NopHoSoTuNgay.HasValue) where += $" AND hs.NgayGui >= @NopHoSoTuNgay ";
          if (req.NopHoSoDenNgay.HasValue) where += $" AND hs.NgayGui <= @NopHoSoDenNgay ";
          if (req.TiepNhanTuNgay.HasValue) where += $" AND hs.NgayTiepNhan >= @TiepNhanTuNgay ";
          if (req.TiepNhanDenNgay.HasValue) where += $" AND hs.NgayTiepNhan <= @TiepNhanDenNgay ";*/
        if (!string.IsNullOrEmpty(req.Catalog))
            where += " AND Catalog = @Catalog ";
        if (!string.IsNullOrEmpty(req.MaDinhDanh))
            where += " AND MaDinhDanh = @MaDinhDanh ";
        if (!string.IsNullOrEmpty(req.MaDinhDanhCha))
            where += $" AND MaDinhDanh Like @MaDinhDanhCha +'%' ";
        if (req.Removed == false)
            where += " AND  hs.DeletedOn is null ";
        else if (req.Removed == true)
            where += " AND hs.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class ThongKeHoSoTheoNgayQueryHandler : IRequestHandler<ThongKeHoSoTheoNgayQuery, ThongKeHoSoTheoNgayResponse<ThongKeHoSoTheoNgayDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public ThongKeHoSoTheoNgayQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;

    public async Task<ThongKeHoSoTheoNgayResponse<ThongKeHoSoTheoNgayDto>> Handle(ThongKeHoSoTheoNgayQuery request, CancellationToken cancellationToken)
    {
        string whereJoin = "";

        if (!string.IsNullOrEmpty(request.KenhThucHien))
            whereJoin += " AND hs.KenhThucHien = @KenhThucHien";
        var where = ThongKeHoSoTheoNgayQueryWhereBuilder.Build(request);
        var sql = $@"
                    select
                    COUNT(CASE WHEN TrangThaiHoSoId NOT IN ('1', '3') AND CAST(hs.NgayTiepNhan AS DATE) = CAST(@Ngay AS DATE) THEN 1 END) AS TiepNhan,
                    COUNT(CASE WHEN TrangThaiHoSoId in ('9', '10') AND CAST(hs.NgayKetThucXuLy AS DATE) <= CAST(hs.NgayHenTra AS DATE) AND CAST(hs.NgayKetThucXuLy AS DATE) = CAST(@Ngay AS DATE) THEN 1 END) AS DaXuLyDungHan,
                    COUNT(CASE WHEN TrangThaiHoSoId in ('9', '10') AND CAST(hs.NgayKetThucXuLy AS DATE) > CAST(hs.NgayHenTra AS DATE) AND CAST(hs.NgayKetThucXuLy AS DATE) = CAST(@Ngay AS DATE) THEN 1 END) AS DaXuLyQuaHan
                    from Business.HoSos hs  
	                {where}
                    ";
        var data = await _dapperRepository.QueryAsync<ThongKeHoSoTheoNgayDto>(sql, new
        {
            Catalog = request.Catalog,
            MaDinhDanh = request.MaDinhDanh,
            MaDinhDanhCha = request.MaDinhDanhCha,
            Ngay = request.Ngay,
            KenhThucHien = request.KenhThucHien
        }, null, cancellationToken);
        return new ThongKeHoSoTheoNgayResponse<ThongKeHoSoTheoNgayDto>(data);
    }
}
