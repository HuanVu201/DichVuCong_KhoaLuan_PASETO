using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaApp.Commands;
public class AddGiayToSoHoaCommand : ICommand<string>
{
    public string? Ten { get; set; }
    public string? Ma { get; set; }
    public string? MaGiayToKhoQuocGia { get; set; }
    public string? MaDinhDanh { get; set; }
    public string? MaGiayTo { get; set; }
    //public string? DonViId { get; set; }
    //public string? NguoiSoHoa { get; set; }
    //public DateTime? ThoiGianSoHoa { get; set; }
    public DateTime? ThoiHanHieuLuc { get; set; }
    public DateTime? NgayBanHanh { get; set; }
    public string? PhamViHieuLuc { get; set; }
    public string? ChuGiayTo { get; set; }
    public string? TrichYeuNoiDung { get; set; }
    public string? CoQuanBanHanh { get; set; }
    public string? NguoiKy { get; set; }
    public string? LoaiSoHoa { get; set; }
    public string DinhKem { get; set; }
    public string? SoKyHieu { get; set; }
    public bool? ThoiHanVinhVien { get; set; }
    public string? JsonOcr { get; set; }
    public string? TrichYeuKetQua { get; set; }
    public string? DinhKemSoHoa { get; set; }
    public string? MaHoSo { get; set; }
    public string? MaTTHC { get; set; }
    public string? MaLinhVuc { get; set; }

    /// <summary>
    /// cập nhật lại trạng thái số hóa của trạng thái hồ sơ
    /// </summary>
    public Guid? ThanhPhanHoSoId { get; set; }
    /// <summary>
    /// Cập nhật eformketquaData, sodinhdanh của hồ sơ
    /// </summary>
    public Guid? HoSoId { get; set; }
}
