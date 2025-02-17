using Newtonsoft.Json;
namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries.Views.ChamSoHoas;
public class SearchChamSoHoaQuery : PaginationFilter, IRequest<PaginationResponse<HoSoDto>>
{
    public string? TiepNhanFrom { get; set; }
    public string? TiepNhanTo { get; set; }
    public string? HenTraFrom { get; set; }
    public string? MaHoSoLienThong { get; set; }
    public string? SoKyHieuKetQua { get; set; }
    public string? TrangThaiHoSoId { get; set; }
    public string TrangThaiSoHoa { get; set; }
    public bool? LaHoSoChungThuc { get; set; }
    public string? HoSoToiHan { get; set; }
    public string? HenTraTo { get; set; }
    public string? NgayTraFrom { get; set; }
    public string? NgayTraTo { get; set; }
    public string? ViewHoSo { get; set; }
    public string? MaHoSo { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? KenhThucHien { get; set; }
    public string? GroupCode { get; set; }
    public bool? SearchAllType { get; set; } = false;
    public DateTime? NopHoSoTuNgay { get; set; }
    public DateTime? NopHoSoDenNgay { get; set; }
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
    public string? SoKyHieuTrichYeu { get; set; }
    public string? LoaiDoiTuong { get; set; }
    public bool HienThiTrangThaiThanhToan { get; set; } = true;
    public bool HienThiTrangThaiThanhToanBaoGomNgayThuPhi { get; set; } = false;
}
