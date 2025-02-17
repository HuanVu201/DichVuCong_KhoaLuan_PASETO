using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.GiayToSoHoaChiaSeApp;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaChiaSeApp.Queries;
public class SearchGiayToSoHoaChiaSeQuery : PaginationFilter, IRequest<PaginationResponse<GiayToSoHoaChiaSeDto>>
{
    public string? SoDinhDanh { get; set; }
    public Guid? GiayToSoHoaId { get; set; }
    public string? MaDinhDanhChiaSe { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}