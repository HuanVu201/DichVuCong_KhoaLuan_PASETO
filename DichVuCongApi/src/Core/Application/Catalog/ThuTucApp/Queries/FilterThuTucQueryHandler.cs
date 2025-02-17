namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
public class FilterThuTucQueryHandler : IRequestHandler<FilterThuTucQuery, PaginationResponse<FilterThuTucDto>>
{
    private readonly IDapperRepository _dapperRepository;
    public FilterThuTucQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }

    public async Task<PaginationResponse<FilterThuTucDto>> Handle(FilterThuTucQuery request, CancellationToken cancellationToken)
    {
        string sql = $@"SELECT lv.ID, lv.Ten AS TenLinhVuc ,lv.Ma AS MaLinhVuc,lv.MaNganh,dmc.TenDanhMuc AS TenNganh,'CapTinh' as CapThucHien, lv.SoLuongThuTucCapTinh AS SoLuongThuTuc
                     FROM Catalog.LinhVucs lv INNER JOIN Catalog.DanhMucChungs dmc ON lv.MaNganh = dmc.Code
                     WHERE dmc.Type='danh-muc-nganh' AND lv.SoLuongThuTucCapTinh != 0 AND lv.SuDung = 1
                     UNION
                     SELECT lv.ID,lv.Ten,lv.Ma,lv.MaNganh,dmc.TenDanhMuc AS TenNganh,'CapHuyen', lv.SoLuongThuTucCapHuyen
                     FROM Catalog.LinhVucs lv INNER JOIN Catalog.DanhMucChungs dmc ON lv.MaNganh = dmc.Code
                     WHERE dmc.Type='danh-muc-nganh' AND lv.SoLuongThuTucCapHuyen != 0 AND lv.SuDung = 1
                     UNION
                     SELECT lv.ID,lv.Ten,lv.Ma,lv.MaNganh,dmc.TenDanhMuc AS TenNganh,'CapXa', lv.SoLuongThuTucCapXa FROM Catalog.LinhVucs lv INNER JOIN Catalog.DanhMucChungs dmc ON lv.MaNganh = dmc.Code
                     WHERE dmc.Type='danh-muc-nganh' AND lv.SoLuongThuTucCapXa != 0 AND lv.SuDung = 1
                    ";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<FilterThuTucDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
