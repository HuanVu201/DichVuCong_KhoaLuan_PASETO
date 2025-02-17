using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Statistics.BaoCaoTongHop;
using TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuTienDo;
public class QuyetDinh766ChiTieuTienDoWhereBuilder
{
    public readonly string TRANG_THAI_DANG_XU_LY = "'2','4'";
    public readonly string TRANG_THAI_DA_XU_LY = "'7','9','10'";
    public readonly string TRANG_THAI_DUNG_XU_LY = "'5','6','8'";
    private readonly TiepNhanHoSoTrucTuyenConstants _tiepNhanHoSoTrucTuyenConstants;
    public QuyetDinh766ChiTieuTienDoWhereBuilder(string hoSoTableName)
    {
        _tiepNhanHoSoTrucTuyenConstants = new TiepNhanHoSoTrucTuyenConstants();

        DungXuLy = $"{hoSoTableName}.TrangThaiHoSoId IN ({TRANG_THAI_DUNG_XU_LY}) AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  >= @TuNgay AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay ";
        DungXuLyTrongHan = $"{DungXuLy} AND CONVERT(DATE,{hoSoTableName}.NgayYeuCauBoSung,23)  <= CONVERT(DATE,{hoSoTableName}.NgayHenTra,23)  ";
        DungXuLyQuaHan = $"{DungXuLy} AND CONVERT(DATE,{hoSoTableName}.NgayYeuCauBoSung,23)  <= CONVERT(DATE,{hoSoTableName}.NgayHenTra,23)   ";
        KyTruoc = $"(" +
        $"(CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  < @TuNgay AND {hoSoTableName}.TrangThaiHoSoId IN ({TRANG_THAI_DANG_XU_LY},{TRANG_THAI_DUNG_XU_LY}))" +
        $"OR " +
        $"({hoSoTableName}.TrangThaiHoSoId IN ({TRANG_THAI_DA_XU_LY}) AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  > @TuNgay  AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  < @TuNgay))" +
        $"AND (CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  IS NOT NULL" +
       $") ";
        TrongKy = $"CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  >= @TuNgay AND CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay ";
        TrongKyTrucTuyen = $"{TrongKy} AND  {hoSoTableName}.KenhThucHien = '{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TUYEN}' ";
        TrongKyTrucTiep = $"{TrongKy} AND  {hoSoTableName}.KenhThucHien = '{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.TRUC_TIEP}' ";
        TrongKyBCCI = $"{TrongKy} AND {hoSoTableName}.KenhThucHien = '{_tiepNhanHoSoTrucTuyenConstants.KENH_THUC_HIEN.BCCI}' ";
        DaXuLy = $"{hoSoTableName}.TrangThaiHoSoId IN ({TRANG_THAI_DA_XU_LY}) AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  >= @TuNgay AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  <= @DenNgay ";
        DaXuLyTruocHan = $"{DaXuLy}  AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  < CONVERT(DATE,{hoSoTableName}.NgayHenTra,23)  ";
        DaXuLyTrongHan = $"{DaXuLy} AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  = CONVERT(DATE,{hoSoTableName}.NgayHenTra,23)  ";
        DaXuLyQuaHan = $"{DaXuLy} AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  > CONVERT(DATE,{hoSoTableName}.NgayHenTra,23)  ";
        DangXuLy = $"CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay " +
            $"AND (" +
            $"{hoSoTableName}.TrangThaiHoSoId IN ({TRANG_THAI_DANG_XU_LY}) " +
            $"OR " +
            $"({hoSoTableName}.TrangThaiHoSoId IN ({TRANG_THAI_DA_XU_LY}) AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  > @DenNgay) " +
            $"OR " +
            $"({hoSoTableName}.TrangThaiHoSoId IN ({TRANG_THAI_DUNG_XU_LY}) AND CONVERT(DATE,{hoSoTableName}.NgayYeuCauBoSung,23)  > @DenNgay)" +
            $")  ";
         DangXuLyVaBoSung = $"((CONVERT(DATE,{hoSoTableName}.NgayTiepNhan,23)  <= @DenNgay " +
            $"AND (" +
            $"{hoSoTableName}.TrangThaiHoSoId IN ({TRANG_THAI_DANG_XU_LY}) " +
            $"OR " +
            $"({hoSoTableName}.TrangThaiHoSoId IN ({TRANG_THAI_DA_XU_LY}) AND CONVERT(DATE,{hoSoTableName}.NgayKetThucXuLy,23)  > @DenNgay) " +
            $"OR " +
            $"({hoSoTableName}.TrangThaiHoSoId IN ({TRANG_THAI_DUNG_XU_LY}) AND CONVERT(DATE,{hoSoTableName}.NgayYeuCauBoSung,23)  > @DenNgay)" +
            $")) OR ({DungXuLy})) ";
        DangXuLyTrongHanVaBoSung = $"(({DangXuLy} AND (CONVERT(DATE,{hoSoTableName}.NgayHenTra,23)  >= @DenNgay)  OR {hoSoTableName}.NgayHenTra IS NULL ) OR ({DungXuLy})) ";
        DangXuLyTrongHan = $"{DangXuLy} AND (CONVERT(DATE,{hoSoTableName}.NgayHenTra,23)  >= @DenNgay  OR {hoSoTableName}.NgayHenTra IS NULL )";
        DangXuLyQuaHan = $"{DangXuLy} AND CONVERT(DATE,{hoSoTableName}.NgayHenTra,23)  < @DenNgay ";
      
        TotalWhere = $"(({DangXuLy}) OR ({DaXuLy}) OR ({DungXuLy}))";
    }
    public string TongSo { get; set; } 
    public string KyTruoc { get; set; }
    public string TrongKy { get; set; }
    public string TrongKyTrucTuyen { get; set; }
    public string TrongKyTrucTiep { get; set; }

    public string TrongKyBCCI { get; set; }
    public string DaXuLy { get; set; }
    public string DaXuLyTrongHan { get; set; }
    public string DaXuLyTruocHan { get; set; }
    public string DaXuLyQuaHan { get; set; }
    public string DangXuLy { get; set; }
    public string DangXuLyVaBoSung { get; set; }
    public string DangXuLyTrongHanVaBoSung { get; set; }
    public string DangXuLyTrongHan { get; set; }
    public string DangXuLyQuaHan { get; set; }
    public string DungXuLy { get; set; }
    public string DungXuLyTrongHan { get; set; }
    public string DungXuLyQuaHan { get; set; }
    public string TotalWhere { get; set; }
}
