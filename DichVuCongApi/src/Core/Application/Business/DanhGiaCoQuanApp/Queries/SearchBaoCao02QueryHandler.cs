using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp.Queries;
using TD.DichVuCongApi.Application.Business.PhieuKhaoSatApp;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Business.DanhGiaCoQuanApp.Queries;

public class SearchBaoCao02WhereBuilder
{
    public static string Build(SearchBaoCao02Query req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Quy))
            where += " AND Quy = @Quy";
        if (!string.IsNullOrEmpty(req.Nam))
            where += " AND Nam = @Nam";
        if (!string.IsNullOrEmpty(req.DonVi))
            where += " AND DonVi = @DonVi";
        if (req.Removed == false)
            where += " AND dgcq.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND dgcq.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchBaoCao02QueryHandler : IRequestHandler<SearchBaoCao02Query, PaginationResponse<DanhGiaCoQuanDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchBaoCao02QueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<DanhGiaCoQuanDto>> Handle(SearchBaoCao02Query request, CancellationToken cancellationToken)
    {
        var where = SearchBaoCao02WhereBuilder.Build(request);
        var sql = $@"
                SELECT TOP (1000) dgcq.Id
                      ,[DonVi]
                      ,[DonViText]
                      ,[MaNhomCha]
                      ,[MaNhomChaText]
                      ,[DongBo]
                      ,[Quy]
                      ,[Nam]
                      ,[TraLoi1]
                      ,[TraLoi2]
                      ,[TraLoi3]
                      ,[TraLoi4]
                      ,[TraLoi5]
                      ,[TraLoi6]
                      ,[TraLoi7]
                      ,[TraLoi8]
                      ,[TraLoi9]
                      ,[SoPhieu]
                      ,[TongDiem]
                      ,[PhongBan]
                      ,[LyDoTruDiem]
                      ,[MaHoSo]
                      ,[HinhThucDanhGia]
                      ,[MucDoRHL]
                      ,[MucDoHL]
                      ,[MucDoBT]
                      ,[MucDoKHL]
                      ,[MucDoRKHL]
                      ,[ThamDinhTraLoi1]
                      ,[ThamDinhTraLoi2]
                      ,[ThamDinhTraLoi3]
                      ,[ThamDinhTraLoi4]
                      ,[ThamDinhTraLoi5]
                      ,[ThamDinhTraLoi6]
                      ,[ThamDinhTraLoi7]
                      ,[ThamDinhTraLoi8]
                      ,[ThamDinhTraLoi9]
                      ,[XepLoai]
                      ,[XepHang]
                      ,[TongDonViCon]
                      ,[ThamDinhTraLoi10]
                      ,[ThamDinhTraLoi11]
                      ,[TraLoi10]
                      ,[TraLoi11]
	                  ,	gr.GroupName
                  FROM [Business].[DanhGiaCoQuans] dgcq inner join Catalog.Groups gr on gr.GroupCode = dgcq.DonVi
                    {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhGiaCoQuanDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
