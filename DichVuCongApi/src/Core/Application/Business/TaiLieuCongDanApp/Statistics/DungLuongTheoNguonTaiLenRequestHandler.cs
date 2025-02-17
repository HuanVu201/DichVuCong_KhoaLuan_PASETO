using System.Net.WebSockets;
using TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchSoTheoDoi;
using TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.Statistics;
public class DungLuongTheoNguonTaiLenRequestHandler : IRequestHandler<DungLuongTheoNguonTaiLenRequest, Result<DungLuongTheoNguonTaiLenResponse>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICacheService _cacheService;
    public DungLuongTheoNguonTaiLenRequestHandler(IDapperRepository dapperRepository, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheService;
    }
    private class DuLieuTraVe
    {
        public string Nguon { get; set; }
        public double DungLuong { get; set; }
    }
    public async Task<Result<DungLuongTheoNguonTaiLenResponse>> Handle(DungLuongTheoNguonTaiLenRequest request, CancellationToken cancellationToken)
    {
        var data = new DungLuongTheoNguonTaiLenResponse();

        string sql = string.Empty;
        string whereFilter = string.Empty;
        if (request.TuNgay != null && request.TuNgay != DateTime.MinValue)
            whereFilter += " AND tl.CreatedOn >= @TuNgay";
        if (request.DenNgay != null && request.DenNgay != DateTime.MinValue)
            whereFilter += " AND tl.CreatedOn <= @DenNgay";

        if (!string.IsNullOrEmpty(request.SoDinhDanh) || !string.IsNullOrEmpty(request.FullName))
        {
            if (!string.IsNullOrEmpty(request.SoDinhDanh))
                whereFilter += " AND u.SoDinhDanh = @SoDinhDanh ";
            if (!string.IsNullOrEmpty(request.FullName))
                whereFilter += " AND u.FullName LIKE N'%' + @FullName + '%'";

            sql = @$"SELECT Nguon, Sum(DungLuong) as DungLuong
                        FROM [Business].[TaiLieuKhoLuuTruCongDans] tl
                        INNER JOIN [Business].[KhoLuuTruCongDans] kho ON tl.KhoLuuTruId = kho.Id
                        INNER JOIN [Identity].[Users] u ON u.SoDinhDanh = kho.SoDinhDanh
                        WHERE tl.DeletedOn is null
                        {whereFilter} group by Nguon";
        }
        else
        {
            sql = @$"SELECT Nguon, Sum(DungLuong) as DungLuong FROM [Business].[TaiLieuKhoLuuTruCongDans] tl WHERE tl.DeletedOn is null {whereFilter} group by Nguon";
        }
        var duLieuTraVe = await _cacheService.GetOrSetAsync(request,
            async () => await _dapperRepository.QueryAsync<DuLieuTraVe>(sql, request),
            TimeSpan.FromMinutes(1),
            cancellationToken: cancellationToken);

        foreach (var duLieu in duLieuTraVe)
        {
            if (duLieu.Nguon == TaiLieuKhoLuuTruCongDan.Constant.Nguon_CongDanTaiLen)
                data.CongDanTaiLen = duLieu.DungLuong;
            if (duLieu.Nguon == TaiLieuKhoLuuTruCongDan.Constant.Nguon_KetQuaGiaiQuyetHoSo)
                data.KetQuaGiaiQuyet = duLieu.DungLuong;
            if (duLieu.Nguon == TaiLieuKhoLuuTruCongDan.Constant.Nguon_ThanhPhanHoSo)
                data.ThanhPhanHoSo = duLieu.DungLuong;
            if (duLieu.Nguon == TaiLieuKhoLuuTruCongDan.Constant.Nguon_DVCQG)
                data.DichVuCongQG = duLieu.DungLuong;
        }

        return Result<DungLuongTheoNguonTaiLenResponse>.Success(data: data);
    }
}
