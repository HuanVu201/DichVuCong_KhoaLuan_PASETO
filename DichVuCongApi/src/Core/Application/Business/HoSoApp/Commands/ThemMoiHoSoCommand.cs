using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;


namespace TD.DichVuCongApi.Application.Business.HoSoApp.Commands;
public class ThemMoiHoSoCommand : ICommand
{
    public string MaTTHC { get; set; }  
    public string Key { get; set; }  
    public string DonVi { get; set; }  
    public string? KenhThucHien { get; set; }  
    public string? TrichYeuHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? SoDienThoaiChuHoSo { get; set; }
    public string? EmailChuHoSo { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? DiaChiChuHoSo { get; set; }
    public bool? UyQuyen { get; set; }  
    public string? NguoiDuocUyQuyen { get; set; }
    public string? SoDienThoaiNguoiDuocUyQuyen { get; set; }
    public string? EmailNguoiDuocUyQuyen { get; set; }
    public string? SoGiayToNguoiDuocUyQuyen { get; set; }
    public string? DiaChiNguoiDuocUyQuyen { get; set; }
    public List<ThanhPhanHoSoDongBoTaoMoiHoSo>? ThanhPhanHoSo { get; set; }
}

public class ThanhPhanHoSoDongBoTaoMoiHoSo
{
    public string TenThanhPhan { get; set; }
    public int SoBanChinh { get; set; }
    public int SoBanSao { get; set; }
    public List<TepDinhKem> TepDinhKem { get; set; }
}

public class TepDinhKem
{
    public string Base64 { get; set; }
    public string TenTep { get; set; }
}

public class DongBoTaoMoiHoSoSettings
{
    public List<string>  MaTTHC { get; set; }
    public List<string>  DonVi { get; set; }
    public string Key {  get; set; }
}


