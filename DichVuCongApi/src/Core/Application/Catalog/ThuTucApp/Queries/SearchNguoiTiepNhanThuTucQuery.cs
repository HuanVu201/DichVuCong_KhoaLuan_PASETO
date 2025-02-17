using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;
using System.Text.Json.Serialization;


namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Queries;
public class SearchNguoiTiepNhanThuTuc : PaginationFilter, IRequest<PaginationResponse<NguoiTiepNhanThuTucDto>>
{

    public string? NguoiTiepNhan { get; set; }
    public string? TenTTHC { get; set; }
    public string? MaTTHC { get; set; }
    public string? LoaiTTHC { get; set; }
    public string? DonViId { get; set; }
    public string? MaLinhVucChinh { get; set; }
    public string? MucDo { get; set; }
    
    public bool? Removed { get; set; } = false;

    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}

