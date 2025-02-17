using TD.DichVuCongApi.Application.Catalog.ConfigApp.Queries;

namespace TD.DichVuCongApi.Application.Business.VBDLIS.Services;
public class VBDLISTiepNhanHoSoRequest
{
    public bool LaQuyTrinhCapTinh { get; set; } = true;
    public int TinhId { get; set; }
    public int HuyenId { get; set; }
    public int XaId { get; set; }
    public string SoBienNhan { get; set; }
    public string? MaHoSoMotCua { get; set; }
    public string NguoiTiepNhan { get; set; }
    public DateTime? NgayTiepNhan { get; set; }
    public DateTime? NgayHenTra { get; set; }
    public string? DiaChiTaiSan { get; set; }
    public VBDLISThongTinNguoiNop ThongTinNguoiNopDon { get; set; }
    public VBDLISThongTinQuyTrinh ThongTinQuyTrinh { get; set; }
    public List<VBDLISThongTinThuaDat>? ThongTinThuaDat { get; set; }
    public List<VBDLISThongTinGiayToDinhKem> DanhSachGiayToDinhKem { get; set; }

}

public class VBDLISThongTinNguoiNop
{
    public VBDLISThongTinNguoiNop(string hoTen, string? soChungMinh, string? diaChiChiTiet, string? soDienThoai, string? email)
    {
        HoTen = hoTen;
        SoChungMinh = soChungMinh;
        DiaChiChiTiet = diaChiChiTiet;
        SoDienThoai = soDienThoai;
        Email = email;
    }

    public string? HoTen { get; set; }
    public string? SoChungMinh { get; set; }
    public string? DiaChiChiTiet { get; set; }
    public string? SoDienThoai { get; set; }
    public string? Email { get; set; }
}

public class VBDLISThongTinQuyTrinh
{
    public VBDLISThongTinQuyTrinh(string maQuyTrinh, string tenQuyTrinh)
    {
        MaQuyTrinh = maQuyTrinh;
        TenQuyTrinh = tenQuyTrinh;
    }

    public string MaQuyTrinh { get; set; }
    public string TenQuyTrinh { get; set; }
}

public class VBDLISThongTinThuaDat
{
    public string? SoThuTuThua { get; set; }
    public string? SoHieuBanDo { get; set; }
    public string? DienTich { get; set; }
    public string? DiaChiChiTiet {get;set;}
}

public class VBDLISThongTinGiayToDinhKem
{
    public string TenGiayTo { get; set; }
    public int? SoBanChinh { get; set; }
    public int? SoBanSao { get; set; }
    public VBDLISThongTinTapTin? TapTin { get; set; }
}

public class VBDLISThongTinTapTin
{
    public VBDLISThongTinTapTin(string? name, string? data)
    {
        this.name = name;
        this.data = data;
    }

    public string? name { get; set; }
    public string? data { get; set; }
}
