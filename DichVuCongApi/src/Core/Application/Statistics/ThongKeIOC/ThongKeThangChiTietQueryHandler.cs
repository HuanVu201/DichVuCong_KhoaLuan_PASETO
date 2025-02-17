using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Statistics.ThongKeIOC;
public class ThongKeThangChiTietHandler : IRequestHandler<ThongKeThangChiTietQuery, ThongKeIOCResponse<ThongKeThangChiTietElement>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string thuTucsTableName = "Catalog.ThuTucs";
    private readonly string groupsTableName = "[Catalog].[Groups]";
    private readonly string donViThuTucsTableName = "Catalog.DonViThuTucs";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    public ThongKeThangChiTietHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
    }

    private async Task<List<ThongKeThangChiTietElement>> GetThongKeThangChiTiet(ThongKeThangChiTietQuery request, CancellationToken cancellationToken)
    {
        List<ThongKeThangChiTietElement> result = new List<ThongKeThangChiTietElement>();

        int month = request.Month;
        int year = request.Year;
        DateTime currentDate = DateTime.Now;
        DateTime firstDayOfMonth = new DateTime(year, month, 1);
        DateTime lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
        string tuNgay = firstDayOfMonth.ToString("yyyy-MM-dd");
        //string denNgay = lastDayOfMonth.ToString("yyyy-MM-dd 23:59:59")
        string denNgay;

        if (month == currentDate.Month && year == currentDate.Year)
        {
            denNgay = currentDate.ToString("yyyy-MM-dd 23:59:59");
        }
        else
        {
            denNgay = lastDayOfMonth.ToString("yyyy-MM-dd 23:59:59");
        }

        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);

        string totalWhere = $"WHERE {hoSoTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN})";

        List<string> catalogs = new List<string>();
        catalogs = [GroupContants.SO_BAN_NGANH, GroupContants.QUAN_HUYEN, GroupContants.CNVPDK];

        string sql = $"SELECT {hoSoTableName}.DonViId as MaThongKe, {groupsTableName}.MaDinhDanh as MaDonVi, " +
            $"COUNT({hoSoTableName}.Id) HSTiepNhanTong, " +
            $"COUNT(CASE WHEN ({builder.where.BoSung}) THEN {hoSoTableName}.Id END) HSBoSung, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyDungHan}) THEN {hoSoTableName}.Id END) HSDaXLDungHan, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyQuaHan}) THEN {hoSoTableName}.Id END) HSDaXLQuaHan, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLy}) THEN {hoSoTableName}.Id END) HSDaXuLyTong, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyQuaHan}) THEN {hoSoTableName}.Id END) HSDangXLQuaHan, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyTrongHan}) THEN {hoSoTableName}.Id END) HSDangXLTrongHan, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLy}) THEN {hoSoTableName}.Id END) HSDangXuLyTong, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanKyTruoc}) THEN {hoSoTableName}.Id END) HSTiepNhanKyTruoc, " +
             $"COUNT(CASE WHEN ({builder.where.TiepNhanTrucTiep} OR {builder.where.TiepNhanQuaBCCI}) THEN {hoSoTableName}.Id END) HSTrucTiepVaBCCI, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanQuaMang}) THEN {hoSoTableName}.Id END) HSTiepNhanTrucTuyen, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhan}) THEN {hoSoTableName}.Id END) HSTiepNhan, " +
            $"COUNT(CASE WHEN ({builder.where.TraLai}) THEN {hoSoTableName}.Id END) HSTraLai " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {groupsTableName} " +
            $"ON {hoSoTableName}.DonViId = {groupsTableName}.GroupCode " +
            $"{totalWhere} AND {groupsTableName}.Catalog in @Catalogs " +
            $"GROUP BY {hoSoTableName}.DonViId, {groupsTableName}.MaDinhDanh";

        var resBaoCao = await _dapperRepository.QueryAsync<ThongKeThangChiTietElement>(sql, new
        {
            Catalogs = catalogs,
            TuNgay = tuNgay,
            DenNgay = denNgay,
        }, null, cancellationToken);

        if (resBaoCao == null) throw new Exception("ThongKeThangChiTiet not found");
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.Type = "don-vi";
        queryGroups.Catalogs = catalogs;
        queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();
        queryGroups.PageNumber = 1;
        queryGroups.PageSize = 1000;
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) return result;
        List<GroupDto> groups = groupsDto.Data;
        foreach (var group in groups)
        {
            ThongKeThangChiTietElement res = resBaoCao.FirstOrDefault(t => t.MaDonVi == group.MaDinhDanh);
            if (res != null)
            {
                res.TenDonVi = group.GroupName;
            }
            else
            {
                res = new ThongKeThangChiTietElement();
                res.MaDonVi = group.MaDinhDanh;
                res.TenDonVi = group.GroupName;
            }

            result.Add(res);
        }

        return result;
    }

    public async Task<ThongKeIOCResponse<ThongKeThangChiTietElement>> Handle(ThongKeThangChiTietQuery request, CancellationToken cancellationToken)
    {

        List<ThongKeThangChiTietElement> result = await GetThongKeThangChiTiet(request, cancellationToken);
        return new ThongKeIOCResponse<ThongKeThangChiTietElement>(result);
    }
}
