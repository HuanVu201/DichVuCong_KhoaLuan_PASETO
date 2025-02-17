using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchTheoThongKeTongHopDonVi;
public class SearchTheoThongKeTongHopDonViRequest : PaginationFilter, IRequest<PaginationResponse<HoSoDto>>
{
    public string? TieuChi { get; set; }
    public string? MaLinhVucChinh { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaTTHC { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaDinhDanhCha { get; set; }
    public string? DonViQuanLy { get; set; }
    public bool? DaYeuCauBCCILayKetQua { get; set; }
    public string? Catalog { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public bool? CoTrangThaiThanhToan { get; set; }
    public string? LoaiDoiTuong { get; set; }
    public string? KenhThucHien { get; set; }
    public string? MucDo { get; set; }
    public bool? ChiBaoGomDonViCon { get; set; }
    public List<string>? LoaiDuLieuKetNois { get; set; }
    public List<string>? TrangThaiHoSoIds { get; set; }
    public bool LaDuLieuThongKeCacNam { get; set; } = false;
}