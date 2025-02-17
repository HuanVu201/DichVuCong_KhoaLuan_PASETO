namespace TD.DichVuCongApi.Application.Statistics.TiepNhanHoSoTrucTuyen;
public class TiepNhanHoSoTrucTuyenConstants
{
    public MucDoHoSoTrucTuyenConstant MUC_DO { get; set; }
    public KenhThucHienHoSoTrucTuyenConstant KENH_THUC_HIEN { get; set; }
    public CatalogHoSoTrucTuyenContant CATALOG { get; set; }
    public TrangThaiXuLyContanst TRANGTHAIXULY { get; set; }
    public LoaiDoiTuongNopHoSoConstant LOAIDOITUONG { get; set; }
    public TiepNhanHoSoTrucTuyenConstants()
    {
        MUC_DO = new MucDoHoSoTrucTuyenConstant();
        KENH_THUC_HIEN = new KenhThucHienHoSoTrucTuyenConstant();
        CATALOG = new CatalogHoSoTrucTuyenContant();
        TRANGTHAIXULY = new TrangThaiXuLyContanst();
        LOAIDOITUONG = new LoaiDoiTuongNopHoSoConstant();
    }

}
public class MucDoHoSoTrucTuyenConstant
{
    public readonly string TOAN_TRINH = "4";
    public readonly string MOT_PHAN = "3";
    public readonly string DVC = "2";
}

public class KenhThucHienHoSoTrucTuyenConstant
{
    public readonly string TRUC_TIEP = "1";
    public readonly string TRUC_TUYEN = "2";
    public readonly string BCCI = "3";
}

public class CatalogHoSoTrucTuyenContant
{
    public readonly string SO_BAN_NGANH = "so-ban-nganh";
    public readonly string CNVPDK = "cnvpdk";
    public readonly string QUAN_HUYEN = "quan-huyen";
    public readonly string XA_PHUONG = "xa-phuong";
    public readonly string TTHCCTH = "0A97F0DB-325A-6205-69D4-F7131F368F64";
}
public class TrangThaiXuLyContanst
{
    public readonly string QUA_HAN = "QuaHan";
    public readonly string DA_XU_LY_QUA_HAN = "DaXuLyQuaHan";
    public readonly string DANG_XU_LY_QUA_HAN = "DangXuLyQuaHan";
}
public class LoaiDoiTuongNopHoSoConstant
{
    public readonly string CONG_DAN = "Công dân";
    public readonly string TO_CHUC = "Tổ chức nhà nước";
    public readonly string DOANH_NGHIEP = "Doanh nghiệp";
}