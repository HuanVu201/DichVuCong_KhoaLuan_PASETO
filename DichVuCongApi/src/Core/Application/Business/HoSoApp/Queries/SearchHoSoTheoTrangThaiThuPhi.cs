using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;

public class SearchHoSoTheoTrangThaiThuPhi : PaginationFilter, IRequest<PaginationResponse<HoSoDto>>
{
    public string? MaLinhVucChinh { get; set; }
    public string? ThuTucId { get; set; }
    public string? TiepNhanFrom { get; set; }
    public string? TiepNhanTo { get; set; }
    public string? HenTraFrom { get; set; }
    public string? HenTraTo { get; set; }
    public string? SoKyHieuTrichYeu { get; set; }
    public string? MaTrangThai { get; set; }
    public string? NguoiDaXuLy { get; set; }
    public string? NguoiXuLyTruoc { get; set; }
    public string? GroupCode { get; set; }
    public string? KenhThucHien { get; set; }
    public string? NotEqKenhThucHien { get; set; }
    public string? HinhThucTra { get; set; }
    public string? MaHoSo { get; set; }
    public string? NguoiNhanHoSo { get; set; }
    public string? TenTTHC { get; set; }
    public string? TrangThaiBoSung { get; set; }
    public bool? NhanKetQuaBCCI { get; set; }
    public List<string>? NotInMaTrangThais { get; set; }
    public List<string>? InMaTrangThais { get; set; }
    public bool? TrangThaiChuaHoacKhongThuPhi { get; set; }
    public string? TrangThaiThuPhi { get; set; }
    public string? HinhThucThuPhi {get;set;}
    public string? DonViYeuCauThuPhi { get; set; }
    public string? DonViThuPhi { get; set; }
    public bool? ByCurrentUser { get; set; }
    public string? TrangThaiTraKq { get; set; }
    public string? DonViTraKq { get; set; }
    public bool? DangKyQuaBuuDien { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
    public string? SearchKeys { get; set; }
    public string? SoDienThoaiChuHoSo { get; set; }
    public string? SoDienThoaiNguoiUyQuyen { get; set; }
    public string? ChuHoSo { get; set; }
    public string? NguoiUyQuyen { get; set; }
    public string? TrichYeuHoSo { get; set; }
    public bool? LaNguoiNhanHoSo { get; set; }
}
