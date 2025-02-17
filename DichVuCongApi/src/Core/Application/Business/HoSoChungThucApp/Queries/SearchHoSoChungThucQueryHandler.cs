using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.HoSoApp;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Common;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Dtos;
using TD.DichVuCongApi.Domain.Business;
using Microsoft.AspNetCore.Http.Features;

namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Queries;

public class SearchHoSoChungThucWhereBuilder
{
    public static string Build(SearchHoSoChungThucQuery req)
    {
        string where = string.Empty;
        if (req.SoChungThucId != null && req.SoChungThucId != default)
            where += " AND hsct.SoChungThucId = @SoChungThucId";
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
public class SearchHoSoChungThucQueryHandler : IRequestHandler<SearchHoSoChungThucQuery, PaginationResponse<HoSoChungThucDto>>
{
    private readonly IDapperRepository _dapperRepository;
    public SearchHoSoChungThucQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    public async Task<PaginationResponse<HoSoChungThucDto>> Handle(SearchHoSoChungThucQuery request, CancellationToken cancellationToken)
    {
        string sql = @"SELECT hsct.ID, hsct.So, hsct.NgayChungThuc, tphs.SoTrang, tphs.KyDienTuBanGiay, hs.ChuHoSo, dmgtct.Ten as TenGiayTo, u.FullName as NguoiChungThuc,
                        tphs.SoBanGiay, tphs.Ten FROM Business.HoSoChungThucs as hsct
                        INNER JOIN Business.HoSos as hs on hsct.MaHoSo = hs.MaHoSo
                        INNER JOIN Business.DanhMucGiayToChungThucs as dmgtct on hsct.LoaiKetQuaId = dmgtct.Ma
                        INNER JOIN Business.ThanhPhanHoSos as tphs on tphs.Id = hsct.ThanhPhanHoSoId
                        LEFT JOIN [Identity].[Users] u on u.Id = tphs.NguoiKyChungThuc
                        where hsct.SoChungThucId = @SoChungThucId";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<HoSoChungThucDto>(sql, request.PageSize, "So", cancellationToken, request.PageNumber, request);
        var res = new List<HoSoChungThucDto>();
        if(data.Data != null)
        {
            foreach (var item in data.Data)
            {
                var tien = TinhTien.GetTongTienThanhPhanChungThuc(new HoSoApp.Dto.HoSoKySoChungThucDetail_ThanhPhanHoSo()
                {
                    KyDienTuBanGiay = item.KyDienTuBanGiay,
                    SoBanGiay = item.SoBanGiay,
                    SoTrang = item.SoTrang
                });
                item.SoTien = tien.TongTien;
                item.SoTienG = tien.TongTienG;
                item.SoTienDT = tien.TongTienDT;
                res.Add(item);
            }
            data.Data = res;
        }
        return data;
    }
}
