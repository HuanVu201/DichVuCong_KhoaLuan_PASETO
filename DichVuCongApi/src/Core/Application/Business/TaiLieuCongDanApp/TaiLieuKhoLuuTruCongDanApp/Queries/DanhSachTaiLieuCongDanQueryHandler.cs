using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.KhoTaiLieuDienTuApp.Queries;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Constant;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Queries;
public class DanhSachTaiLieuCongDanQueryHandler : IRequestHandler<DanhSachTaiLieuCongDanQuery, PaginationResponse<DanhSachTaiLieuCongDanResponse>>
{
    private readonly IDapperRepository _dapperRepository;
    public DanhSachTaiLieuCongDanQueryHandler(
        IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }
    private string Build(DanhSachTaiLieuCongDanQuery req)
    {
        string where = $" AND DeletedOn is null";
        if (req.KhoLuuTruId != null && req.KhoLuuTruId != Guid.Empty)
        {
            where += $" AND KhoLuuTruId = @KhoLuuTruId";
        }
        if (!string.IsNullOrEmpty(req.SoGiayToChuHoSo))
        {
            where += $" AND EXISTS (SELECT 1 FROM {SchemaNames.Business}.{TableNames.KhoLuuTruCongDans} klt WHERE klt.{nameof(KhoLuuTruCongDan.SoDinhDanh)} = @SoGiayToChuHoSo AND klt.{nameof(KhoLuuTruCongDan.Id)} = KhoLuuTruId)";
        }
        if (!string.IsNullOrEmpty(req.Nguon))
        {
            where += $" AND Nguon = @Nguon";
        }
        if (!string.IsNullOrEmpty(req.TenGiayTo))
        {
            where += $" AND TenGiayTo LIKE '%' + @TenGiayTo + '%'";
        }
        if (req.CreatedOn != null && req.CreatedOn != DateTime.MinValue)
        {
            where += " AND CreatedOn >= @CreatedOn";
        }
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
    public async Task<PaginationResponse<DanhSachTaiLieuCongDanResponse>> Handle(DanhSachTaiLieuCongDanQuery request, CancellationToken cancellationToken)
    {
        string where = Build(request);
        string sql = $@"
            SELECT
            {nameof(TaiLieuKhoLuuTruCongDan.Id)},
            {nameof(TaiLieuKhoLuuTruCongDan.TenGiayTo)},
            {nameof(TaiLieuKhoLuuTruCongDan.KhoLuuTruId)},
            {nameof(TaiLieuKhoLuuTruCongDan.DungLuong)},
            {nameof(TaiLieuKhoLuuTruCongDan.DuongDan)},
            {nameof(TaiLieuKhoLuuTruCongDan.CreatedOn)},
            {nameof(TaiLieuKhoLuuTruCongDan.SoLuotTaiSuDung)}
            FROM {SchemaNames.Business}.{TableNames.TaiLieuKhoLuuTruCongDans}
            {where}
        ";
        var datas = await _dapperRepository.PaginatedListSingleQueryAsync<DanhSachTaiLieuCongDanResponse>(sql, request.PageSize, nameof(TaiLieuKhoLuuTruCongDan.CreatedOn) + " DESC", cancellationToken, request.PageNumber, request);
        return datas;
    }
}
