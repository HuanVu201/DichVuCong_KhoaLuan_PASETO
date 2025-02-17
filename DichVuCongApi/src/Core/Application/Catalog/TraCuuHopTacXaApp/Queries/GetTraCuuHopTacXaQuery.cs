using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Domain.Business;
using TD.DichVuCongApi.Domain.Catalog;

namespace TD.DichVuCongApi.Application.Catalog.TraCuuHopTacXaApp.Queries;
// Lớp để chứa danh sách chứng nhận doanh nghiệp
public sealed record GetTraCuuHopTacXaQuery(string Id) : IQuery<CoopCert>;

// Lớp chính để chứa thông tin về doanh nghiệp
public class HopTacXa
{
    public List<CoopCert> CoopCert { get; set; }
}

// Lớp để chứa thông tin chi tiết về chứng nhận doanh nghiệp
public class CoopCert
{
    public string MaNoiBo { get; set; }
    public string MaSoHTX { get; set; }
    public string MaLoaiHinhHTX { get; set; }
    public string LoaiHinhHTX { get; set; }
    public string TenTiengViet { get; set; }
    public string TenVietTat { get; set; }
    public string TenNuocNgoai { get; set; }
    public DateTime NgayDangKyLanDau { get; set; }
    public DateTime? NgayDangKyThayDoi { get; set; }
    public int? SoLanDangKyThayDoi { get; set; }
    public DaiDienPhapLuat DaiDienPhapLuat { get; set; }
    public List<DiaChiTruSo> DiaChiTruSo { get; set; }
    public List<NganhNgheKinhDoanh> NganhNgheKinhDoanh { get; set; }
}

// Lớp để chứa thông tin về đại diện pháp luật
public class DaiDienPhapLuat
{
    public string HoVaTen { get; set; }
    public string MaLoaiGiayToChungThuc { get; set; }
    public string LoaiGiayToChungThuc { get; set; }
    public string SoGiayChungThuc { get; set; }
    public DateTime NgayCap { get; set; }
    public string NoiCap { get; set; }
    public string QuocTich { get; set; }
    public int MaQuocTich { get; set; }
}

// Lớp để chứa thông tin địa chỉ trụ sở
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

// Lớp để chứa thông tin ngành nghề kinh doanh
public class NganhNgheKinhDoanh
{
    public string MaNganh { get; set; }
    public string TenNganh { get; set; }
    public int LaNganhChinh { get; set; }
}
