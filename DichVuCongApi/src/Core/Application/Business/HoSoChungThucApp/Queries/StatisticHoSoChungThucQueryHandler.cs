using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.GiayToHoSoApp.Queries;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Common;
using TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Dtos;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Common.Business;
using TD.DichVuCongApi.Application.Common.Identity;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;

namespace TD.DichVuCongApi.Application.Business.HoSoChungThucApp.Queries;
public class StatisticHoSoChungThucWhereBuilder
{
    public static string Build(StatisticHoSoChungThucQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.DonViId))
            where += " AND hs.DonViId = @DonViId ";
        if (req.TuNgay != null) where += $" AND hs.NgayNopHoSo >= @TuNgay ";
        if (req.DenNgay != null) where += $" AND hs.NgayNopHoSo <= @DenNgay ";
        if (req.NgayChungThuc != null)
            where += " AND hsct.NgayChungThuc Like N'%' + @NgayChungThuc + '%'";
        if (req.Removed == false)
            where += " AND hsct.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND hsct.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class StatisticHoSoChungThucQueryHandler : IRequestHandler<StatisticHoSoChungThucQuery, StatisticHoSoChungThucBaseDto>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly ICommonServices _commonServices;
    public StatisticHoSoChungThucQueryHandler(IDapperRepository dapperRepository, IMediator mediator, ICommonServices commonServices)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _commonServices = commonServices;
    }

    public async Task<StatisticHoSoChungThucBaseDto> StatisticHoSoChungThuc(StatisticHoSoChungThucQuery request, CancellationToken cancellationToken)
    {
        CommonSettings commonSettings = _commonServices.Get();
        string hoSoTableName = request.LaDuLieuThongKeCacNam == true && !string.IsNullOrEmpty(commonSettings.PrefixStatisticTableName) ? commonSettings.PrefixStatisticTableName + "." + TablesName.HoSoTableName : TablesName.HoSoTableName;
        var where = StatisticHoSoChungThucWhereBuilder.Build(request);
        List<StatisticHoSoChungThucDto> result = new List<StatisticHoSoChungThucDto>();
        string sql = $@"SELECT 
                        hs.DonViId,
                        SUM(CASE WHEN tphs.KyDienTuBanGiay = 1 THEN 1 ELSE 0 END) AS BanDienTu,
                        COUNT(hsct.Id) AS BanGiay,
                        SUM(CASE WHEN tphs.KyDienTuBanGiay = 1 THEN 1 ELSE 0 END) + COUNT(hsct.Id) AS TongSoHoSo
	                    FROM Business.HoSoChungThucs AS hsct
	                    INNER JOIN {hoSoTableName} AS hs ON hsct.MaHoSo = hs.MaHoSo
	                    INNER JOIN Business.ThanhPhanHoSos AS tphs ON tphs.Id = hsct.ThanhPhanHoSoId
                        {where}
	                    GROUP BY hs.DonViId
                        ";
        var data = await _dapperRepository.QueryAsync<StatisticHoSoChungThucDto>(sql, request);
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.OfGroupCode = request.MaDonViCha;
        queryGroups.MaDinhDanhCha = request.MaDinhDanhCha;
        queryGroups.MaDinhDanh = request.MaDinhDanh;
        queryGroups.PageNumber = request.PageNumber;
        queryGroups.PageSize = request.PageSize;
        queryGroups.DonViQuanLy = request.DonViQuanLy;
        queryGroups.PageSize = request.PageSize;
        queryGroups.Catalog = request.Catalog;
        queryGroups.Type = "don-vi";
        queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();

        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) throw new Exception("Groups not found");
        List<GroupDto> groups = groupsDto.Data;
        int index = 0;
        foreach (var group in groups)
        {
            index++;
            StatisticHoSoChungThucDto res = data.FirstOrDefault(t => t.DonViId == group.GroupCode);
            if (res != null)
            {
                res.TenDonVi = group.GroupName;
            }
            else
            {
                res = new StatisticHoSoChungThucDto();
                res.DonViId = group.GroupCode;
                res.TenDonVi = group.GroupName;
            }
            result.Add(res);
        }
        var response = new StatisticHoSoChungThucBaseDto(result)
        {
            // Gán giá trị TotalCount bằng tổng số lượng groups
            TotalCount = groups.Count,
        };
        return response;
    }

    public async Task<StatisticHoSoChungThucBaseDto> Handle(StatisticHoSoChungThucQuery request, CancellationToken cancellationToken)
    {
        StatisticHoSoChungThucBaseDto result = await StatisticHoSoChungThuc(request, cancellationToken);
        return result;

    }
}
