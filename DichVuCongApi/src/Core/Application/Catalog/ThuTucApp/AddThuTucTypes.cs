namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp;
public class CachThucThucHien
{
    public string KENH { get; set; }
    public List<ThoiGian> THOIGIAN { get; set; }
}
public class ThoiGian
{
    public string DONVITINH { get; set; }
    public string MOTA { get; set; }
    public List<PhiLePhi> PHILEPHI { get; set; }
    public string THOIGIANGIAIQUYET { get; set; }
}

public class PhiLePhi
{
    public string DONVI { get; set; }
    public string MAPHILEPHI { get; set; }
    public string MOTA { get; set; }
    public string SOTIEN { get; set; }
    public string TENTEP { get; set; }
    public string URL { get; set; }
}
public class CanCuPhapLy
{
    public string COQUANBANHANH { get; set; }
    public string DIACHITRUYCAP { get; set; }
    public string NGAYBANHANH { get; set; }
    public string NGAYHIEULUC { get; set; }
    public string SOVANBAN { get; set; }
    public string TENVANBAN { get; set; }
}

public class CapThucHien
{
    public string CAPTHUCHIEN { get; set; }
    public string TENCAP { get; set; }
}
public class CoQuanCoThamQuyen
{
    public string MADONVI { get; set; }
    public string TENDONVI { get; set; }
}

public class CoQuanDuocUyQuyen
{
    public string MADONVI { get; set; }
    public string TENDONVI { get; set; }
}


public class CoQuanPhoiHop
{
    public string MADONVI { get; set; }
    public string TENDONVI { get; set; }
}

public class CoQuanThucHien
{
    public string MADONVI { get; set; }
    public string TENDONVI { get; set; }
}

public class DoiTuongThucHien
{
    public string MADOITUONG { get; set; }
    public string TENDOITUONG { get; set; }
}

public class KetQuaThucHien
{
    public string MAKETQUA { get; set; }
    public string TENKETQUA { get; set; }
    public string TENTEP { get; set; }
    public string URL { get; set; }
}


public class LinhVucThucHien
{
    public string MALINHVUC { get; set; }
    public string TENLINHVUC { get; set; }
}

public class ThanhPhanHoSo
{
    public List<GiayTo> GIAYTO { get; set; }
    public string TRUONGHOP { get; set; }
}

public class GiayTo
{
    public string MAGIAYTO { get; set; }
    public string MA_KQ_THAYTHE { get; set; }
    public string SOBANCHINH { get; set; }
    public string SOBANSAO { get; set; }
    public string TENGIAYTO { get; set; }
    public string TENMAUDON { get; set; }
    public string URL { get; set; }
}

public class TrinhTuThucHien
{
    public List<TrinhTu> TRINHTU { get; set; }
    public string TRUONGHOP { get; set; }
}

public class TrinhTu
{
    public string TENTRINHTU { get; set; }
}