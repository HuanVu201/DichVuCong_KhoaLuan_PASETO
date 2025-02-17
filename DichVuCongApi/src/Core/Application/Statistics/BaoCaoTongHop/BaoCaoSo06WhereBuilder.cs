using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.HoSo;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
public class BaoCaoSo06WhereBuilder
{

    public string TuNgay { get; set; }
    public string DenNgay { get; set; }
    public int? Year { get; set; } = DateTime.Now.Year;
    public string hoSoTableName { get; private set; } = "Business.HoSos";
    
    private readonly BaoCaoTongHopConstants _baoCaoTongHopConstants;
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    public ThongKeConditionResponse where { get; private set; }

    public BaoCaoSo06WhereBuilder(string tuNgay, string denNgay, int? year, string? tableName)
    {
        TuNgay = tuNgay;
        DenNgay = denNgay;
        Year = year;
        hoSoTableName = tableName ?? hoSoTableName;
        _baoCaoTongHopConstants = new BaoCaoTongHopConstants();
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();
        where = Build();
    }

    public ThongKeConditionResponse Build()
    {
        var tiepNhanKyTruocWhere = $"(({hoSoTableName}.NgayTiepNhan < @TuNgay AND {hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DANG_XU_LY},{_baoCaoTongHopConstants.TRANG_THAI_BO_SUNG},{_baoCaoTongHopConstants.TRANG_THAI_DUNG_XU_LY}))" +
         $"OR " +
         $"({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY},{_baoCaoTongHopConstants.TRANG_THAI_TRA_LAI}) AND {hoSoTableName}.NgayTra > @TuNgay  AND {hoSoTableName}.NgayTiepNhan < @TuNgay))" +
         $"AND ({hoSoTableName}.NgayTiepNhan IS NOT NULL" +
         $")";
        string tiepNhan = $"{hoSoTableName}.NgayTiepNhan >= @TuNgay AND {hoSoTableName}.NgayTiepNhan <= @DenNgay";
        string tiepNhanTrongKy = $"{hoSoTableName}.NgayTiepNhan >= @TuNgay AND {hoSoTableName}.NgayTiepNhan <= @DenNgay AND {hoSoTableName}.KenhThucHien != '{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN}'";
        string tiepNhanQuaMang = $"{hoSoTableName}.NgayTiepNhan >= @TuNgay AND {hoSoTableName}.NgayTiepNhan <= @DenNgay AND {hoSoTableName}.KenhThucHien = '{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN}'";
        string tiepNhanTrucTiep = $"{hoSoTableName}.NgayTiepNhan >= @TuNgay AND {hoSoTableName}.NgayTiepNhan <= @DenNgay AND {hoSoTableName}.KenhThucHien = '{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TIEP}'";
        string tiepNhanQuaBCCI = $"{hoSoTableName}.NgayTiepNhan >= @TuNgay AND {hoSoTableName}.NgayTiepNhan <= @DenNgay AND {hoSoTableName}.KenhThucHien = '{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.BCCI}'";

        string daXuLyWhere = $"{hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY}) AND {hoSoTableName}.NgayTra >= @TuNgay AND {hoSoTableName}.NgayTra <= @DenNgay";
        string daXuLyTruocHanWhere = $"{daXuLyWhere} AND {hoSoTableName}.NgayTra < {hoSoTableName}.NgayHenTra";
        string daXuLyDungHanWhere = $"{daXuLyWhere} AND {hoSoTableName}.NgayTra = {hoSoTableName}.NgayHenTra";
        string daXuLyDungHanVaTruocHanWhere = $"{daXuLyWhere} AND {hoSoTableName}.NgayTra <= {hoSoTableName}.NgayHenTra";
        string daXuLyQuaHanWhere = $"{daXuLyWhere} AND {hoSoTableName}.NgayTra > {hoSoTableName}.NgayHenTra";
        string dangXuLyWhere = $"{hoSoTableName}.NgayTiepNhan <= @DenNgay " +
        $"AND (" +
        $"{hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DANG_XU_LY}) " +
        $"OR " +
        $"({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DA_XU_LY},{_baoCaoTongHopConstants.TRANG_THAI_TRA_LAI}) AND {hoSoTableName}.NgayTra > @DenNgay) " +
        $"OR " +
        $"({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_BO_SUNG}) AND {hoSoTableName}.NgayYeuCauBoSung > @DenNgay)" +
        $")";
        string dangXuLyTrongHanWhere = $"{dangXuLyWhere} AND {hoSoTableName}.NgayHenTra >= @DenNgay";
        string dangXuLyDungHanVaTruocHanWhere = $"{dangXuLyWhere} AND {hoSoTableName}.NgayTra <= {hoSoTableName}.NgayHenTra";
        string dangXuLyQuaHanWhere = $"{dangXuLyWhere} AND {hoSoTableName}.NgayHenTra < @DenNgay";
        string boSungWhere = $"(({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_BO_SUNG}) AND (CONVERT(DATE,{hoSoTableName}.NgayYeuCauBoSung,23)  <= @DenNgay OR CONVERT(DATE,{hoSoTableName}.NgayYeuCauBoSung,23)  IS NULL)) OR ({hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_DUNG_XU_LY})))";
        string traLaiWhere = $"{hoSoTableName}.NgayTiepNhan <= @DenNgay " +
        $"AND {hoSoTableName}.TrangThaiHoSoId IN ({_baoCaoTongHopConstants.TRANG_THAI_TRA_LAI}) " +
        $"AND {hoSoTableName}.NgayTra >= @TuNgay " +
        $"AND {hoSoTableName}.NgayTra <= @DenNgay";

        return new ThongKeConditionResponse()
        {
            TiepNhan = tiepNhan,
            TiepNhanKyTruoc = tiepNhanKyTruocWhere,
            TiepNhanTrongKy = tiepNhanTrongKy,
            TiepNhanTrucTiep = tiepNhanTrucTiep,
            TiepNhanQuaBCCI = tiepNhanQuaBCCI,
            TiepNhanQuaMang = tiepNhanQuaMang,
            DaXuLy = daXuLyWhere,
            DaXuLyDungHanVaTruocHan = daXuLyDungHanVaTruocHanWhere,
            DaXuLyTruocHan = daXuLyTruocHanWhere,
            DaXuLyQuaHan = daXuLyQuaHanWhere,
            DaXuLyDungHan = daXuLyDungHanWhere,
            DangXuLy = dangXuLyWhere,
            DangXuLyDungHanVaTruocHan = dangXuLyDungHanVaTruocHanWhere,
            DangXuLyQuaHan = dangXuLyQuaHanWhere,
            DangXuLyTrongHan = dangXuLyTrongHanWhere,
            BoSung = boSungWhere,
            TraLai = traLaiWhere,
        };
    }
}
