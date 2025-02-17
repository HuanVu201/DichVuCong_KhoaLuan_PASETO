using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchSoTheoDoi;
public class SearchSoTheoDoiHoSoRequest : PaginationFilter, IRequest<PaginationResponse<HoSoTiepNhanQuaHanDto>>
{
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaLinhVucChinh { get; set; }
    public string? TrangThaiHoSoId { get; set; }
    public string? MaHoSo { get; set; }

    public string? SoGiayToChuHoSo { get; set; }
    public string? KenhThucHien { get; set; }

    public string? GroupCode { get; set; }
    public string? NguoiNhanHoSo { get; set; }
    public string? TenTTHC { get; set; }
    public string? MaTTHC { get; set; }
    public bool? DaTiepNhan { get; set; }
    public string? DonViQuanLy { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
    public string? SearchKeys { get; set; }
}
