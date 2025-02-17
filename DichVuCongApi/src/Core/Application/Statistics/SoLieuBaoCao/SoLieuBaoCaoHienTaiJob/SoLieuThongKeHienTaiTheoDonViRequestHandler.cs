using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.SoLieuBaoCaoTheoKyJob;

namespace TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.SoLieuBaoCaoHienTaiJob;
public class SoLieuThongKeHienTaiTheoDonViRequestHandler : IRequestHandler<SoLieuThongKeHienTaiTheoDonViRequest, Result<SoLieuThongKeHienTaiTheoDonViElement>>
{
    private readonly string _hoSoTableName = "Business.HoSos";
    private readonly string _thuTucsTableName = "Catalog.ThuTucs";
    private readonly string _groupsTableName = "[Catalog].[Groups]";
    private readonly string _yeuCauThanhToanTableName = "Business.YeuCauThanhToans";
    private readonly string _tphsTableName = "[Business].[ThanhPhanHoSos]";
    private readonly string _donViThuTucTableName = "Catalog.DonViThuTucs";
    private readonly string _logCSDLTableName = "[Business].[LogCSDLDanCuDoanhNghieps]";
    private readonly string _dghlTableName = "[Business].[DanhGiaHaiLongs]";
    private readonly string _userTableName = "[Identity].[Users]";
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mediator;
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly YeuCauThanhToanConstants _yeuCauThanhToanConstants;
    private readonly TrangThaiYeuCauThanhToanConstants _trangThaiYeuCauThanhToanConstants;

    public SoLieuThongKeHienTaiTheoDonViRequestHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
        _trangThaiYeuCauThanhToanConstants = new TrangThaiYeuCauThanhToanConstants();
    }

    private async Task<SoLieuThongKeHienTaiTheoDonViElement> GetThongKeHoSo(SoLieuThongKeHienTaiTheoDonViRequest request, CancellationToken cancellationToken)
    {
        var resultThongKeHoSo = new SoLieuThongKeHienTaiTheoDonViElement();
        string tuNgay = request.TuNgay.HasValue ? request.TuNgay.Value.ToString("yyyy-MM-dd") : string.Empty;
        string denNgay = request.DenNgay.HasValue ? request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59") : string.Empty;

        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, _hoSoTableName);

        string totalWhere = $"WHERE {_hoSoTableName}.DeletedOn IS NULL AND CONVERT(DATE,{_hoSoTableName}.NgayTiepNhan,23)  >= @TuNgay AND CONVERT(DATE,{_hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay AND {_hoSoTableName}.TrangThaiHoSoId NOT IN ('1')";

        if (!string.IsNullOrEmpty(request.MaDinhDanh))
            totalWhere += " AND gr.MaDinhDanh = @MaDinhDanh";
        if (request.Catalogs != null && request.Catalogs.Count > 0)
            totalWhere += " AND gr.Catalog in @Catalogs ";
        if (!string.IsNullOrEmpty(request.MaDinhDanhCha))
        {
            if (request.ChiBaoGomDonViCon == true)
            {
                totalWhere += $" AND (gr.MaDinhDanh Like @MaDinhDanhCha +'%' AND gr.MaDinhDanh != @MaDinhDanhCha) ";
            }
            else
            {
                totalWhere += $" AND gr.MaDinhDanh Like @MaDinhDanhCha +'%' ";
            }
        }

        string sql = $"SELECT " +
                    $"COUNT(CASE WHEN ({builder.where.DangXuLy}) THEN {_hoSoTableName}.Id END) DangXuLy, " +
                    $"COUNT(CASE WHEN ({builder.where.DangXuLyDungHanVaTruocHan}) THEN {_hoSoTableName}.Id END) DangXuLyDungHan, " +
                    $"COUNT(CASE WHEN ({builder.where.DangXuLyQuaHan}) THEN {_hoSoTableName}.Id END) DangXuLyQuaHan, " +
                    $"COUNT(CASE WHEN {_hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_BO_SUNG}) AND (CONVERT(DATE,{_hoSoTableName}.NgayYeuCauBoSung,23)  <= @DenNgay OR CONVERT(DATE,{_hoSoTableName}.NgayYeuCauBoSung,23) IS NULL) THEN {_hoSoTableName}.Id END) BoSung, " +
                    $"COUNT(CASE WHEN {_hoSoTableName}.TrangThaiHoSoId = '6' THEN {_hoSoTableName}.Id END) ThucHienNghiaVuTaiChinh, " +
                    $"COUNT(CASE WHEN {_hoSoTableName}.TrangThaiHoSoId = '8' THEN {_hoSoTableName}.Id END) DungXuLy, " +
                    $"COUNT(DISTINCT CASE WHEN yctt.TrangThai = N'{_trangThaiYeuCauThanhToanConstants.CHO_THANH_TOAN}' THEN yctt.Id  END) GiaoDichChoThanhToan " +
                    $"FROM {_hoSoTableName} " +
                    $"INNER JOIN {_groupsTableName} gr ON {_hoSoTableName}.DonViId = gr.GroupCode " +
                    $"LEFT JOIN {_yeuCauThanhToanTableName} yctt ON {_hoSoTableName}.MaHoSo = yctt.MaHoSo " +
                    $"{totalWhere}";

        var resBaoCao = await _dapperRepository.QueryAsync<SoLieuThongKeHienTaiTheoDonViElement>(sql, new
        {
            TuNgay = tuNgay,
            DenNgay = denNgay,
            request.MaDinhDanh,
            request.Catalogs,
            request.MaDinhDanhCha,
            request.ChiBaoGomDonViCon,
        }, null, cancellationToken);

        if (resBaoCao == null || resBaoCao.Count == 0)
            throw new Exception("GetThongKeHoSo not found");
        else
            resultThongKeHoSo = resBaoCao[0];

        return resultThongKeHoSo;
    }

    private async Task<SoLieuThongKeHienTaiTheoDonViElement> GetThongKeThuTuc(SoLieuThongKeHienTaiTheoDonViRequest request, CancellationToken cancellationToken)
    {
        var resultThongKeThuTuc = new SoLieuThongKeHienTaiTheoDonViElement();
        string tuNgay = request.TuNgay.HasValue ? request.TuNgay.Value.ToString("yyyy-MM-dd") : string.Empty;
        string denNgay = request.DenNgay.HasValue ? request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59") : string.Empty;
        string totalWhere = $"WHERE tt.DeletedOn IS NULL ";

        if (!string.IsNullOrEmpty(request.MaDinhDanh))
            totalWhere += " AND gr.MaDinhDanh = @MaDinhDanh";

        if (request.Catalogs != null && request.Catalogs.Count > 0)
            totalWhere += " AND gr.Catalog in @Catalogs ";
        if (!string.IsNullOrEmpty(request.MaDinhDanhCha))
        {
            if (request.ChiBaoGomDonViCon == true)
            {
                totalWhere += $" AND (gr.MaDinhDanh Like @MaDinhDanhCha +'%' AND gr.MaDinhDanh != @MaDinhDanhCha) ";
            }
            else
            {
                totalWhere += $" AND gr.MaDinhDanh Like @MaDinhDanhCha +'%' ";
            }
        }

        string sqlDonViThuTuc = $"SELECT " +
                    $"COUNT(DISTINCT tt.MaTTHC) ThuTuc, " +
                    $"COUNT(DISTINCT CASE WHEN tt.MucDo = '2' THEN tt.MaTTHC END) ThuTucCungCapThongTin, " +
                    $"COUNT(DISTINCT CASE WHEN tt.MucDo = '3' THEN tt.MaTTHC END) ThuTucMotPhan, " +
                    $"COUNT(DISTINCT CASE WHEN tt.MucDo = '4' THEN tt.MaTTHC END) ThuTucToanTrinh " +
                    $"FROM {_donViThuTucTableName} tt " +
                    $"INNER JOIN {_groupsTableName} gr ON gr.GroupCode = tt.DonViId " +
                    $"{totalWhere} ";

        var resDonViThuTuc = await _dapperRepository.QueryAsync<SoLieuThongKeHienTaiTheoDonViElement>(sqlDonViThuTuc, new
        {
            TuNgay = tuNgay,
            DenNgay = denNgay,
            request.MaDinhDanh,
            request.Catalogs,
            request.MaDinhDanhCha,
            request.ChiBaoGomDonViCon,
        }, null, cancellationToken);

        if (resDonViThuTuc == null || resDonViThuTuc.Count == 0)
        {
            throw new Exception("GetThongKeThuTuc not found");
        }
        else
        {
            resultThongKeThuTuc = resDonViThuTuc[0];
        }

        return resultThongKeThuTuc;
    }

    public async Task<Result<SoLieuThongKeHienTaiTheoDonViElement>> Handle(SoLieuThongKeHienTaiTheoDonViRequest request, CancellationToken cancellationToken)
    {
        SoLieuThongKeHienTaiTheoDonViElement result = new SoLieuThongKeHienTaiTheoDonViElement();
        var resultThongKeHoSo = await GetThongKeHoSo(request, cancellationToken);
        var resultThongKeThuTuc = await GetThongKeThuTuc(request, cancellationToken);
        if (resultThongKeThuTuc != null)
        {
            result.ThuTuc = resultThongKeThuTuc.ThuTuc;
            result.ThuTucCungCapThongTin = resultThongKeThuTuc.ThuTucCungCapThongTin;
            result.ThuTucMotPhan = resultThongKeThuTuc.ThuTucMotPhan;
            result.ThuTucToanTrinh = resultThongKeThuTuc.ThuTucToanTrinh;
        }

        if (resultThongKeHoSo != null)
        {
            result.DangXuLy = resultThongKeHoSo.DangXuLy;
            result.DangXuLyDungHan = resultThongKeHoSo.DangXuLyDungHan;
            result.DangXuLyQuaHan = resultThongKeHoSo.DangXuLyQuaHan;
            result.BoSung = resultThongKeHoSo.BoSung;
            result.ThucHienNghiaVuTaiChinh = resultThongKeHoSo.ThucHienNghiaVuTaiChinh;
            result.DungXuLy = resultThongKeHoSo.DungXuLy;
            result.GiaoDichChoThanhToan = resultThongKeHoSo.GiaoDichChoThanhToan;
        }

        return Result<SoLieuThongKeHienTaiTheoDonViElement>.Success(data: result);

    }
}
