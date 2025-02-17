using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DichVuCongApi.Application.Business.HoSoApp.Dto;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class SearchHoSoTiepNhanQuaHan : PaginationFilter, IRequest<List<HoSoTiepNhanQuaHanDto>>
{
    public DateTime? TiepNhanTuNgay { get; set; }
    public DateTime? TiepNhanDenNgay { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaLinhVucChinh { get; set; }
    public string? MaTrangThai { get; set; }
    public string? MaHoSo { get; set; }
    public string? Catalog { get; set; }
    public string? SoGiayToChuHoSo { get; set; }
    public string? KenhThucHien { get; set; }
    public bool? ChiBaoGomDonViCon { get; set; }
    public string? GroupCode { get; set; }
    public string? NguoiNhanHoSo { get; set; }
    public string? TenTTHC { get; set; }
    public string? MaTTHC { get;set; }
    public bool? DaTiepNhan { get; set; }
    public string? DonViQuanLy { get; set; }
    public bool? Removed { get; set; } = false;
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
    public string? SearchKeys { get; set; }
}
