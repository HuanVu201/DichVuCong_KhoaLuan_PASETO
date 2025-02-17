using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.HoSoApp.Queries.SearchHoSoXinRutTraLai;
public class SearhHoSoXinRutTraLaiQuery : PaginationFilter, IRequest<PaginationResponse<HoSoTraLaiXinRutDto>>
{
    public string? DonViQuanLy { get; set; }
    public string? Catalog { get; set; }
    public string? MaDonVi { get; set; }
    public string? TrangThaiThanhToan { get; set; }
    public string? Loai { get; set; }
    public string? HinhThucThuPhi { get; set; }
    public string? TrangThaiHoSoId { get; set; }
    public string? LoaiDoiTuong { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public DateTime? TraLaiTuNgay { get; set; }
    public DateTime? TraLaiDenNgay { get; set; }
    public DateTime? YeuCauBoSungTuNgay { get; set; }
    public DateTime? YeuCauBoSungDenNgay { get; set; }
}

public class HoSoTraLaiXinRutDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string ChuHoSo { get; set; }
    public string SoDienThoaiChuHoSo { get; set; }
    public string EmailChuHoSo { get; set; }
    public string TrichYeuHoSo { get; set; }
    public string SoGiayToChuHoSo { get; set; }
    public string NgayTiepNhan { get; set; }
    public string ThuTucKhongCoKetQua { get; set; }
    public string NgayNopHoSo { get; set; }
    public string NgayHenTra { get; set; }
    public string CreatedOn { get; set; }
    public string MaHoSo { get; set; }
    public string KenhThucHien { get; set; }
    public string TenDonVi { get; set; }
    public string TenTTHC { get; set; }
    public string MaTTHC { get; set; }
    public string TrangThaiThuPhi { get; set; }
    public string LyDoBoSung { get; set; }
   
    public bool TrangThaiPhiLePhi { get; set; }
    public string MaTruongHop { get; set; }
    public string TrangThaiHoSoId { get; set; }
    public string? LyDoTraLaiXinRut { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
