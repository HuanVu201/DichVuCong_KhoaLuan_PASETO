using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp;

namespace TD.DichVuCongApi.Application.Portal.ApiChiaSeApp.ExpandApi;
public class SearchHoSoExpandApiQuery : PaginationFilter, IRequest<Result<PaginationResponse<HoSoExpandApiDto>>>
{
    public string? SearchKeys { get; set; }
    public string? MaHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? SoDienThoaiChuHoSo { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? ApiEx { get; set; } = "SearchHoSoEx";

    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}

public class HoSoExpandApiDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string? MaHoSo { get; set; }
    public string? TenTTHC { get; set; }
    public string? TrangThaiHoSoId { get; set; }
    public string? TenDonVi { get; set; }
    public string? NgayNopHoSo { get; set; }
    public string? NgayTiepNhan { get; set; }
    public string? NgayHenTra { get; set; }
    public string? TrangThaiThuPhi { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
