using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DichVuCongApi.Application.Abstractions.Messaging;

namespace TD.DichVuCongApi.Application.Catalog.ThuTucApp.Commands;
public class AddThuTucCommand : ICommand<Guid>
{
    public string ID { get; set; }
    public string MaTTHC { get; set; }
    public string TENTTHC { get; set; }
    public string MACOQUANCONGBO { get; set; }
    public string LOAITTHC { get; set; }
    public string MOTADOITUONGTHUCHIEN { get; set; }
    public string DIACHITIEPNHAN { get; set; }
    public string QUYETDINH { get; set; }
    public string YEUCAU { get; set; }
    public string TUKHOA { get; set; }
    public string IDQUYETDINHCONGBO { get; set; }
    public string TRANGTHAI { get; set; }
    public string MOTACOQUANTHUCHIEN { get; set; }
    public string MOTACOQUANTHAMQUYEN { get; set; }
    public string MOTA { get; set; }
    public List<TrinhTuThucHien> TRINHTUTHUCHIEN { get; set; }
    public List<CapThucHien> CAPTHUCHIEN { get; set; }
    public List<LinhVucThucHien> LINHVUCTHUCHIEN { get; set; }
    public List<CachThucThucHien> CACHTHUCTHUCHIEN { get; set; }
    public List<DoiTuongThucHien> DOITUONGTHUCHIEN { get; set; }
    public List<ThanhPhanHoSo> THANHPHANHOSO { get; set; }
    public List<KetQuaThucHien> KETQUATHUCHIEN { get; set; }
    public List<CanCuPhapLy> CANCUPHAPLY { get; set; }
    public List<string> TTHCLIENQUAN { get; set; }
    public List<string> TTHCLIENTHONG { get; set; }
    public List<CoQuanThucHien> COQUANTHUCHIEN { get; set; }
    public List<CoQuanCoThamQuyen> COQUANCOTHAMQUYEN { get; set; }
    public List<CoQuanDuocUyQuyen> COQUANDUOCUYQUYEN { get; set; }
    public List<CoQuanPhoiHop> COQUANPHOIHOP { get; set; }
    public DateTime? NgayCapNhat { get; set; }
    //public Guid? LinhVucId { get; set; }
    public bool? TrangThaiPhiLePhi { get; set; }
    public string? MucDo { get; set; }
    public string? DinhKemQuyetDinh { get; set; }
    public bool? LienThong { get; set; }
    public bool? LaThuTucChungThuc { get; set; }
    public int? HoSoPhatSinhTrongNam { get; set; }
    public int? ThuTu { get; set; }
    public bool? LaTieuBieu { get; set; }
    public bool? ThucHienTaiBoPhanMotCua { get; set; }
    public bool? LaPhiDiaGioi { get; set; }
    public bool? LaThuTucLienThongDatDai { get; set; }
}
