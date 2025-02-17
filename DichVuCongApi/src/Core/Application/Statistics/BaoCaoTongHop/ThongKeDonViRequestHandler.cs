using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.TongHopDonVi;
using TD.DichVuCongApi.Application.Statistics.ThongKeDonVi;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class ThongKeDonViRequestHandler : IRequestHandler<ThongKeDonViRequest, ThongKeDonViBaseResponse>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string thuTucsTableName = "Catalog.ThuTucs";
    private readonly string groupsTableName = "Catalog.Groups";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    public ThongKeDonViRequestHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
    }
    private async Task<List<ThongKeDonViBaseElementResponse>> GetBaoCaoTongHopDonVi(ThongKeDonViRequest request, CancellationToken cancellationToken)
    {
        if (!request.TuNgay.HasValue | !request.DenNgay.HasValue) throw new ArgumentNullException(nameof(request));
        List<ThongKeDonViBaseElementResponse> result = new List<ThongKeDonViBaseElementResponse>();
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd 00:00:00");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");

        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);
        var where = builder.where;
        /*  string cataLogWhere = string.Empty;
          if (!string.IsNullOrEmpty(request.Catalog))
          {
               cataLogWhere = $"AND {groupTableName}.Catalog = @Catalog";
          }*/
        string totalWhere = $"WHERE {hoSoTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN})";


        string sql = $"SELECT {hoSoTableName}.DonViId MaDonVi, " +
             $"COUNT({hoSoTableName}.Id) TongSoTiepNhan, " +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanKyTruoc}) THEN {hoSoTableName}.Id END) TiepNhanKyTruoc," +
            $"COUNT(CASE WHEN ({builder.where.TiepNhanTrongKy}) THEN {hoSoTableName}.Id END) TiepNhanTrongKy," +

            $"COUNT(CASE WHEN ({builder.where.DaXuLy}) THEN {hoSoTableName}.Id END) DaXuLy, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyDungHan}) THEN {hoSoTableName}.Id END) DaXuLyDungHan, " +
            $"COUNT(CASE WHEN ({builder.where.DaXuLyQuaHan}) THEN {hoSoTableName}.Id END) DaXuLyQuaHan, " +

            $"COUNT(CASE WHEN ({builder.where.DangXuLy}) THEN {hoSoTableName}.Id END) DangXuLy, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyTrongHan}) THEN {hoSoTableName}.Id END) DangXuLyTrongHan, " +
            $"COUNT(CASE WHEN ({builder.where.DangXuLyQuaHan}) THEN {hoSoTableName}.Id END) DangXuLyQuaHan, " +

            $"COUNT(CASE WHEN ({builder.where.TraLai}) THEN {hoSoTableName}.Id END) TraLai, " +
            $"COUNT(CASE WHEN ({builder.where.BoSung}) THEN {hoSoTableName}.Id END) BoSung " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {groupsTableName} " +
            $"ON {hoSoTableName}.DonViId = {groupsTableName}.GroupCode " +
            $"{totalWhere} " +
            $"GROUP BY {hoSoTableName}.DonViId";
        var resBaoCao = await _dapperRepository.QueryAsync<ThongKeDonViBaseElementResponse>(sql, new
        {
            request.MaDinhDanh,
            TuNgay = tuNgay,
            DenNgay = denNgay,
        }, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.MaDinhDanh = request.MaDinhDanh;
        queryGroups.PageNumber = request.PageNumber;
        queryGroups.PageSize = request.PageSize;
        queryGroups.Type = "don-vi";
        queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh" }.ToArray();
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) throw new Exception("Groups not found");
        List<GroupDto> groups = groupsDto.Data;
        foreach (var group in groups)
        {
            if (string.IsNullOrEmpty(group.MaDinhDanh)) continue;
            ThongKeDonViBaseElementResponse res = resBaoCao.FirstOrDefault(t => t.MaDonVi == group.GroupCode);
            if (res != null)
            {
                res.TenDonVi = group.GroupName;
                res.MaDonVi = group.MaDinhDanh;
            }
            else
            {
                res = new ThongKeDonViBaseElementResponse();
                res.TenDonVi = group.GroupName;
                res.MaDonVi = group.MaDinhDanh;

            }

            result.Add(res);
        }
        return result;
    }
    public async Task<ThongKeDonViBaseResponse> Handle(ThongKeDonViRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(request.MaDinhDanh))
            throw new Exception("Vui lòng nhập đúng số định danh đơn vị!");

        List<ThongKeDonViBaseElementResponse> result = await GetBaoCaoTongHopDonVi(request, cancellationToken);
        return new ThongKeDonViBaseResponse(result);
    }
}
