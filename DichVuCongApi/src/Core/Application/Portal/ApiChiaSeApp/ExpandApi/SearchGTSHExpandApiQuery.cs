using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.Windows.Input;
using TD.DichVuCongApi.Application.Abstractions.Messaging;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaApp;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.ExpandApi;
public class SearchGTSHExpandApiQuery : PaginationFilter, IRequest<Result<PaginationResponse<GiayToSoHoaDto>>>
{
    public string? MaDinhDanh { get; set; }
    public string? MaHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? SearchKeys { get; set; }
    public bool? HienThiGiayToKetQua { get; set; } = false;
    public bool? DaHetHan { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public string? MaKetQuaTTHC { get; set; }
    public string? Ma { get; set; }
    public string? KhoTaiLieuDienTuId { get; set; }
    public bool? Removed { get; set; } = false;
    public string? ApiEx { get; set; } = "SearchGTSHEx";
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}