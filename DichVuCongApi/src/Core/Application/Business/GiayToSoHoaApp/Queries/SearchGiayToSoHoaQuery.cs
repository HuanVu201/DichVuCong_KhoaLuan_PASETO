using Newtonsoft.Json;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Queries;


public class SearchGiayToSoHoaQuery : PaginationFilter, IRequest<PaginationResponse<GiayToSoHoaDto>>
{
    public string? MaDinhDanh { get; set; }
    public string? MaHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? SearchKeys { get; set; }
    public bool? HienThiGiayToKetQua { get; set; } = false;
    public bool? DaHetHan { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? NgayTao { get; set; }
    public DateTime? DenNgay { get; set; }
    public string? MaKetQuaTTHC { get; set; }
    public string? Ma { get; set; }
    public string? KhoTaiLieuDienTuId { get; set; }
    public string? MaTTHC { get; set; }
    public string? MaLinhVuc { get; set; }
    public string? TrangThaiSoHoa { get; set; }
    public bool? GroupByUser { get; set; }
    public bool? ByCurrentUser { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
