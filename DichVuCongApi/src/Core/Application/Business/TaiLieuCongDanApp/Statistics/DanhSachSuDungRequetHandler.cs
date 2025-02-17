using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Common.Models;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.Statistics;
public class DanhSachSuDungRequestHandler : IRequestHandler<DanhSachSuDungRequest, PaginationResponse<DanhSachSuDungResponse>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICacheService _cacheService;
    public DanhSachSuDungRequestHandler(IDapperRepository dapperRepository, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheService;
    }

    public async Task<PaginationResponse<DanhSachSuDungResponse>> Handle(DanhSachSuDungRequest request, CancellationToken cancellationToken)
    {
        var data = new DanhSachSuDungResponse();

        List<string> whereFilter = new List<string>();
        whereFilter.Add("tl.DeletedOn IS NULL and kho.DeletedOn is null");
        if (!string.IsNullOrEmpty(request.SoDinhDanh))
            whereFilter.Add("u.SoDinhDanh = @SoDinhDanh ");
        if (!string.IsNullOrEmpty(request.FullName))
            whereFilter.Add("u.FullName LIKE N'%' + @FullName + '%'");
        if(request.TuNgay != null && request.TuNgay != DateTime.MinValue)
            whereFilter.Add("kho.CreatedOn >= @TuNgay");
        if(request.DenNgay != null && request.DenNgay != DateTime.MinValue)
            whereFilter.Add("kho.CreatedOn <= @DenNgay");


        string sql = $"SELECT kho.Id, u.SoDinhDanh, u.FullName, kho.TongDungLuong, kho.SoLuong, kho.CreatedOn," +
                $"COUNT(CASE WHEN tl.Nguon = N'" + TaiLieuCongDanConstants.Nguon_CongDanTaiLen + "' THEN tl.Id END) AS SoLuongCongDanTaiLen," +
                $"SUM(CASE WHEN tl.Nguon = N'" + TaiLieuCongDanConstants.Nguon_CongDanTaiLen + "' THEN tl.DungLuong END) AS TongDungLuongCongDanTaiLen," +
                $"COUNT(CASE WHEN tl.Nguon = N'" + TaiLieuCongDanConstants.Nguon_KetQuaGiaiQuyetHoSo + "' THEN tl.Id END) AS SoLuongKetQuaGiaiQuyet," +
                $"SUM(CASE WHEN tl.Nguon = N'" + TaiLieuCongDanConstants.Nguon_KetQuaGiaiQuyetHoSo + "' THEN tl.DungLuong END) AS TongDungLuongKetQuaGiaiQuyet," +
                $"COUNT(CASE WHEN tl.Nguon = N'" + TaiLieuCongDanConstants.Nguon_ThanhPhanHoSo + "' THEN tl.Id END) AS SoLuongThanhPhanHoSo," +
                $"SUM(CASE WHEN tl.Nguon = N'" + TaiLieuCongDanConstants.Nguon_ThanhPhanHoSo + "' THEN tl.DungLuong END) AS TongDungLuongThanhPhanHoSo" +
            $" FROM [Business].[KhoLuuTruCongDans] kho" +
            $" INNER JOIN [Identity].[Users] u ON u.SoDinhDanh = kho.SoDinhDanh" +
            $" INNER JOIN [Business].[TaiLieuKhoLuuTruCongDans] tl ON tl.KhoLuuTruId = kho.Id" +
            $" WHERE  {string.Join(" AND ", whereFilter)}" +
            $" GROUP BY kho.Id, u.SoDinhDanh, u.FullName, kho.TongDungLuong, kho.SoLuong, kho.CreatedOn";

        var datas = await _dapperRepository.PaginatedListSingleQueryAsync<DanhSachSuDungResponse>(sql, request.PageSize, "TongDungLuong DESC", cancellationToken, request.PageNumber, request);

        return datas;
    }
}
