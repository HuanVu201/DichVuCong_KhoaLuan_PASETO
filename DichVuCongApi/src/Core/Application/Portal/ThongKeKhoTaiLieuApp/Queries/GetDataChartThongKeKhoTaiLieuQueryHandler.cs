using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.MauPhoiApp;

namespace TD.DichVuCongApi.Application.Portal.ThongKeKhoTaiLieuApp.Queries;
public class GetDataChartThongKeKhoTaiLieuQueryHandler : IRequestHandler<GetDataChartThongKeKhoTaiLieuQuery, ChartThongKeKhoTaiLieuDto>
{
    private readonly IDapperRepository _dapperRepository;
    public GetDataChartThongKeKhoTaiLieuQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<ChartThongKeKhoTaiLieuDto> Handle(GetDataChartThongKeKhoTaiLieuQuery request, CancellationToken cancellationToken)
    {
        var data = new ChartThongKeKhoTaiLieuDto();
        var sql = @"SELECT
                        COUNT(DISTINCT CASE WHEN u.NgayThangNamSinh IS NOT NULL AND Kho.SoDinhDanh IS NOT NULL THEN u.SoDinhDanh END) AS CaNhanSuDung,
                        COUNT(DISTINCT CASE WHEN u.NgayThangNamSinh IS NULL AND Kho.SoDinhDanh IS NOT NULL THEN u.SoDinhDanh END) AS ToChucSuDung,
                        COUNT(DISTINCT CASE WHEN u.NgayThangNamSinh IS NOT NULL THEN u.SoDinhDanh END) - COUNT(DISTINCT CASE WHEN u.NgayThangNamSinh IS NOT NULL AND Kho.SoDinhDanh IS NOT NULL THEN u.SoDinhDanh END) as CaNhanKhongSuDung,
                        COUNT(DISTINCT CASE WHEN u.NgayThangNamSinh IS NULL THEN u.SoDinhDanh END) - COUNT(DISTINCT CASE WHEN u.NgayThangNamSinh IS NULL AND Kho.SoDinhDanh IS NOT NULL THEN u.SoDinhDanh END) as ToChucKhongSuDung
                        FROM  [Identity].[Users] u
                        LEFT JOIN [Business].[KhoTaiLieuDienTus] kho on u.SoDinhDanh = kho.SoDinhDanh 
                        WHERE u.TypeUser = 'CongDan' and u.SoDinhDanh is not null and kho.DeletedOn is null";

        var res = await _dapperRepository.QueryFirstOrDefaultAsync<ChartThongKeKhoTaiLieuDto>(sql);
        if (res != null)
        {
            data.CaNhanSuDung = res.CaNhanSuDung;
            data.CaNhanKhongSuDung = res.CaNhanKhongSuDung;
            data.ToChucSuDung = res.ToChucSuDung;
            data.ToChucKhongSuDung = res.ToChucKhongSuDung;
            return data;
        }

        throw new Exception("Lỗi truy vấn số liệu sử dụng kho tài liệu điện tử!");

    }
}
