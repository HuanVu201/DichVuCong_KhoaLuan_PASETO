using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchHoSoQuaHanXuLy;
internal class SearchHoSoQuaHanXuLyRequestWhereBuilder
{
    private static readonly string _hoSoTableName = "Business.HoSos";
    private static readonly BaoCaoTongHopConstants _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
    private static readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
    internal static string Build(SearchHoSoQuaHanXuLyRequest req)
    {
        string tuNgay = req.TuNgay.ToString("yyyy-MM-dd 00:00:01");
        string denNgay = req.DenNgay.ToString("yyyy-MM-dd 23:59:59");
        string boSungWhere = $"CONVERT(DATE,hs.NgayTiepNhan,23)  <= @DenNgay " +
            $"AND ((hs.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_BO_SUNG}) " +
            $"AND (CONVERT(DATE,hs.NgayYeuCauBoSung,23)  <= @DenNgay OR CONVERT(DATE,hs.NgayYeuCauBoSung,23)  IS NULL)) " +
            $"OR (hs.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DUNG_XU_LY})))";
        string traLaiWhere = $"CONVERT(DATE,hs.NgayTiepNhan,23)  <= @DenNgay " +
        $"AND hs.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_TRA_LAI}) " +
        $"AND CONVERT(DATE,hs.NgayKetThucXuLy,23)  >= @TuNgay " +
        $"AND CONVERT(DATE,hs.NgayKetThucXuLy,23)  <= @DenNgay";
        string daXuLyWhere = $"hs.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY}) AND CONVERT(DATE,hs.NgayKetThucXuLy,23)  >= @TuNgay AND CONVERT(DATE,hs.NgayKetThucXuLy,23)  <= @DenNgay";
        string daXuLyQuaHanWhere = $"{daXuLyWhere} AND CONVERT(DATE,hs.NgayKetThucXuLy,23) > CONVERT(DATE,hs.NgayHenTra,23)";
        string dangXuLyWhere = $"CONVERT(DATE,hs.NgayTiepNhan,23)  <= @DenNgay " +
        $"AND (" +
        $"hs.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DANG_XU_LY}) " +
        $"OR " +
        $"(hs.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY},{_baoCaoTongHopConstants.TRANG_THAI_TRA_LAI}) AND CONVERT(DATE,hs.NgayKetThucXuLy,23)  > @DenNgay) " +
        $"OR " +
        $"(hs.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_BO_SUNG}) AND CONVERT(DATE,hs.NgayYeuCauBoSung,23)  > @DenNgay)" +
        $")";
        string dangXuLyTrongHanWhere = $"{dangXuLyWhere} AND (CONVERT(DATE,hs.NgayHenTra,23)  >= @DenNgay OR hs.NgayHenTra IS NULL )";
        string dangXuLyQuaHanWhere = $"{dangXuLyWhere} AND CONVERT(DATE,hs.NgayHenTra,23)  < @DenNgay";
        string where = string.Empty;
        string trangThaiWhere = string.Empty;
        if (!string.IsNullOrEmpty(req.TrangThaiHoSoId))
            where += " AND TrangThaiHoSoId = @TrangThaiHoSoId";
        if (req.TrangThaiXuLy == _tiepNhanHoSoTrucTuyenConstants.TRANGTHAIXULY.QUA_HAN.ToLower())
        {
            trangThaiWhere = $"(({daXuLyQuaHanWhere}) OR ({dangXuLyQuaHanWhere})) ";
        }
        else if (req.TrangThaiXuLy == _tiepNhanHoSoTrucTuyenConstants.TRANGTHAIXULY.DA_XU_LY_QUA_HAN.ToLower())
        {
            trangThaiWhere = $"({daXuLyQuaHanWhere}) ";
        }
        else if (req.TrangThaiXuLy == _tiepNhanHoSoTrucTuyenConstants.TRANGTHAIXULY.DANG_XU_LY_QUA_HAN.ToLower())
        {
            trangThaiWhere = $"({dangXuLyQuaHanWhere}) ";
        }
        if (!string.IsNullOrEmpty(req.DonViTraKq))
        {
            where += $" AND hs.DonViTraKq = @DonViTraKq";
        }

        if (!string.IsNullOrEmpty(req.DonViQuanLy))
        {
            where += $" AND (g.DonViQuanLy = @DonViQuanLy OR g.GroupCode = @DonViQuanLy OR g.OfGroupCode = @DonViQuanLy) ";
        }

        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
        {
            if (!string.IsNullOrEmpty(trangThaiWhere))
            {
                return $" WHERE hs.DeletedOn IS NULL AND (({dangXuLyWhere}) OR ({daXuLyWhere}) OR ({boSungWhere}) OR ({traLaiWhere})) AND hs.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) AND  ({trangThaiWhere}) AND ({where})";
            }
            else
            {
                return $" WHERE hs.DeletedOn IS NULL AND (({dangXuLyWhere}) OR ({daXuLyWhere}) OR ({boSungWhere}) OR ({traLaiWhere})) AND hs.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) AND   ({where})";
            }
        }

        if (!string.IsNullOrEmpty(trangThaiWhere))
        {
            return $" WHERE hs.DeletedOn IS NULL AND (({dangXuLyWhere}) OR ({daXuLyWhere}) OR ({boSungWhere}) OR ({traLaiWhere})) AND hs.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) AND  {trangThaiWhere} ";
        }
        else
        {
            return $" WHERE hs.DeletedOn IS NULL AND (({dangXuLyWhere}) OR ({daXuLyWhere}) OR ({boSungWhere}) OR ({traLaiWhere})) AND hs.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN})  ";
        }
    }

}

public class SearchHoSoQuaHanXuLyHandler : IRequestHandler<SearchHoSoQuaHanXuLyRequest, Result<List<HoSoTheoTrangThaiDto>>>
{
    private readonly string _hoSoTableName = "Business.Hosos";
    private readonly string _groupTableName = "[Catalog].Groups";
    private readonly string _thuTucTableName = "[Catalog].ThuTucs";
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    public SearchHoSoQuaHanXuLyHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _mediator = mediator;
    }

    public async Task<Result<List<HoSoTheoTrangThaiDto>>> Handle(SearchHoSoQuaHanXuLyRequest request, CancellationToken cancellationToken)
    {
        if (request == null) throw new ArgumentNullException(nameof(request));
        string tuNgay = request.TuNgay.ToString("yyyy-MM-dd 00:00:01");
        string denNgay = request.DenNgay.ToString("yyyy-MM-dd 23:59:59");
        List<HoSoTheoTrangThaiDto> results = new List<HoSoTheoTrangThaiDto>();

        string where = SearchHoSoQuaHanXuLyRequestWhereBuilder.Build(request);
        var totalWhere = where;
        if (!string.IsNullOrEmpty(request.MaDinhDanhCha))
        {
            if (request.ChiBaoGomDonViCon == true)
            {
                totalWhere += $" AND (MaDinhDanh Like @MaDinhDanhCha +'%' AND MaDinhDanh != @MaDinhDanhCha) ";
            }
            else
            {
                totalWhere += $" AND MaDinhDanh Like @MaDinhDanhCha +'%' ";
            }
        }

        if (!string.IsNullOrEmpty(request.MaDinhDanh))
            totalWhere += " AND MaDinhDanh = @MaDinhDanh ";
        if (!string.IsNullOrEmpty(request.Catalog) && (string.IsNullOrEmpty(request.MaDinhDanhCha) && string.IsNullOrEmpty(request.MaDinhDanh)))
            totalWhere += " AND Catalog = @Catalog";
        string sql = $"select hs.id, u.FullName " +
        $"into #TempTable " +
        $"from " +
        $"(SELECT DISTINCT LTRIM(RTRIM(value)) AS Id " +
        $"FROM (SELECT REPLACE(NguoiDangXuLy, '##', '#') AS NguoiDangXuLy  " +
        $" FROM Business.Hosos hs" +
        $"{where}) AS u " +
        $"CROSS APPLY STRING_SPLIT(u.NguoiDangXuLy, '#') " +
        $"WHERE LTRIM(RTRIM(value)) <> '') hs inner join [identity].users u on hs.Id = u.Id \n\t" +
        $"SELECT donVi.OfGroupName ,hs.MaHoSo, hs.NgayTiepNhan, " +
        $"hs.NgayHenTra, hs.NgayKetThucXuLy, u.FullName AS TenNguoiDangXuLy,donvi.Catalog,  " +
        $"donVi.GroupName, Case WHEN hs.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY}) AND CONVERT(DATE,hs.NgayKetThucXuLy,23)  >= @TuNgay AND CONVERT(DATE,hs.NgayKetThucXuLy,23)  <= @DenNgay AND  CONVERT(DATE,hs.NgayKetThucXuLy,23) > CONVERT(DATE,hs.NgayHenTra,23) THEN 1 ELSE 0 END DaXuLy " +
        $"FROM {_hoSoTableName} hs " +
        $"INNER JOIN {_thuTucTableName} " +
        $"ON hs.MaTTHC = {_thuTucTableName}.MaTTHC " +
        $"INNER JOIN {_groupTableName} donVi " +
        $"ON donVi.GroupCode = hs.DonViId " +
        $"outer apply " +
        $"(select STRING_AGG (CONVERT(NVARCHAR(1000), u.FullName) , '##') as FullName from #TempTable u " +
        $"where hs.NguoiDangXuLy like '%' +u.id +'%') as u" +
        $" {totalWhere} " +
        $"ORDER BY donvi.GroupOrder, donvi.OfGroupName, donvi.GroupName";
        var data = await _dapperRepository.QueryAsync<HoSoTheoTrangThaiDto>(sql, new { TuNgay = tuNgay, DenNgay = denNgay, request.MaDinhDanhCha, request.SearchKeys, request.TrangThaiHoSoId, request.MaDinhDanh, request.Catalog }, null, cancellationToken);
        if (data == null) return Result<List<HoSoTheoTrangThaiDto>>.Success(new List<HoSoTheoTrangThaiDto>());
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.PageNumber = 1;
        queryGroups.PageSize = 1000;
        queryGroups.Catalogs = new List<string>() { "so-ban-nganh", "quan-huyen" };
        queryGroups.Type = "don-vi";
        queryGroups.CoThongKe = true;
        queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) throw new Exception("Groups not found");
        List<HoSoTheoTrangThaiDto> result = new List<HoSoTheoTrangThaiDto>();
        foreach (var groupDto in groupsDto.Data)
        {
            foreach (var hoSos in data)
            {
                if (hoSos.Catalog != "cnvpdk" && (hoSos.OfGroupName == groupDto.GroupName || hoSos.GroupName == groupDto.GroupName))
                {
                    result.Add(hoSos);
                }
            }
        }

        foreach (var hoSos in data)
        {
            if (hoSos.Catalog == "cnvpdk")
            {
                result.Add(hoSos);
            }
        }

        return Result<List<HoSoTheoTrangThaiDto>>.Success(result.ToList());
    }
}