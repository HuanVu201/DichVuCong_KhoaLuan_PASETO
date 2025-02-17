using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;

namespace TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
internal class ChatBotSearchGroupQueryWhereBuilder
{
    internal static string Build(ChatBotSearchGroup req)
    {
        string where = string.Empty;
        if (req.ID !=null )
            where += " AND ID = @ID ";
        if (!string.IsNullOrEmpty(req.SearchKeys))
            where += " AND GroupName LIKE '%'+ @SearchKeys + '%' ";
        if (!string.IsNullOrEmpty(req.Catalog))
            where += " AND Catalog = @Catalog ";
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
public class ChatBotSearchGroupHandler : IRequestHandler<ChatBotSearchGroup, PaginationResponse<PortalGroupDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public ChatBotSearchGroupHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
   
    public async Task<PaginationResponse<PortalGroupDto>> Handle(ChatBotSearchGroup request, CancellationToken cancellationToken)
    {
        var where = ChatBotSearchGroupQueryWhereBuilder.Build(request);
        var sql = $"SELECT ID, ISNULL(GroupCode, '')  GroupCode, ISNULL(GroupName, '') GroupName, ISNULL(Catalog, '')  Catalog, ISNULL(MaDinhDanh, '')  MaDinhDanh, " +
            $"ISNULL(DiaChi, '')  DiaChi, ISNULL(SoDienThoai, '')  SoDienThoai, ISNULL(ThoiGianLamViec, '')  ThoiGianLamViec, ISNULL(Website, '')  Website, ISNULL(Email, '')  Email " +
            $"FROM Catalog.Groups {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<PortalGroupDto>(sql, request.PageSize, new List<string>() { "MaDinhDanh" }.ToArray(), cancellationToken, request.PageNumber, request);
        return data;
    }
}
