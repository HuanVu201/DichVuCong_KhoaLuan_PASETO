using Newtonsoft.Json;
namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.TaiLieuKhoLuuTruCongDanApp.Queries;
public class DanhSachTaiLieuCongDanQuery : PaginationFilter, IRequest<PaginationResponse<DanhSachTaiLieuCongDanResponse>>
{
    public DefaultIdType? KhoLuuTruId { get; set; }
    public string? TenGiayTo { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? Nguon { get; set; }
    public DateTime? CreatedOn { get; set; }
    [Newtonsoft.Json.JsonIgnore]
    public bool? ReFetch { get; set; } = false;
}

public class DanhSachTaiLieuCongDanResponse : IDto
{
    public DefaultIdType Id { get; set; }
    public DefaultIdType KhoLuuTruId { get; set; }
    public string TenGiayTo { get; set; }
    public DateTimeOffset CreatedOn { get; set; }
    public double DungLuong { get; set; }
    public string DuongDan { get; set; }
    public int SoLuotTaiSuDung { get; set; }

    [System.Text.Json.Serialization.JsonIgnore]
    public int TotalCount { get; set; }
}