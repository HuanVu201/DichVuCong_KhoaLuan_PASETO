using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DichVuCongApi.Application.Statistics.QuyetDinh766.ChiTieuDvcTrucTuyen;
public class QuyetDinh766ChiTieuDvcTrucTuyenElement
{
    public string Catalog { get; set; }
    public string MaThongKe { get; set; }
    public string MaThongKeCha { get; set; }
    public string TenThongKe { get; set; }
    public string MaDinhDanh { get; set; }
    public int TongSoThuTuc { get; set; } = 0;
    public int ThuTucDvcTrucTuyen { get; set; } = 0;
    public int ThuTucDvcTrucTuyenToanTrinh { get; set; } = 0;
    public int ThuTucDvcTrucTuyenMotPhan { get; set; } = 0;
    public int ThuTucPhatSinhHoSo { get; set; } = 0;
    public int TongHoSoPhatSinh { get; set; } = 0;
    public int ThuTucTrucTuyenPhatSinhHoSo { get; set; } = 0;
    public int HoSoPhatSinhTrongThuTucTrucTuyen { get; set; } = 0;
    public int HoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen { get; set; } = 0;
    public int ThuTucToanTrinh { get; set; } = 0;
    public int ThuTucToanTrinhPhatSinhHoSo { get; set; } = 0;
    
    public int HoSoPhatSinhTrongThuTucToanTrinh { get; set; } = 0;
    public int HoSoPhatSinhTrucTuyenTrongThuTucToanTrinh { get; set; } = 0;
    public int ThuTucMotPhan { get; set; } = 0;
    public int ThuTucMotPhanPhatSinhHoSo { get; set; } = 0;
    public int HoSoPhatSinhTrongThuTucMotPhan { get; set; } = 0;
    public int HoSoPhatSinhTrucTuyenTrongThuTucMotPhan { get; set; } = 0;
    public int ThuTucDvc{ get; set; } = 0;
    public int ThuTucDvcPhatSinhHoSo { get; set; } = 0;
    public int HoSoPhatSinhTrongThuTucDvc { get; set; } = 0;

}
