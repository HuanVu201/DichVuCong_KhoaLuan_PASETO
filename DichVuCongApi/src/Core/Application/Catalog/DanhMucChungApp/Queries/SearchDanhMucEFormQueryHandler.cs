using Mapster;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Application.Statistics.HoSo;

namespace TD.DichVuCongApi.Application.Catalog.DanhMucChungApp.Queries;
public class SearchDanhMucEFormQueryWhereBuilder
{
    public static string Build(SearchDanhMucEFormQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TenDanhMuc))
            where += " AND TenDanhMuc Like N'%' + @TenDanhMuc + '%'";
        if (!string.IsNullOrEmpty(req.Code))
            where += " AND Code = @Code";
        if (!string.IsNullOrEmpty(req.ParentCode))
            where += " AND ParentCode = @ParentCode";
        if (!string.IsNullOrEmpty(req.Type))
            where += " AND Type = @Type";
        if (!string.IsNullOrEmpty(req.Search))
            where += " AND TenDanhMuc Like N'%' + @Search + '%'";
        if (req.Removed == false)
            where += " AND DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchDanhMucEFormQueryHandler : IRequestHandler<SearchDanhMucEFormQuery, SearchDanhMucEFormResponse>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private class DanhMucDto
    {
        public string Name { get; set; }
        public string Code { get; set; }
    }
    public SearchDanhMucEFormQueryHandler(IDapperRepository dapperRepository, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheService;
    }

    public async Task<SearchDanhMucEFormResponse> Handle(SearchDanhMucEFormQuery request, CancellationToken cancellationToken)
    {
        var where = SearchDanhMucEFormQueryWhereBuilder.Build(request);
        var res = new SearchDanhMucEFormResponse();
        var sql = $@"SELECT TenDanhMuc as Name, Code FROM Catalog.DanhMucChungs {where} ORDER BY CODE 
            OFFSET @Skip ROWS 
            FETCH NEXT @Limit ROWS ONLY";
        var data = await _cacheService.GetOrSetAsync(request,
            async () => await _dapperRepository.QueryAsync<DanhMucDto>(sql, request),
        TimeSpan.FromHours(1),
            cancellationToken);
        if(data != null && data.Any())
        {
            res.data = data?.Adapt<List<SearchDanhMucEFormData.Data>>();
            res.total = data.Count;
        }
        return res;
    }
}
