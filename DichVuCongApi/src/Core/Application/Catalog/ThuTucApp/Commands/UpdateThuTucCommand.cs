using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Commands;
public class UpdateThuTucCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? IDQG { get; set; }
    public string? GoiTinThuTucQG { get; set; }
    public bool? SuDung { get;  set; }
    public bool? LaThuTucChungThuc { get;  set; }
    public string? LinhVucChinh { get; set; }
    public string? QuyetDinh { get; set; }
    public string? MaLinhVucChinh { get;  set; }
    public string? CoQuanThucHienChinh { get;  set; }
    public string? DinhKemQuyetDinh { get;  set; }
    public string? CapThucHien { get; set; }
    public string? MaKetQuaChinh { get;  set; }
    public string? TenKetQuaChinh { get;  set; }
    public DateTime? NgayCapNhat { get; set; }
    public bool? TrangThaiPhiLePhi { get; set; }
    public string? MucDo { get; set; }
    public int? HoSoPhatSinhTrongNam { get; set; }
    public int? ThuTu { get; set; }
    public bool? LaTieuBieu { get; set; }
    public bool? ChoPhepLayFileTuTHPS { get; set; }
    public bool? ThuTucKhongCoKetQua { get; set; }
    public bool? ThucHienTaiBoPhanMotCua { get; set; }
    public string? UrlVideoTutorial { get; set; }
    public bool? LaPhiDiaGioi { get; set; }
    public bool? LaThuTucLienThongDatDai { get; set; }
}
