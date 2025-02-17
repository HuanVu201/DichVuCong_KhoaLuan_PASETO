namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop.BaoCaoTongHopDonVi;

using TD.DichVuCongApi.Application.Business.DuThaoXuLyHoSoApp.Constant;
using TD.DichVuCongApi.Application.Business.YeuCauThanhToanApp;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

public class BaoCaoTongHopDonViWhereBuilder
{
    public string TuNgay { get; set; }
    public string DenNgay { get; set; }
    public int? Year { get; set; } = DateTime.Now.Year;
    public string hoSoTableName { get; private set; } = "Business.HoSos";
    private readonly string yeuCauThanhToanTableName = "Business.YeuCauThanhToans";
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    private readonly YeuCauThanhToanConstants _yeuCauThanhToanConstants;
    public ThongKeConditionResponse where { get; private set; }

    public BaoCaoTongHopDonViWhereBuilder(string tuNgay, string denNgay, int? year, string? tableName)
    {
        TuNgay = tuNgay;
        DenNgay = denNgay;
        Year = year;
        hoSoTableName = tableName ?? hoSoTableName;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        _yeuCauThanhToanConstants = new YeuCauThanhToanConstants();
        where = Build();
    }

    public ThongKeConditionResponse Build()
    {
        string boSungWhere = $"CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay " +
            $"AND (({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_BO_SUNG}) " +
            $"AND (CONVERT(DATE,{hoSoTableName}.NgayYeuCauBoSung,23)  <= @DenNgay OR CONVERT(DATE,{hoSoTableName}.NgayYeuCauBoSung,23)  IS NULL)) " +
            $"OR ({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DUNG_XU_LY})))";
        string trangThaiBoSungWhere = $"CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay " +
            $"AND (({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_BO_SUNG}) " +
            $"AND (CONVERT(DATE,{hoSoTableName}.NgayYeuCauBoSung,23)  <= @DenNgay OR CONVERT(DATE,{hoSoTableName}.NgayYeuCauBoSung,23)  IS NULL))) ";
        string trangThaiDungXuLyWhere = $"{hoSoTableName}.TrangThaiHoSoId = '8' ";
        string yeuCauThucHienNVTCWhere = $"{hoSoTableName}.TrangThaiHoSoId = '6' ";
        string traLaiWhere = $"{hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_TRA_LAI},{_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY}) AND {hoSoTableName}.LoaiKetQua = N'{DuThaoXuLyHoSoConstant.Loai_TraLaiXinRut}' " +
        $"AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  >= @TuNgay " +
        $"AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  <= @DenNgay";
        string traLaiTruocHanWhere = $"{traLaiWhere} AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23) < CONVERT(DATE,{hoSoTableName}.NgayHenTra,23)";
        string traLaiDungHanWhere = $"{traLaiWhere} AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23) = CONVERT(DATE,{hoSoTableName}.NgayHenTra,23)";
        string traLaiQuaHanWhere = $"{traLaiWhere} AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23) > CONVERT(DATE,{hoSoTableName}.NgayHenTra,23)";
        var tiepNhanKyTruocWhere = $"((CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  < @TuNgay AND {hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DANG_XU_LY},{_baoCaoTongHopConstants.TRANG_THAI_BO_SUNG},{_baoCaoTongHopConstants.TRANG_THAI_DUNG_XU_LY}))" +
         $"OR " +
         $"({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY},{_baoCaoTongHopConstants.TRANG_THAI_TRA_LAI}) AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  >= @TuNgay  AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  < @TuNgay))" +
         $"AND (CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  IS NOT NULL" +
         $")";
        string tiepNhan = $"CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  >= @TuNgay AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay";
        string tiepNhanTrongKy = $"CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  >= @TuNgay AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay ";
        string tiepNhanTrucTiepVaBCCI = $"CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  >= @TuNgay AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay AND {hoSoTableName}.KenhThucHien IN ('{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TIEP}', '{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.BCCI}')";
        string tiepNhanQuaMang = $"CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  >= @TuNgay AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay AND {hoSoTableName}.KenhThucHien = '{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN}'";
        string tiepNhanTrucTiep = $"CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  >= @TuNgay AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay AND {hoSoTableName}.KenhThucHien = '{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TIEP}'";
        string tiepNhanQuaBCCI = $"CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  >= @TuNgay AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay AND {hoSoTableName}.KenhThucHien = '{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.BCCI}'";

        string daXuLyWhere = $"{hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY}) AND ({hoSoTableName}.LoaiKetQua != N'{DuThaoXuLyHoSoConstant.Loai_TraLaiXinRut}' OR {hoSoTableName}.LoaiKetQua IS NULL ) AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  >= @TuNgay AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  <= @DenNgay";
        string daXuLyVaTraLaiWhere = $"(({daXuLyWhere}) OR ({traLaiWhere}))";
        string daXuLyTruocHanWhere = $"{daXuLyWhere} AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  < CONVERT(DATE,{hoSoTableName}.NgayHenTra,23) ";
        string daXuLyDungHanWhere = $"{daXuLyWhere} AND (CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  = CONVERT(DATE,{hoSoTableName}.NgayHenTra,23) OR {hoSoTableName}.NgayHenTra IS NULL )";
        string daXuLyDungHanVaTraLaiWhere = $"(({daXuLyWhere} AND (CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  = CONVERT(DATE,{hoSoTableName}.NgayHenTra,23) OR {hoSoTableName}.NgayHenTra IS NULL)) OR ({traLaiWhere}))";
        string daXuLyDungHanTruocHanVaTraLaiWhere = $"(({daXuLyWhere} AND (CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  <= CONVERT(DATE,{hoSoTableName}.NgayHenTra,23) OR {hoSoTableName}.NgayHenTra IS NULL)) OR ({traLaiWhere}))";
        string daXuLyDungHanVaTruocHanWhere = $"{daXuLyWhere} AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  <= CONVERT(DATE,{hoSoTableName}.NgayHenTra,23) ";
        string daXuLyQuaHanWhere = $"{daXuLyWhere} AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23) > CONVERT(DATE,{hoSoTableName}.NgayHenTra,23)";
        string dangXuLyWhere = $"CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay " +
        $"AND (" +
        $"{hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DANG_XU_LY}) " +
        $"OR " +
        $"({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY},{_baoCaoTongHopConstants.TRANG_THAI_TRA_LAI}) AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  > @DenNgay) " +
        $"OR " +
        $"({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_BO_SUNG}) AND CONVERT(DATE,{hoSoTableName}.NgayYeuCauBoSung,23)  > @DenNgay)" +
        $")";
        string dangXuLyTrongHanWhere = $"{dangXuLyWhere} AND (CONVERT(DATE,{hoSoTableName}.NgayHenTra,23)  >= @DenNgay OR {hoSoTableName}.NgayHenTra IS NULL )";
        string dangXuLyDungHanVaTruocHanWhere = $"{dangXuLyWhere} AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  <= CONVERT(DATE,{hoSoTableName}.NgayHenTra,23) ";
        string dangXuLyQuaHanWhere = $"{dangXuLyWhere} AND CONVERT(DATE,{hoSoTableName}.NgayHenTra,23)  < @DenNgay";
        string dangXuLyVaBoSungWhere = $"(({dangXuLyWhere}) OR ({boSungWhere}))";
        string dangXuLyTrongHanVaBoSungWhere = $"(({dangXuLyTrongHanWhere}) OR ({boSungWhere}))";
        string coNghiaVuTaiChinh = $"{yeuCauThanhToanTableName}.Ma IS NOT NULL";
        string daTTTTquaDvcqg = $"{yeuCauThanhToanTableName}.Ma IS NOT NULL AND {yeuCauThanhToanTableName}.TrangThai = N'{_yeuCauThanhToanConstants.TRANG_THAI.DA_THANH_TOAN}' AND {yeuCauThanhToanTableName}.HinhThucThanhToan = '{_yeuCauThanhToanConstants.HINH_THUC_THANH_TOAN.TRUC_TUYEN}'";
        string xuLyDungHan = $"({daXuLyDungHanVaTraLaiWhere} OR {dangXuLyTrongHanVaBoSungWhere})";
        string tiepNhanQuaHan = $"{tiepNhan} AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23) > CONVERT(DATE,{hoSoTableName}.HanTiepNhan,23)";
        string dangXuLyQuaHanTrongKy = $"{hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DANG_XU_LY}) AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  >= @TuNgay AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay AND CONVERT(DATE,{hoSoTableName}.NgayHenTra,23)  < @DenNgay";

        //hạn trong 24h
        string dangXuLySapHetHanWhere = $@"{dangXuLyWhere}
                                        AND CONVERT(DATE, {hoSoTableName}.NgayHenTra, 23) > CAST(GETDATE() AS DATE)
                                        AND DATEADD(HOUR, -24, CONVERT(DATETIME, {hoSoTableName}.NgayHenTra, 23)) <= GETDATE()";

        return new ThongKeConditionResponse()
        {
            TiepNhan = tiepNhan,
            TiepNhanKyTruoc = tiepNhanKyTruocWhere,
            TiepNhanTrongKy = tiepNhanTrongKy,
            TiepNhanTrucTiepVaBCCI = tiepNhanTrucTiepVaBCCI,
            TiepNhanTrucTiep = tiepNhanTrucTiep,
            TiepNhanQuaBCCI = tiepNhanQuaBCCI,
            TiepNhanQuaMang = tiepNhanQuaMang,
            DaXuLy = daXuLyWhere,
            DaXuLyDungHanVaTruocHan = daXuLyDungHanVaTruocHanWhere,
            DaXuLyTruocHan = daXuLyTruocHanWhere,
            DaXuLyQuaHan = daXuLyQuaHanWhere,
            DangXuLySapHetHan = dangXuLySapHetHanWhere,
            DaXuLyDungHan = daXuLyDungHanWhere,
            DangXuLy = dangXuLyWhere,
            DangXuLyDungHanVaTruocHan = dangXuLyTrongHanWhere,
            DangXuLyQuaHan = dangXuLyQuaHanWhere,
            DangXuLyTrongHan = dangXuLyTrongHanWhere,
            BoSung = boSungWhere,
            TrangThaiBoSung = trangThaiBoSungWhere,
            TrangThaiDungXuLy = trangThaiDungXuLyWhere,
            TrangThaiYeuCauThucHienNVTC = yeuCauThucHienNVTCWhere,
            TraLai = traLaiWhere,
            DangXuLyTrongHanVaBoSung = dangXuLyTrongHanVaBoSungWhere,
            DaXuLyDungHanVaTraLai = daXuLyDungHanVaTraLaiWhere,
            DangXuLyVaBoSung = dangXuLyVaBoSungWhere,
            DaXuLyVaTraLai = daXuLyVaTraLaiWhere,
            CoNghiaVuTaiChinh = coNghiaVuTaiChinh,
            DaTTTTQuaDvcqg = daTTTTquaDvcqg,
            XuLyDungHan = xuLyDungHan,
            TiepNhanQuaHan = tiepNhanQuaHan,
            DangXuLyQuaHanTrongKy = dangXuLyQuaHanTrongKy,
            DaXuLyDungHanTruocHanVaTraLai = daXuLyDungHanTruocHanVaTraLaiWhere,
            TraLaiDungHan = traLaiDungHanWhere,
            TraLaiQuaHan = traLaiQuaHanWhere,
            TraLaiTruocHan = traLaiTruocHanWhere
        };
    }
}

