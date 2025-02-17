namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
public class SearchThuTucTheoBaoCaoTongHopHandler : IRequestHandler<SearchTruongHopTheoBaoCaoTongHopRequest, PaginationResponse<TruongHopThuTucDto>>
{
    private readonly ICurrentUser _currentUser;
    private readonly IDapperRepository _dapperRepository;
    public SearchThuTucTheoBaoCaoTongHopHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    public async Task<PaginationResponse<TruongHopThuTucDto>> Handle(SearchTruongHopTheoBaoCaoTongHopRequest request, CancellationToken cancellationToken)
    {
        string where = $"WHERE th.DeletedOn IS NULL ";
        if (!string.IsNullOrEmpty(request.ThuTucId))
        {
            where += $" AND th.ThuTucId = @ThuTucId ";
        }

        if (!string.IsNullOrEmpty(request.Catalog) || !string.IsNullOrEmpty(request.MaDinhDanh) || !string.IsNullOrEmpty(request.MaDinhDanhCha))
        {
            where += $" AND dvtt.DeletedOn IS NULL AND gr.DeletedOn IS NULL ";
            if (!string.IsNullOrEmpty(request.MaDinhDanhCha))
            {
                if (request.ChiBaoGomDonViCon == true)
                {
                    where += $" AND (MaDinhDanh Like @MaDinhDanhCha +'%' AND MaDinhDanh != @MaDinhDanhCha) ";
                }
                else
                {
                    where += $" AND MaDinhDanh Like @MaDinhDanhCha +'%' ";
                }
            }

            if (!string.IsNullOrEmpty(request.MaDinhDanh))
                where += " AND MaDinhDanh = @MaDinhDanh ";
            if (!string.IsNullOrEmpty(request.Catalog))
                where += " AND Catalog = @Catalog ";
            if (!string.IsNullOrEmpty(request.Type))
                where += " AND Type = @Type ";
            string sql = $"SELECT th.ID, th.Ma, th.Ten,tt.MaTTHC,tt.TenTTHC, gr.GroupOrder, gr.MaDinhDanh,gr.GroupCode MaDonVi, gr.GroupName TenDonVi FROM " +
                $"[Catalog].[DonViThuTucs] dvtt " +
                $"INNER JOIN Business.TruongHopThuTucs th ON dvtt.MaTTHC = th.ThuTucId " +
                $"INNER JOIN Catalog.ThuTucs tt ON dvtt.MaTTHC = tt.MaTTHC " +
                $"INNER JOIN Catalog.Groups gr ON dvtt.DonViId = gr.GroupCode " +
                $"{where}";
            var data = await _dapperRepository.PaginatedListSingleQueryAsync<TruongHopThuTucDto>(sql, request.PageSize, "GroupOrder, MaDinhDanh, Ten", cancellationToken, request.PageNumber, request);
            return data;
        }
        else
        {
            string sql = $@"SELECT ID, Ma, Ten, ThoiGianThucHien, LoaiThoiGianThucHien, YeuCauNopPhiTrucTuyen,ThoiGianThucHienTrucTuyen, KhongCoNgayHenTra
                    FROM Business.TruongHopThuTucs th {where}";

            var data = await _dapperRepository.PaginatedListSingleQueryAsync<TruongHopThuTucDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);

            return data;
        }

    }
}
