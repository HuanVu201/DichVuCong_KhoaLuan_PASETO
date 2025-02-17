using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.LinhVucApp;
using TD.DichVuCongApi.Application.Catalog.LinhVucApp.Queries;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.BaoCaoTongHop06aCacCap;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.QuyetDinh766;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.ThongKeIOC;

public class DanhSachHoSoTheoTrangThaiHandler : IRequestHandler<DanhSachHoSoTheoTrangThaiQuery, PaginationResponse<DanhSachHoSoTheoTrangThaiElement>>
{
    private readonly string hoSoTableName = "Business.HoSos";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;

    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    public DanhSachHoSoTheoTrangThaiHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
    }

    public async Task<PaginationResponse<DanhSachHoSoTheoTrangThaiElement>> Handle(DanhSachHoSoTheoTrangThaiQuery request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(request.MaDinhDanh))
            return null;

        string where = $" {hoSoTableName}.DeletedOn IS NULL";
        string tuNgay = request.TuNgay.Value.ToString("yyyy-MM-dd");
        string denNgay = request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59");
        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, hoSoTableName);
        if (!string.IsNullOrEmpty(request.LoaiSoLieu))
        {
            var tmp = builder.where;
            var tmpSql = tmp.GetType().GetProperty(request.LoaiSoLieu).GetValue(tmp, null);

            if (tmpSql != null)
                where += $" AND {tmpSql}";
        }

        if (!string.IsNullOrEmpty(request.MaDinhDanh))
        {
            if (!string.IsNullOrEmpty(where))
            {
                where += $" AND g.MaDinhDanh = @MaDinhDanh";
            }
            else
            {
                where += $" g.MaDinhDanh = @MaDinhDanh";
            }
        }

        string sqlQuery = @$"SELECT {hoSoTableName}.Id, {hoSoTableName}.MaHoSo, g.GroupName as TenDonVi, tt.LinhVucChinh as LinhVuc, tt.TenTTHC as ThuTuc, {hoSoTableName}.NgayTiepNhan, {hoSoTableName}.NgayHenTra, {hoSoTableName}.NgayKetThucXuLy, {hoSoTableName}.TrangThaiHoSoId, g.MaDinhDanh
                            FROM {hoSoTableName}
                            INNER JOIN [Catalog].[Groups] g ON g.GroupCode = {hoSoTableName}.DonViId
                            INNER JOIN [Catalog].[ThuTucs] tt ON tt.MaTTHC = {hoSoTableName}.MaTTHC
                            WHERE {where} ";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhSachHoSoTheoTrangThaiElement>(sqlQuery, request.PageSize, "NgayHenTra ASC", cancellationToken, request.PageNumber, new
        {
            request.MaDinhDanh,
            request.LoaiSoLieu,
            TuNgay = tuNgay,
            DenNgay = denNgay,

        });
        return data;
    }
}
