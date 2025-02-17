using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class TraCuuHccPortalQuery : IRequest<PaginationResponse<TraCuuHccPortalDto>>
{
    public string? MaHoSo { get; set; }
    public string? Params { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;

}

public class TraCuuHccPortalDto
{
    public DefaultIdType Id { get; set; }
    public string? MaHoSo { get; set; }
    public string? ChuHoSo { get; set; }
    public string? SoDienThoaiChuHoSo { get; set; }
    public string? DiaChiChuHoSo { get; set; }
    public string? TenTTHC { get; set; }
    public string? TrichYeuHoSo { get; set; }
    public string? TrangThaiHoSoId { get; set; }
    public DateTime? NgayTiepNhan { get; set; }
    public DateTime? NgayHenTra { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}