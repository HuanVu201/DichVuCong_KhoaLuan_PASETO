

using System.Text.Json.Serialization;

namespace TD.DichVuCongApi.Application.Application.Catalog.ThuTucApp;


public class ThuTucDto : IDto
{
    //public DichVuBaseDto? DichVuCha { get; set; }
    public Guid Id { get; set; }
    public string MaTTHC { get; set; }
    public string TenTTHC { get; set; }
    public string LinhVucChinh { get; set; }
    public bool TrangThaiPhiLePhi { get; set; }
    public DateTime NgayCapNhat { get; set; }
    public string MaLinhVucChinh { get; set; }
    public string DinhKemQuyetDinh { get; set; }
    public string QuyetDinh { get; set; }
    public string MucDo { get; set; }
    public string? DoiTuongThucHien { get; set; }

    public string LoaiTTHC { get; set; }
    public bool SuDung { get; set; }
    public bool LaThuTucChungThuc { get; set; }
    public bool ThucHienTaiBoPhanMotCua { get; set; }
    public bool LienThong { get; set; }
    public string? ThuTu { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
    public int SoLuongTruongHopThuTuc { get; set;}
}
