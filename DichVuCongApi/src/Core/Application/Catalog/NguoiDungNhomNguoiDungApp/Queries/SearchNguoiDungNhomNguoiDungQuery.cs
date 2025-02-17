using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Business.NguoiDungNhomNguoiDungApp.Queries;


public class SearchNguoiDungNhomNguoiDungQuery : PaginationFilter, IRequest<PaginationResponse<NguoiDungNhomNguoiDungDto>>
{
    public string? TaiKhoan { get; set; }
    public string? NhomNguoiDungId { get; set; }
    public List<string>? NhomNguoiDungIds { get; set; }
    public string? TenNhomNguoiDung { get; set; }
    public string? LoaiBuoc { get; set; }
    public string? UserGroupCode { get; set; }
    /// <summary>
    /// Dùng để truy vấn ở người dùng nhóm người dùng đơn vị khi không có loại bước
    /// </summary>
    public string? UserOfficeCode { get; set; } 
    public string? TenUser { get; set; }
    public string? MaHoSo { get; set; }
    public string? DonViTiepNhan { get; set; }
    public string? MaDinhDanh { get; set; }
    public bool? IsLastNode { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
