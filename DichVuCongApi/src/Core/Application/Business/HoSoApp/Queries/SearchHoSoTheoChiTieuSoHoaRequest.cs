using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries;
public class SearchHoSoTheoChiTieuSoHoaRequest : PaginationFilter, IRequest<PaginationResponse<HoSoDto>>
{
    public string? TieuChi { get; set; }
    public string? MaDonVi { get; set; }
    public string? Catalog { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public string? SearchKeys { get; set; }
    public string? SoDienThoaiChuHoSo { get; set; }
    public string? SoDienThoaiNguoiUyQuyen { get; set; }
    public string? ChuHoSo { get; set; }
    public string? MaHoSo { get; set; }
    public string? NguoiUyQuyen { get; set; }
    public string? TrichYeuHoSo { get; set; }
    public string? SoKyHieuTrichYeu { get; set; }
    public string? MaHoSoLienThong { get; set; }
    public string? SoKyHieuKetQua { get; set; }
    public string? HoSoTaiKhoan { get; set; }
}
