using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Catalog.GroupApp.Queries;
using TD.DichVuCongApi.Application.Catalog.GroupApp;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using Mapster;

namespace TD.DichVuCongApi.Application.Statistics.SoLieuBaoCao.SoLieuBaoCaoTheoKyJob;
public class SoLieuThongKeDonViTheoKyRequestHandler : IRequestHandler<SoLieuThongKeDonViTheoKyRequest, Result<SoLieuThongKeTheoDonViElement>>
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

    public SoLieuThongKeDonViTheoKyRequestHandler(IDapperRepository dapperRepository, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _mediator = mediator;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
    }

    private async Task<SoLieuThongKeTheoDonViElement> GetThongKeHoSo(SoLieuThongKeDonViTheoKyRequest request, CancellationToken cancellationToken)
    {
        var resultThongKeHoSo = new SoLieuThongKeTheoDonViElement();
        string tuNgay = request.TuNgay.HasValue ? request.TuNgay.Value.ToString("yyyy-MM-dd") : string.Empty;
        string denNgay = request.DenNgay.HasValue ? request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59") : string.Empty;

        var builder = new ThongKeWhereBuilder(tuNgay, denNgay, null, _hoSoTableName);

        string totalWhere = $"WHERE {_hoSoTableName}.DeletedOn IS NULL AND CONVERT(DATE,{_hoSoTableName}.NgayTiepNhan,23)  >= @TuNgay AND CONVERT(DATE,{_hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay AND {_hoSoTableName}.TrangThaiHoSoId NOT IN ('1')";

        if (!string.IsNullOrEmpty(request.MaDinhDanh))
            totalWhere += " AND gr.MaDinhDanh = @MaDinhDanh";

        string sql = $"SELECT " +

                    // Tiếp nhận
                    $"COUNT(DISTINCT {_hoSoTableName}.Id) TiepNhanTrongKy, " +
                    $"COUNT(DISTINCT CASE WHEN ({_hoSoTableName}.KenhThucHien = '2') THEN {_hoSoTableName}.Id END) TiepNhanTrucTuyen, " +
                    $"COUNT(DISTINCT CASE WHEN ({_hoSoTableName}.KenhThucHien = '1') THEN {_hoSoTableName}.Id END) TiepNhanTrucTiep, " +
                    $"COUNT(DISTINCT CASE WHEN ({_hoSoTableName}.KenhThucHien = '3') THEN {_hoSoTableName}.Id END) TiepNhanBCCI, " +

                    $"COUNT(DISTINCT CASE WHEN LaHoSoChungThuc = '1' THEN {_hoSoTableName}.Id END) AS TiepNhanChungThuc, " +
                    $"COUNT(DISTINCT CASE WHEN LoaiDuLieuKetNoi = 'LTKT' OR LoaiDuLieuKetNoi = 'LTKS' THEN {_hoSoTableName}.Id END) AS TiepNhanDVCLienThong, " +

                    $"COUNT(DISTINCT CASE WHEN ({_hoSoTableName}.MucDo = '3' OR {_hoSoTableName}.MucDo = '4') AND KenhThucHien = '2' THEN {_hoSoTableName}.Id END) AS TiepNhanTrucTuyenThuTucTrucTuyen, " +
                    $"COUNT(DISTINCT CASE WHEN {_hoSoTableName}.MucDo = '3' OR {_hoSoTableName}.MucDo = '4' THEN {_hoSoTableName}.Id END) AS TiepNhanThuTucTrucTuyen, " +

                    $"COUNT(DISTINCT CASE WHEN TrangThaiHoSoId = '3' THEN {_hoSoTableName}.Id END) AS TuChoiTiepNhan, " +
                    $"COUNT(DISTINCT CASE WHEN {_hoSoTableName}.TrangThaiHoSoId NOT IN ({_baoCaoTongHopConstants.TRANG_THAI_KHONG_TIEP_NHAN}) THEN {_hoSoTableName}.Id END) AS HoSoThuocThamQuyenGiaiQuyet, " +

                    // Xử lý
                    $"COUNT(DISTINCT CASE WHEN ({builder.where.DaXuLy}) THEN {_hoSoTableName}.Id END) DaXuLy, " +
                    $"COUNT(DISTINCT CASE WHEN ({builder.where.DaXuLyTruocHan}) THEN {_hoSoTableName}.Id END) DaXuLyTruocHan, " +
                    $"COUNT(DISTINCT CASE WHEN ({builder.where.DaXuLyDungHan}) THEN {_hoSoTableName}.Id END) DaXuLyDungHan, " +
                    $"COUNT(DISTINCT CASE WHEN ({builder.where.DaXuLyQuaHan}) THEN {_hoSoTableName}.Id END) DaXuLyQuaHan, " +

                    $"COUNT(DISTINCT CASE WHEN ({builder.where.TraLai}) THEN {_hoSoTableName}.Id END) TraLai, " +

                    $"COUNT(DISTINCT CASE WHEN ({builder.where.DaXuLy} AND {_hoSoTableName}.KenhThucHien = '2' ) THEN {_hoSoTableName}.Id END) TrucTuyenDaXuLy, " +
                    $"COUNT(DISTINCT CASE WHEN ({builder.where.DaXuLyTruocHan} AND {_hoSoTableName}.KenhThucHien = '2' ) THEN {_hoSoTableName}.Id END) TrucTuyenDaXuLyTruocHan, " +
                    $"COUNT(DISTINCT CASE WHEN ({builder.where.DaXuLyDungHan} AND {_hoSoTableName}.KenhThucHien = '2' ) THEN {_hoSoTableName}.Id END) TrucTuyenDaXuLyDungHan, " +
                    $"COUNT(DISTINCT CASE WHEN ({builder.where.DaXuLyQuaHan} AND {_hoSoTableName}.KenhThucHien = '2' ) THEN {_hoSoTableName}.Id END) TrucTuyenDaXuLyQuaHan, " +

                    $"COUNT(DISTINCT CASE WHEN ({builder.where.DangXuLyDungHanVaTruocHan}) THEN {_hoSoTableName}.Id END) DangXuLyDungHanVaTruocHan, " +
                    $"COUNT(DISTINCT CASE WHEN ({builder.where.DaXuLyDungHanTruocHanVaTraLai}) THEN {_hoSoTableName}.Id END) DaXuLyDungHanTruocHanVaTraLai, " +
                    $"COUNT(DISTINCT CASE WHEN ({builder.where.DaXuLy} AND DinhKemKetQua is not null) THEN {_hoSoTableName}.Id END) HoSoDaXuLyCoKetQuaDienTu, " +

                    // Thanh toán
                    $"COUNT(DISTINCT CASE WHEN tt.TrangThaiPhiLePhi = '1' THEN tt.Id END) AS ThuTucCoThuPhi, " +
                    $"COUNT(DISTINCT CASE WHEN yctt.TrangThai = N'Đã thanh toán' AND  yctt.HinhThucThanhToan = 'truc-tuyen' AND tt.TrangThaiPhiLePhi = 1 THEN {_hoSoTableName}.MaTTHC  END) ThuTucCoPhatSinhThanhToanTrucTuyen, " +

                    $"COUNT(DISTINCT CASE WHEN yctt.TrangThai not in (N'{_yeuCauThanhToanConstants.TRANG_THAI.HUY}', N'{_yeuCauThanhToanConstants.TRANG_THAI.HOAN_PHI}') THEN {_hoSoTableName}.Id  END) HoSoCoThuPhi, " +
                    $"COUNT(DISTINCT CASE WHEN yctt.TrangThai not in (N'{_yeuCauThanhToanConstants.TRANG_THAI.HUY}', N'{_yeuCauThanhToanConstants.TRANG_THAI.HOAN_PHI}') AND yctt.HinhThucThanhToan = 'truc-tuyen' THEN {_hoSoTableName}.Id  END) HoSoCoThuPhiThanhToanTrucTuyen, " +

                    $"COUNT(DISTINCT CASE WHEN yctt.TrangThai not in (N'{_yeuCauThanhToanConstants.TRANG_THAI.HUY}', N'{_yeuCauThanhToanConstants.TRANG_THAI.HOAN_PHI}') AND yctt.HinhThucThanhToan = 'truc-tuyen' THEN yctt.Id  END) SoLuongGiaoDichThanhToanTrucTuyen, " +

                     $"SUM(CASE WHEN yctt.TrangThai in (N'{_yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN}') AND yctt.HinhThucThanhToan = 'truc-tuyen' THEN CAST((yctt.Phi + yctt.LePhi) AS decimal) ELSE 0  END) SoTienGiaoDichThanhToanTrucTuyen, " +

                    // Số hóa
                    $"COUNT(DISTINCT CASE WHEN {_hoSoTableName}.SoDinhDanh is not null THEN {_hoSoTableName}.Id  END) HoSoCoDinhDanh, " +
                    $"COUNT(DISTINCT CASE WHEN tphs.DeletedOn is null THEN tphs.HoSo  END) HoSoCoThanhPhan, " +
                    $"COUNT(DISTINCT CASE WHEN tphs.DeletedOn is null AND TrangThaiSoHoa =N'Tái sử dụng' THEN {_hoSoTableName}.Id  END) HoSoTaiSuDungSoHoaThanhPhan, " +
                    $"COUNT(DISTINCT CASE WHEN {builder.where.DaXuLy} THEN {_hoSoTableName}.Id END) HoSoDaXuLyXong, " +
                    $"COUNT(DISTINCT CASE WHEN {builder.where.DaXuLy} AND (({_hoSoTableName}.DinhKemKetQua IS NOT NULL AND {_hoSoTableName}.DinhKemKetQua != '') OR (tt.ThuTucKhongCoKetQua = 1)) THEN {_hoSoTableName}.Id END) HoSoDaXuLyXongCoKetQuaDienTu, " +
                    $"COUNT(DISTINCT CASE WHEN ((tphs.Id is null and tphs.DeletedOn is null) OR  (({_hoSoTableName}.DinhKemKetQua IS NOT NULL AND {_hoSoTableName}.DinhKemKetQua != '') OR (tt.ThuTucKhongCoKetQua = 1))) THEN {_hoSoTableName}.MaHoSo END) HoSoCoThanhPhanHoacKetQuaSoHoa " +

                    $"FROM {_hoSoTableName} " +
                    $"INNER JOIN {_groupsTableName} gr ON {_hoSoTableName}.DonViId = gr.GroupCode " +
                    $"LEFT JOIN {_thuTucsTableName} tt ON {_hoSoTableName}.MaTTHC = tt.MaTTHC " +
                    $"LEFT JOIN {_yeuCauThanhToanTableName} yctt ON {_hoSoTableName}.MaHoSo = yctt.MaHoSo " +
                    $"LEFT JOIN {_tphsTableName} tphs ON {_hoSoTableName}.MaHoSo = tphs.HoSo " +
                    $"{totalWhere} ";

        var resBaoCao = await _dapperRepository.QueryAsync<SoLieuThongKeTheoDonViElement>(sql, new
        {
            TuNgay = tuNgay,
            DenNgay = denNgay,
            request.MaDinhDanh,
        }, null, cancellationToken);

        if (resBaoCao == null || resBaoCao.Count == 0)
        {
            throw new Exception("GetThongKeHoSo not found");
        }
        else
        {
            resultThongKeHoSo = resBaoCao[0];

            if (resultThongKeHoSo.TiepNhanTrucTuyen > 0 && resultThongKeHoSo.TiepNhanTrongKy > 0)
                resultThongKeHoSo.TiepNhanTrucTuyenTyLe = ((double)resultThongKeHoSo.TiepNhanTrucTuyen / (double)resultThongKeHoSo.TiepNhanTrongKy) * 100;

            if (resultThongKeHoSo.TiepNhanTrucTuyenThuTucTrucTuyen > 0 && resultThongKeHoSo.TiepNhanThuTucTrucTuyen > 0)
                resultThongKeHoSo.TiepNhanTrucTuyenThuTucTrucTuyenTyLe = ((double)resultThongKeHoSo.TiepNhanTrucTuyenThuTucTrucTuyen / (double)resultThongKeHoSo.TiepNhanThuTucTrucTuyen) * 100;

            if (resultThongKeHoSo.DaXuLyDungHan + resultThongKeHoSo.DaXuLyTruocHan > 0 && resultThongKeHoSo.DaXuLy > 0)
                resultThongKeHoSo.DaXuLyDungVaTruocHanTyLe = (((double)resultThongKeHoSo.DaXuLyDungHan + (double)resultThongKeHoSo.DaXuLyTruocHan) / (double)resultThongKeHoSo.DaXuLy) * 100;

            if (resultThongKeHoSo.TrucTuyenDaXuLyDungHan + resultThongKeHoSo.TrucTuyenDaXuLyTruocHan > 0 && resultThongKeHoSo.TrucTuyenDaXuLy > 0)
                resultThongKeHoSo.TrucTuyenDaXuLyDungVaTruocHanTyLe = (((double)resultThongKeHoSo.TrucTuyenDaXuLyDungHan + (double)resultThongKeHoSo.TrucTuyenDaXuLyTruocHan) / (double)resultThongKeHoSo.TrucTuyenDaXuLy) * 100;

            if (resultThongKeHoSo.ThuTucCoPhatSinhThanhToanTrucTuyen > 0 && resultThongKeHoSo.ThuTucCoThuPhi > 0)
                resultThongKeHoSo.ThuTucCoPhatSinhThanhToanTrucTuyenTyLe = ((double)resultThongKeHoSo.ThuTucCoPhatSinhThanhToanTrucTuyen / (double)resultThongKeHoSo.ThuTucCoThuPhi) * 100;

            if (resultThongKeHoSo.HoSoCoThuPhiThanhToanTrucTuyen > 0 && resultThongKeHoSo.HoSoCoThuPhi > 0)
                resultThongKeHoSo.HoSoCoThuPhiThanhToanTrucTuyenTyLe = ((double)resultThongKeHoSo.HoSoCoThuPhiThanhToanTrucTuyen / (double)resultThongKeHoSo.HoSoCoThuPhi) * 100;

            if (resultThongKeHoSo.HoSoCoThanhPhan > 0 && resultThongKeHoSo.HoSoCoDinhDanh > 0)
                resultThongKeHoSo.HoSoCoThanhPhanTyLe = ((double)resultThongKeHoSo.HoSoCoThanhPhan / (double)resultThongKeHoSo.HoSoCoDinhDanh) * 100;

            if (resultThongKeHoSo.HoSoDaXuLyXongCoKetQuaDienTu > 0 && resultThongKeHoSo.HoSoDaXuLyXong > 0)
                resultThongKeHoSo.HoSoDaXuLyXongCoSoHoaKetQuaTyLe = ((double)resultThongKeHoSo.HoSoDaXuLyXongCoKetQuaDienTu / (double)resultThongKeHoSo.HoSoDaXuLyXong) * 100;
        }

        return resultThongKeHoSo;
    }

    private async Task<SoLieuThongKeTheoDonViElement> GetThongKeThuTuc(SoLieuThongKeDonViTheoKyRequest request, CancellationToken cancellationToken)
    {
        var resultThongKeThuTuc = new SoLieuThongKeTheoDonViElement();
        string tuNgay = request.TuNgay.HasValue ? request.TuNgay.Value.ToString("yyyy-MM-dd") : string.Empty;
        string denNgay = request.DenNgay.HasValue ? request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59") : string.Empty;
        string totalWhereDOnViThuTuc = $"WHERE tt.DeletedOn IS NULL ";
        string totalWhereHoSo = $"WHERE hs.DeletedOn IS NULL AND CONVERT(DATE, hs.NgayTiepNhan,23)  >= @TuNgay AND CONVERT(DATE, hs.NgayTiepNhan,23)  <= @DenNgay AND hs.TrangThaiHoSoId NOT IN ('1')";

        if (!string.IsNullOrEmpty(request.MaDinhDanh))
        {
            totalWhereDOnViThuTuc += " AND gr.MaDinhDanh = @MaDinhDanh";
            totalWhereHoSo += " AND gr.MaDinhDanh = @MaDinhDanh";
        }

        string sqlDonViThuTuc = $"SELECT " +
                    $"COUNT(DISTINCT tt.MaTTHC) ThuTuc, " +
                    $"COUNT(DISTINCT CASE WHEN tt.MucDo = '3' OR tt.MucDo = '4' THEN tt.MaTTHC END) ThuTucTrucTuyen " +
                    $"FROM {_donViThuTucTableName} tt " +
                    $"INNER JOIN {_groupsTableName} gr ON gr.GroupCode = tt.DonViId " +
                    $"{totalWhereDOnViThuTuc} ";

        var resDonViThuTuc = await _dapperRepository.QueryAsync<SoLieuThongKeTheoDonViElement>(sqlDonViThuTuc, new
        {
            TuNgay = tuNgay,
            DenNgay = denNgay,
            request.MaDinhDanh,
        }, null, cancellationToken);

        string sqlHoSo = $"SELECT " +
                   $"COUNT(DISTINCT hs.MaTTHC ) ThuTucPhatSinhHoSo, " +
                   $"COUNT(DISTINCT CASE WHEN hs.KenhThucHien = '2' THEN hs.MaTTHC END) ThuTucTrucTuyenPhatSinhHoSo " +
                   $"FROM {_hoSoTableName} hs " +
                   $"INNER JOIN {_groupsTableName} gr ON gr.GroupCode = hs.DonViId " +
                   $"{totalWhereHoSo} ";

        var resHoSo = await _dapperRepository.QueryAsync<SoLieuThongKeTheoDonViElement>(sqlHoSo, new
        {
            TuNgay = tuNgay,
            DenNgay = denNgay,
            request.MaDinhDanh,
        }, null, cancellationToken);

        if (resDonViThuTuc == null || resHoSo == null || resDonViThuTuc.Count == 0 || resHoSo.Count == 0)
        {
            throw new Exception("GetThongKeThuTuc not found");
        }
        else
        {
            resultThongKeThuTuc.ThuTuc = resDonViThuTuc[0].ThuTuc;
            resultThongKeThuTuc.ThuTucPhatSinhHoSo = resHoSo[0].ThuTucPhatSinhHoSo;
            resultThongKeThuTuc.ThuTucTrucTuyen = resDonViThuTuc[0].ThuTucTrucTuyen;
            resultThongKeThuTuc.ThuTucTrucTuyenPhatSinhHoSo = resHoSo[0].ThuTucTrucTuyenPhatSinhHoSo;

            if (resultThongKeThuTuc.ThuTucPhatSinhHoSo > 0 && resultThongKeThuTuc.ThuTuc > 0)
                resultThongKeThuTuc.ThuTucPhatSinhHoSoTyLe = ((double)resultThongKeThuTuc.ThuTucPhatSinhHoSo / (double)resultThongKeThuTuc.ThuTuc) * 100;

            if (resultThongKeThuTuc.ThuTucTrucTuyenPhatSinhHoSo > 0 && resultThongKeThuTuc.ThuTucTrucTuyen > 0)
                resultThongKeThuTuc.ThuTucTrucTuyenPhatSinhHoSoTyLe = ((double)resultThongKeThuTuc.ThuTucTrucTuyenPhatSinhHoSo / (double)resultThongKeThuTuc.ThuTucTrucTuyen) * 100;
        }

        return resultThongKeThuTuc;
    }

    private async Task<SoLieuThongKeTheoDonViElement> GetTruyVanCSDLDanCu(SoLieuThongKeDonViTheoKyRequest request, CancellationToken cancellationToken)
    {
        var resultThongKeCsdlDanCu = new SoLieuThongKeTheoDonViElement();
        string tuNgay = request.TuNgay.HasValue ? request.TuNgay.Value.ToString("yyyy-MM-dd") : string.Empty;
        string denNgay = request.DenNgay.HasValue ? request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59") : string.Empty;
        string totalWhere = $"WHERE logcsdl.ThoiGian IS NOT NULL  AND CONVERT(DATE, logcsdl.ThoiGian,23)  >= @TuNgay AND CONVERT(DATE, logcsdl.ThoiGian,23)  <= @DenNgay";
        if (!string.IsNullOrEmpty(request.MaDinhDanh))
            totalWhere += " AND gr.MaDinhDanh = @MaDinhDanh";

        string sql = $@"SELECT 
                                COUNT(DISTINCT logcsdl.Id) TruyVanCSDLDanCu
                                FROM {_logCSDLTableName} logcsdl
                                LEFT JOIN {_userTableName} u ON u.UserName = logcsdl.TaiKhoan
                                LEFT JOIN {_groupsTableName} gr ON gr.GroupCode = u.GroupCode {totalWhere}";

        var res = await _dapperRepository.QueryAsync<SoLieuThongKeTheoDonViElement>(sql, new
        {
            TuNgay = tuNgay,
            DenNgay = denNgay,
            request.MaDinhDanh,
        }, null, cancellationToken);

        if (res == null || res.Count == 0)
        {
            throw new Exception("GetThongKeThuTuc not found");
        }
        else
        {
            resultThongKeCsdlDanCu.TruyVanCSDLDanCu = res[0].TruyVanCSDLDanCu;
        }

        return resultThongKeCsdlDanCu;
    }

    private async Task<SoLieuThongKeTheoDonViElement> GetDanhGiaHaiLong(SoLieuThongKeDonViTheoKyRequest request, CancellationToken cancellationToken)
    {
        var resultThongKeDGHL = new SoLieuThongKeTheoDonViElement();
        string tuNgay = request.TuNgay.HasValue ? request.TuNgay.Value.ToString("yyyy-MM-dd") : string.Empty;
        string denNgay = request.DenNgay.HasValue ? request.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59") : string.Empty;
        string totalWhere = $"WHERE dghl.DeletedOn IS NULL  AND CONVERT(DATE, hs.CreatedOn,23)  >= @TuNgay AND CONVERT(DATE, hs.CreatedOn,23)  <= @DenNgay";
        if (!string.IsNullOrEmpty(request.MaDinhDanh))
            totalWhere += " AND gr.MaDinhDanh = @MaDinhDanh";

        string sql = $@"SELECT 
                        COUNT(DISTINCT CASE WHEN dghl.DanhGia is not null AND dghl.DanhGia <> '' THEN dghl.Id END) DanhGia,
                        COUNT(DISTINCT CASE WHEN dghl.DanhGia = N'{DanhGiaHaiLongConstants.RatHaiLong}' THEN dghl.Id END) DanhGiaRatHaiLong,
                        COUNT(DISTINCT CASE WHEN dghl.DanhGia = N'{DanhGiaHaiLongConstants.HaiLong}' THEN dghl.Id END) DanhGiaHaiLong,
                        COUNT(DISTINCT CASE WHEN dghl.DanhGia = N'{DanhGiaHaiLongConstants.KhongHaiLong}' THEN dghl.Id END) DanhGiaKhongHaiLong
                        FROM {_dghlTableName} dghl
                        LEFT JOIN {_hoSoTableName} hs ON hs.MaHoSo = dghl.MaHoSo
                        LEFT JOIN {_groupsTableName} gr ON hs.DonViId = gr.GroupCode {totalWhere}";

        var res = await _dapperRepository.QueryAsync<SoLieuThongKeTheoDonViElement>(sql, new
        {
            TuNgay = tuNgay,
            DenNgay = denNgay,
            request.MaDinhDanh,
        }, null, cancellationToken);

        if (res == null || res.Count == 0)
        {
            throw new Exception("GetDanhGiaHaiLong not found");
        }
        else
        {
            resultThongKeDGHL = res[0];
        }

        return resultThongKeDGHL;
    }

    public async Task<Result<SoLieuThongKeTheoDonViElement>> Handle(SoLieuThongKeDonViTheoKyRequest request, CancellationToken cancellationToken)
    {
        SoLieuThongKeTheoDonViElement result = new SoLieuThongKeTheoDonViElement();
        var resultThongKeHoSo = await GetThongKeHoSo(request, cancellationToken);
        var resultThongKeThuTuc = await GetThongKeThuTuc(request, cancellationToken);
        var resultThongKeCsdlDanCu = await GetTruyVanCSDLDanCu(request, cancellationToken);
        var resultThongKeDGHL = await GetDanhGiaHaiLong(request, cancellationToken);

        result = resultThongKeHoSo.Adapt(result);

        if (resultThongKeThuTuc != null)
        {
            result.ThuTuc = resultThongKeThuTuc.ThuTuc;
            result.ThuTucPhatSinhHoSo = resultThongKeThuTuc.ThuTucPhatSinhHoSo;
            result.ThuTucPhatSinhHoSoTyLe = resultThongKeThuTuc.ThuTucPhatSinhHoSoTyLe;
            result.ThuTucTrucTuyen = resultThongKeThuTuc.ThuTucTrucTuyen;
            result.ThuTucTrucTuyenPhatSinhHoSo = resultThongKeThuTuc.ThuTucTrucTuyenPhatSinhHoSo;
            result.ThuTucTrucTuyenPhatSinhHoSoTyLe = resultThongKeThuTuc.ThuTucTrucTuyenPhatSinhHoSoTyLe;
        }

        if (resultThongKeCsdlDanCu != null)
            result.TruyVanCSDLDanCu = resultThongKeCsdlDanCu.TruyVanCSDLDanCu;

        if (resultThongKeDGHL != null)
        {
            result.DanhGia = resultThongKeDGHL.DanhGia;
            result.DanhGiaRatHaiLong = resultThongKeDGHL.DanhGiaRatHaiLong;
            result.DanhGiaHaiLong = resultThongKeDGHL.DanhGiaHaiLong;
            result.DanhGiaKhongHaiLong = resultThongKeDGHL.DanhGiaKhongHaiLong;
        }

        #region Tính điểm 766
        result.DiemCongKhaiMinhBach = 6;
        result.DiemTyLeDongBoDVCQuocGia = 6;

        if (result.TiepNhanTrongKy > 0)
            result.DiemTienDoGiaiQuyet = (((double)result.DangXuLyDungHanVaTruocHan + (double)result.DaXuLyDungHanTruocHanVaTraLai) / (double)result.TiepNhanTrongKy) * 20;

        // DVCTT
        if (result.ThuTuc > 0)
        {
            double tyLe = ((double)result.ThuTucTrucTuyen / (double)result.ThuTuc) * 100;
            if (tyLe >= 80)
                result.DiemTyLeCungCapDVCTT = 2;
            else
                result.DiemTyLeCungCapDVCTT = 2 * 0.8;
        }

        if (result.ThuTucTrucTuyen > 0)
        {
            result.DiemTyLeDVCTTPhatSinhHoSo = (double)(((double)result.ThuTucTrucTuyenPhatSinhHoSo / (double)result.ThuTucTrucTuyen) * 4);
        }

        if (result.TiepNhanTrongKy > 0)
        {
            double tyLe = ((double)result.TiepNhanTrucTuyen / (double)result.TiepNhanTrongKy) * 100;
            if (tyLe >= 50)
                result.DiemTyLeHoSoTTHCNopTrucTuyen = 6;
            else
                result.DiemTyLeHoSoTTHCNopTrucTuyen = 6 * 0.5;
        }

        result.DiemCungCapDVCTT = (double)result.DiemTyLeCungCapDVCTT + (double)result.DiemTyLeDVCTTPhatSinhHoSo + (double)result.DiemTyLeHoSoTTHCNopTrucTuyen;

        // ThanhToanTrucTuyen
        if (result.ThuTucCoThuPhi > 0)
        {
            double tyLe = ((double)result.ThuTucCoPhatSinhThanhToanTrucTuyen / (double)result.ThuTucCoThuPhi) * 100;
            if (tyLe >= 50)
                result.DiemTyLeTTHCCoGiaoDichTTTT = 2;
            else
                result.DiemTyLeTTHCCoGiaoDichTTTT = 2 * 0.8;
        }

        result.DiemTyLeTTHCCoTheThanhToanTrenCongDVCQG = 2;

        if (result.HoSoCoThuPhi > 0)
        {
            double tyLe = ((double)result.HoSoCoThuPhiThanhToanTrucTuyen / (double)result.HoSoCoThuPhi) * 100;
            if (tyLe >= 30)
                result.DiemTyLeHoSoTTTT = 6;
            else
                result.DiemTyLeHoSoTTTT = 3 * 0.3;
        }

        result.DiemThanhToanTrucTuyen = (double)result.DiemTyLeTTHCCoGiaoDichTTTT + (double)result.DiemTyLeTTHCCoTheThanhToanTrenCongDVCQG + (double)result.DiemTyLeHoSoTTTT;

        // Số hóa
        if (result.HoSoThuocThamQuyenGiaiQuyet > 0)
            result.DiemTyLeCapKQDienTu = (double)(((double)result.HoSoDaXuLyCoKetQuaDienTu / (double)result.HoSoThuocThamQuyenGiaiQuyet) * 6);

        if (result.HoSoThuocThamQuyenGiaiQuyet > 0)
        {
            double tyLe = ((double)result.HoSoCoThanhPhanHoacKetQuaSoHoa / (double)result.HoSoThuocThamQuyenGiaiQuyet) * 100;
            if (tyLe >= 80)
                result.DiemTyLeSoHoaHoSo = 4;
            else
                result.DiemTyLeSoHoaHoSo = 4 * 0.8;
        }

        if (result.HoSoThuocThamQuyenGiaiQuyet > 0)
        {
            double tyLe = ((double)result.HoSoTaiSuDungSoHoaThanhPhan / (double)result.HoSoThuocThamQuyenGiaiQuyet) * 100;
            if (tyLe >= 80)
                result.DiemTyLeTaiSuDung = 2;
            else
                result.DiemTyLeTaiSuDung = 2 * 0.8;
        }

        result.DiemSoHoa = (double)result.DiemTyLeCapKQDienTu + (double)result.DiemTyLeSoHoaHoSo + (double)result.DiemTyLeTaiSuDung;

        result.TongDiem766 = (double)result.DiemCongKhaiMinhBach + (double)result.DiemTyLeDongBoDVCQuocGia + (double)result.DiemTienDoGiaiQuyet +
            (double)result.DiemCungCapDVCTT + (double)result.DiemThanhToanTrucTuyen + (double)result.DiemSoHoa;

        #endregion

        return Result<SoLieuThongKeTheoDonViElement>.Success(data: result);

    }
}
