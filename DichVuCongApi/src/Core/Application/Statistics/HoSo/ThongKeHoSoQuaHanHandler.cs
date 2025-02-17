using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Common.Models;
using TD.DichVuCongApi.Application.Common.Persistence;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuDvcTrucTuyen;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;
using TD.DichVuCongApi.Domain.Portal;
using TD.DichVuCongApi.Domain.Business;

namespace TD.DichVuCongApi.Application.Statistics.HoSo;
public class ThongKeHoSoQuaHanHandler : IRequestHandler<ThongKeHoSoQuaHanRequest,ThongKeHoSoQuaHanResponse>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly string donViThuTucTableName = "Catalog.DonViThuTucs";
    private readonly string groupTableName = "Catalog.Groups";
    private readonly string yeuCauThanhToanTableName = "Business.YeuCauThanhToans";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    public ThongKeHoSoQuaHanHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
    }
    private async Task<List<ThongKeHoSoQuaHanElementResponse>> GetThongKe(ThongKeHoSoQuaHanRequest request, CancellationToken cancellationToken)
    {
        List<ThongKeHoSoQuaHanElementResponse> result = new List<ThongKeHoSoQuaHanElementResponse>();
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd 00:00:01");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);
        string trangThaiWhere = string.Empty;
        string where = string.Empty;
        where += $"AND ({builder.where.TiepNhan}) ";
        var baseWhere = new BaseStatisticsWhereBuilder(request);
        where += $" {baseWhere.where}";
        if (!string.IsNullOrEmpty(request.TrangThaiHoSoId))
            where += " AND hs.TrangThaiHoSoId = cast(@TrangThaiHoSoId as varchar(50)) ";
        if (string.IsNullOrEmpty(request.TrangThaiXuLy))
        {
            trangThaiWhere = $"({builder.where.DaXuLyQuaHan}) OR ({builder.where.DangXuLyQuaHan}) ";
        }
        else if(request.TrangThaiXuLy == _tiepNhanHoSoTrucTuyenConstants.TRANGTHAIXULY.QUA_HAN.ToLower())
        {
            trangThaiWhere = $"({builder.where.DaXuLyQuaHan}) OR ({builder.where.DangXuLyQuaHan}) ";
        }
        else
        if (request.TrangThaiXuLy == _tiepNhanHoSoTrucTuyenConstants.TRANGTHAIXULY.DA_XU_LY_QUA_HAN.ToLower())
        {
            trangThaiWhere = $"({builder.where.DaXuLyQuaHan}) ";
        }
        else if (request.TrangThaiXuLy == _tiepNhanHoSoTrucTuyenConstants.TRANGTHAIXULY.DANG_XU_LY_QUA_HAN.ToLower())
        {
            trangThaiWhere = $"({builder.where.DangXuLyQuaHan}) ";
        }

        string totalWhere = $"WHERE {hoSoTableName}.DeletedOn IS NULL AND (({builder.where.DangXuLy}) OR ({builder.where.DaXuLy}) OR ({builder.where.BoSung}) OR ({builder.where.TraLai})) AND {hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) AND ({trangThaiWhere}) {where}";
        string sql = $"SELECT {hoSoTableName}.DonViId MaThongKe, " +
            $"COUNT(CASE WHEN ({trangThaiWhere} ) THEN {hoSoTableName}.Id END) TongSo " +
            $"FROM {hoSoTableName} " +
            $"INNER JOIN {groupTableName} " +
            $"ON {hoSoTableName}.DonViId = {groupTableName}.GroupCode " +
            $"{totalWhere} " +
            $"GROUP BY {hoSoTableName}.DonViId";
        var resBaoCao = await _dapperRepository.QueryAsync<ThongKeHoSoQuaHanElementResponse>(sql, new
        {
            TuNgay = tuNgay,
            DenNgay = denNgay,
            request.MaDinhDanhCha,
            request.MaDinhDanh,
            request.Catalog,
            request.TrangThaiHoSoId
        }, null, cancellationToken);
        if (resBaoCao == null) throw new Exception("GetBaoCaoTongHopDonVi not found");
        SearchGroupQuery queryGroups = new SearchGroupQuery();
        queryGroups.PageNumber = request.PageNumber;
        queryGroups.PageSize = request.PageSize;
        queryGroups.DonViQuanLy = request.DonViQuanLy;
        queryGroups.MaDinhDanh = request.MaDinhDanh;
        queryGroups.Type = "don-vi";
        queryGroups.MaDinhDanhCha = request.MaDinhDanhCha;
        queryGroups.OrderBy = new List<string>() { "GroupOrder", "MaDinhDanh", "GroupCode" }.ToArray();
        var groupsDto = await _mediator.Send(queryGroups);
        if (groupsDto.Data == null) throw new Exception("Groups not found");
        List<GroupDto> groups = groupsDto.Data;
        foreach (var group in groups)
        {
            if (string.IsNullOrEmpty(group.MaDinhDanh)) continue;
            ThongKeHoSoQuaHanElementResponse res = resBaoCao.FirstOrDefault(t => t.MaThongKe == group.GroupCode);
            if (res != null)
            {
                res.TenThongKe = group.GroupName;
                res.MaDinhDanh = group.MaDinhDanh;
                res.Catalog = group.Catalog;
                result.Add(res);
            }
        }

        return result;
    }

    public async Task<ThongKeHoSoQuaHanResponse> Handle(ThongKeHoSoQuaHanRequest request, CancellationToken cancellationToken)
    {
        List<ThongKeHoSoQuaHanElementResponse> result = await GetThongKe(request, cancellationToken);

        return new ThongKeHoSoQuaHanResponse(result);
    }
}
