using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.LoaiGiayToKhoLuuTruApp.Queries;
public class SearchLoaiGiayToKhoLuuTruQuery : PaginationFilter, IRequest<PaginationResponse<LoaiGiayToKhoLuuTruDto>>
{
    public string? Ma { get; set; }
    public string? Ten { get; set; }
    public string? Eform { get; set; }
    public bool? SuDung { get; set; }
    public string? OrderByReq { get; set; } = "LastModifiedOn DESC";
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}

public class LoaiGiayToKhoLuuTruDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string? Ma { get; set; }
    public string? Ten { get; set; }
    public string? Eform { get; set; }
    public bool? SuDung { get; set; }
    public DateTime? CreatedOn { get; set; }
    public DateTime? LastModifiedOn { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}