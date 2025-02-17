using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Common.Caching;
using TD.DichVuCongApi.Domain.Business.Events.HoSo;

namespace TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.Queries;
public class GetCoordinatesQueryWhereBuilder
{
    public static string Build(GetCoordinatesQuery req)
    {
        string where = string.Empty;
        where += " AND g.MaDinhDanh is not null AND g.MaDinhDanh <> '' AND Catalog is not null AND LoaiThongKe = 'DonVi' ";

        if (!string.IsNullOrEmpty(req.MaDinhDanh))
        {
            if (req.GetChild == true)
            {
                where += $" AND (g.MaDinhDanh Like @MaDinhDanh +'%' AND g.MaDinhDanh != @MaDinhDanh)  AND Catalog = 'xa-phuong' ";
            }
            else
            {
                where += " AND Catalog = 'quan-huyen' ";
            }
        }
        else
        {
            where += " AND Catalog = 'quan-huyen' ";
        }

        if (!string.IsNullOrEmpty(req.LoaiThoiGian))
        {
            where += " AND LoaiThoiGian =  @LoaiThoiGian";
        }

        if (req.Ky.HasValue)
            where += " AND Ky = @Ky";
        if (req.Nam.HasValue)
            where += " AND Nam = @Nam";

        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class GetCoordinatesQueryHandler : IRequestHandler<GetCoordinatesQuery, List<GetCoordinatesDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public GetCoordinatesQueryHandler(IDapperRepository dapperRepository, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _cacheService = cacheService;
    }

    public async Task<List<GetCoordinatesDto>> Handle(GetCoordinatesQuery request, CancellationToken cancellationToken)
    {
        string where = GetCoordinatesQueryWhereBuilder.Build(request);
        string sql = $@"SELECT g.Id, GroupName, g.MaDinhDanh, Catalog, Coordinates, sl.Diem766, sl.LoaiThoiGian, sl.Ky, sl.Nam
                        FROM [Catalog].[Groups] g
                        INNER JOIN [Portal].[SoLieuBaoCaoTheoKys] sl ON sl.MaDinhDanh = g.MaDinhDanh
                        {where}";

        var res = await _dapperRepository.PaginatedListSingleQueryAsync<GetCoordinatesDto>(sql, 2000, "MaDinhDanh ASC", cancellationToken, 1, request);

        List<GetCoordinatesDto> datas = new List<GetCoordinatesDto>();
        res.Data.ToList().ForEach(item =>
        {
            item.Name = HoSoEventUtils.GetTenDiaDanh(item.GroupName ?? string.Empty, item.Catalog ?? string.Empty, string.Empty);
            datas.Add(item);
        });
        return datas;
    }
}