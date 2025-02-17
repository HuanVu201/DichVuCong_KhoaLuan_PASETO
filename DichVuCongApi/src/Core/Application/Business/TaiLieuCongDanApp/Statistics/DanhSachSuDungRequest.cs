using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.TaiLieuCongDanApp.Statistics;
public class DanhSachSuDungRequest : PaginationFilter, IRequest<PaginationResponse<DanhSachSuDungResponse>>
{
    public string? SoDinhDanh { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public string? FullName { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public int PageSize { get; set; } = 10;
    public int PageNumber { get; set; } = 1;
}

public class DanhSachSuDungResponse : IDto
{
    public DefaultIdType? Id { get; set; }
    public string? SoDinhDanh { get; set; }
    public string? FullName { get; set; }
    public double? TongDungLuong { get; set; } = 0;
    public int? SoLuong { get; set; } = 0;
    public DateTime? CreatedOn { get; set; }
    public int? SoLuongCongDanTaiLen { get; set; } = 0;
    public double? TongDungLuongCongDanTaiLen { get; set; } = 0;
    public int? SoLuongKetQuaGiaiQuyet { get; set; } = 0;
    public double? TongDungLuongKetQuaGiaiQuyet { get; set; } = 0;
    public int? SoLuongThanhPhanHoSo { get; set; } = 0;
    public double? TongDungLuongThanhPhanHoSo { get; set; } = 0;
    [JsonIgnore]
    public int TotalCount { get; set; }
}
