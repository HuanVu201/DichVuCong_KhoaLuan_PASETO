using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.ThanhPhanHuongDanNopHoSoApp;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.XuatPhieuAction;
public class XuatPhieuHuongDanBoSungDto
{
    public Guid? IdGiayToHoSo { get; set; }
    public string? UrlPhieu { get; set; }
    public string? UrlPhoi { get; set; }
    public string? IdQrCode { get; set; }
    public string? DocxPhieu { get; set; }
    public DefaultIdType Id { get; set; }

    public string? DonViId { get; set; }

    public string? MaHoSo { get; set; }

    public string? LoaiDoiTuong { get; set; }

    public string? MaDoiTuong { get; set; }

    public string? ChuHoSo { get; set; }
    public string? SoDienThoaiChuHoSo { get; set; }
    public string? EmailChuHoSo { get; set; }
    public string? NguoiTiepNhan { get; set; }

    public string? SoGiayToChuHoSo { get; set; }

    public string? LoaiGiayToChuHoSo { get; set; }

    public string? NgaySinhChuHoSo { get; set; }

    public string? TinhThanhChuHoSo { get; set; }

    public string? QuanHuyenChuHoSo { get; set; }

    public string? XaPhuongChuHoSo { get; set; }

    public string? DiaChiChuHoSo { get; set; }

    public string? TrichYeuHoSo { get; set; }
    public DateTime? NgayTiepNhan { get; set; }

    public string? GhiChu { get; set; }

    public string? NoiNopHoSo { get; set; }
    public string? GroupName { get; set; }
    public string? Catalog { get; set; }

    public string? HoSoCoThanhPhanSoHo { get; set; }
    public DateTime? NgayTuChoi { get; set; }

    public string? LoaiDinhDanh { get; set; }

    public string? SoDinhDanh { get; set; }

    public string? MaTTHC { get; set; }

    public string? TenTTHC { get; set; }

    public string? TenLinhVuc { get; set; }

    public string? TenTruongHop { get; set; }

    public string? MaTruongHop { get; set; }

    public string? TruongHopId { get; set; }

    public string? NguoiNhanHoSo { get; set; }

    public string? TenNguoiNguoiNhanHoSo { get; set; }
    public string? SoDienThoaiNguoiNhanHoSo { get; set; }
    public string? SoDienThoaiDonVi { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaLinhVucChinh { get; set; }
    public string? MaTinh { get; set; }
    public string? TenTinh { get; set; }

    public string? LyDoBoSung { get; set; }

    public List<ThanhPhanHuongDanNopHoSoDto> ThanhPhanHuongDanNopHoSos { get; set; } = new List<ThanhPhanHuongDanNopHoSoDto>();


    public string? LyDoTuChoi { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
