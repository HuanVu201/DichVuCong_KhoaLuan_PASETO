using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.TruongHopThuTucApp.Queries;
public class SearchTruongHopTheoBaoCaoTongHopRequest : PaginationFilter, IRequest<PaginationResponse<TruongHopThuTucDto>>
{
    public string? ThuTucId { get; set; }
    public string? DonViTiepNhan { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public string? Type { get; set; }
    public string? Catalog { get; set; }
    public bool? ChiBaoGomDonViCon { get; set; }
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10000;
    public new int PageNumber { get; set; } = 1;
}