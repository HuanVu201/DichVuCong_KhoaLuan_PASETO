using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Common;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Dtos;
using TD.DichVuCongApi.Application.Business.PhiLePhiApp.Queries;

namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Queries;

public class StatisticChiTietHSCTWhereBuilder
{
    public static string Build(StatisticChiTietHSCTQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.DonViId))
            where += " AND hs.DonViId = @DonViId";
        if (req.TuNgay != null) where += $" AND hs.NgayNopHoSo >= @TuNgay ";
        if (req.DenNgay != null) where += $" AND hs.NgayNopHoSo <= @DenNgay ";
        if (req.Removed == false)
            where += " AND hsct.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND hsct.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class StatisticChiTietHSCTQueryHandler : IRequestHandler<StatisticChiTietHSCTQuery, PaginationResponse<HoSoChungThucDto>>
{
    private readonly IDapperRepository _dapperRepository;
    public StatisticChiTietHSCTQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<HoSoChungThucDto>> Handle(StatisticChiTietHSCTQuery request, CancellationToken cancellationToken)
    {
        string laBanDienTu = string.Empty;

        if (request.kySoDienTu == true)
            laBanDienTu = "AND tphs.KyDienTuBanGiay = 1";
        var where = StatisticChiTietHSCTWhereBuilder.Build(request);
        string sql = $@"SELECT hsct.ID,hs.MaHoSo ,hsct.So, hsct.NgayChungThuc, tphs.SoTrang, tphs.KyDienTuBanGiay, hs.ChuHoSo, dmgtct.Ten as TenGiayTo, u.FullName as NguoiChungThuc,
                        tphs.SoBanGiay, tphs.Ten FROM Business.HoSoChungThucs as hsct
                        LEFT JOIN Business.HoSos as hs on hsct.MaHoSo = hs.MaHoSo
                        LEFT JOIN Business.DanhMucGiayToChungThucs as dmgtct on hsct.LoaiKetQuaId = dmgtct.Ma
                        LEFT JOIN Business.ThanhPhanHoSos as tphs on tphs.Id = hsct.ThanhPhanHoSoId
                        LEFT JOIN [Identity].[Users] u on u.Id = tphs.NguoiKyChungThuc
                        {where} {laBanDienTu}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoChungThucDto>(sql, request.PageSize, "So", cancellationToken, request.PageNumber, request);
     
        return data;
    }
}
