using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.ThongKeIOC;
public class DanhSachHoSoTheoTrangThaiQuery : IRequest<PaginationResponse<DanhSachHoSoTheoTrangThaiElement>>
{
    public string? LoaiSoLieu { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public string MaDinhDanh { get; set; } = string.Empty;
    public int PageSize { get; set; } = 1000;
    public int PageNumber { get; set; } = 1;
}

public class DanhSachHoSoTheoTrangThaiElement
{
    public DefaultIdType? Id { get; set; }
    public string? MaHoSo { get; set; }
    public string? TenDonVi { get; set; }
    public string? LinhVuc { get; set; }
    public string? ThuTuc { get; set; }
    public DateTime? NgayTiepNhan { get; set; }
    public DateTime? NgayHenTra { get; set; }
    public DateTime? NgayKetThucXuLy { get; set; }
    public string? TrangThaiHoSoId { get; set; }
    public string? MaDinhDanh { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}