using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.TraCuuHoKinhDoanhApp.Queries;

public sealed record GetTraCuuHoKinhDoanhQuery(string Id) : IQuery<HHCert>;

public class HoKinhDoanh
{
    public List<HHCert> HHCert { get; set; }
}

public class HHCert
{
    public string MaNoiBo { get; set; }
    public string MaSoHKD { get; set; }
    public string MaSoDangKyHKD { get; set; }
    public DateTime FOUNDING_DATE { get; set; }
    public string MaLoaiHinhHKD { get; set; }
    public string LoaiHinhHKD { get; set; }
    public string TenTiengViet { get; set; }
    public string TenVietTat { get; set; }
    public string TenNuocNgoai { get; set; }
    public DateTime NgayDangKyLanDau { get; set; }
    public DateTime? NgayDangKyThayDoi { get; set; }
    public int SoLanDangKyThayDoi { get; set; }
    public List<ThongTinCaNhan> ChuHoKinhDoanh { get; set; }
    public List<DiaChiTruSo> DiaChiTruSo { get; set; }
    public List<NganhNgheKinhDoanh> NganhNgheKinhDoanh { get; set; }
}

public class ThongTinCaNhan
{
    public string HoVaTen { get; set; }
    public string LoaiGiayToChungThuc { get; set; }
    public string MaLoaiGiayToChungThuc { get; set; }
    public string SoGiayChungThuc { get; set; }
    public DateTime NgayCap { get; set; }
    public string NoiCap { get; set; }
    public string QuocTich { get; set; }
    public int MaQuocTich { get; set; }
}

public class DiaChiTruSo
{
    public int MaTinhThanh { get; set; }
    public string TenTinhThanh { get; set; }
    public int MaQuanHuyen { get; set; }
    public string TenQuanHuyen { get; set; }
    public int MaPhuongXa { get; set; }
    public string TenPhuongXa { get; set; }
    public string SoNha { get; set; }
    public string DiaChiDayDu { get; set; }
}

public class NganhNgheKinhDoanh
{
    public string MaNganh { get; set; }
    public string TenNganh { get; set; }
    public int LaNganhChinh { get; set; }
}
