using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Business.GiayToSoHoaApp;
public class GiayToSoHoaDetailDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string Ten { get; set; }
    public string MaHoSo { get; set; }
    public string PhamViHieuLuc { get; set; }
    public string TrichYeuNoiDung { get; set; }
    public string CoQuanBanHanh { get; set; }
    public string NguoiKy { get; set; }
    public string? ChuGiayTo { get; set; }
    public string SoKyHieu { get; set; }
    public string ChuHoSo { get; set; }
    public string MaDinhDanh { get; set; }
    public string JsonOcr { get; set; }
    public bool ThoiHanVinhVien { get; set; }
    public string Ma { get; set; }
    public DateTime? ThoiGianSoHoa { get; set; }
    public DateTime? ThoiHanHieuLuc { get; set; }
    public DateTime? NgayBanHanh { get; set; }
    public string DinhKem { get; set; }
    public string FullName { get; set; }
    public string GroupName { get; set; }
    public string LoaiSoHoa { get; set; }
}
