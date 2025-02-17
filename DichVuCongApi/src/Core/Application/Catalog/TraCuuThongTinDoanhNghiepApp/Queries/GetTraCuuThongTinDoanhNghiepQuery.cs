using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.TraCuuThongTinDoanhNghiepApp.Queries;

public sealed record GetTraCuuThongTinDoanhNghiepQuery(string Id) : IQuery<EntCert>;

public class BusinessInfo
{
    public List<EntCert> GetEntCert { get; set; }
}

public class EntCert
{
    public string MaNoiBo { get; set; }
    public string MaSoDoanhNghiep { get; set; }
    public string SoGCNDKKD { get; set; }
    public string MaLoaiHinhDN { get; set; }
    public string LoaiHinhDN { get; set; }
    public string TenTiengViet { get; set; }
    public string TenNuocNgoai { get; set; }
    public string TenVietTat { get; set; }
    public DateTime NgayDangKyLanDau { get; set; }
    public DateTime NgayDangKyThayDoi { get; set; }
    public int SoLanDangKyThayDoi { get; set; }
    public List<TinhTrangPhapLy_object> TinhTrangPhapLy { get; set; }
    public List<DaiDienPhapLuat> DaiDienPhapLuat { get; set; }
    public List<DiaChiTruSo> DiaChiTruSo { get; set; }
    public List<NganhNgheKinhDoanh> NganhNgheKinhDoanh { get; set; }
}

public class TinhTrangPhapLy_object
{
    public string TinhTrangPhapLy { get; set; }
    public string MaTinhTrangPhapLy { get; set; }
    public DateTime? NgayBatDauTamNgung { get; set; }
    public DateTime? NgayKetThucTamNgung { get; set; }
    public string LyDoTamNgung { get; set; }
}

public class DaiDienPhapLuat
{
    public List<ThongTinCaNhan> ThongTinCaNhan { get; set; }
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
    public string MaQuocTich { get; set; }
}

public class DiaChiTruSo
{
    public List<DiaChi_object> DiaChi { get; set; }
}

public class DiaChi_object
{
    public string QuocGia { get; set; }
    public string MaQuocGia { get; set; }
    public string TenTinhThanh { get; set; }
    public int MaTinhThanh { get; set; }
    public string TenQuanHuyen { get; set; }
    public int MaQuanHuyen { get; set; }
    public string TenPhuongXa { get; set; }
    public int MaPhuongXa { get; set; }
    public string DiaChi { get; set; }
    public string SoNha { get; set; }
}

public class NganhNgheKinhDoanh
{
    public string MaNganh { get; set; }
    public string TenNganh { get; set; }
    public int LaNganhChinh { get; set; }
}
