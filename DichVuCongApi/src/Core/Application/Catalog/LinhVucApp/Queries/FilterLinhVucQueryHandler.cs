namespace TD.DichVuCongApi.Application.Catalog.LinhVucApp.Queries;

public class FilterLinhVucQueryWhereBuilder
{
    public static string Build(FilterLinhVuc req, out string joinClause)
    {
        string where = "tt.SuDung = '1'";
        joinClause = string.Empty;

        if (!string.IsNullOrEmpty(req.MaLinhVuc))
            where += " AND tt.MaLinhVucChinh = @MaLinhVuc ";
        if (!string.IsNullOrEmpty(req.TuKhoa))
            where += " AND (tt.TenTTHC Like '%' + @TuKhoa + '%' OR tt.MaTTHC Like '%' + @TuKhoa + '%')";
        if (req.HasThuTucCapTinh.HasValue)
            where += " AND tt.CapThucHien Like '%capTinh%'";
        if (req.HasThuTucCapHuyen.HasValue)
            where += " AND tt.CapThucHien Like '%capHuyen%'";
        if (req.HasThuTucCapXa.HasValue)
            where += " AND tt.CapThucHien Like '%capXa%'";
        if (req.ThucHienTaiBoPhanMotCua != null)
            where += " AND tt.ThucHienTaiBoPhanMotCua = @ThucHienTaiBoPhanMotCua";

        if (!string.IsNullOrEmpty(req.DonViId))
        {
            joinClause = " LEFT JOIN [Catalog].[DonViThuTucs] dvtt ON dvtt.MaTTHC = tt.MaTTHC ";
            where += " AND dvtt.DonViId = @DonViId AND dvtt.DeletedOn IS NULL ";
        }

        if (!string.IsNullOrEmpty(req.MucDo))
            where += " AND tt.MucDo = @MucDo ";

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

public class FilterLinhVucQueryHandler : IRequestHandler<FilterLinhVuc, PaginationResponse<FilterLinhVucDto>>
{
    private readonly IDapperRepository _dapperRepository;

    public FilterLinhVucQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;

    public async Task<PaginationResponse<FilterLinhVucDto>> Handle(FilterLinhVuc request, CancellationToken cancellationToken)
    {
        string where = FilterLinhVucQueryWhereBuilder.Build(request, out string joinClause);
        string sql = $@"SELECT tt.ID, tt.TenTTHC, tt.MaTTHC, tt.MaLinhVucChinh, tt.CoQuanThucHienChinh, tt.MucDo, tt.CapThucHien, tt.LinhVucChinh
                     FROM Catalog.ThuTucs tt
                     {joinClause}
                     {where}";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<FilterLinhVucDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
