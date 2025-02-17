using TD.DichVuCongApi.Domain.Catalog;
using static TD.DichVuCongApi.Application.Common.KetNoi.LLTP.LLTP_VNEIDParams.DongBoTrangThaiParam;

namespace TD.DichVuCongApi.Application.Common.KetNoi.LLTP;
public class DanToc
{
    public string __type { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
}

public class NoiCapGiayTo
{
    public string Code { get; set; }
    public string Name { get; set; }
}

public class GioiTinh
{
    public string __type { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
}

public class LoaiPhieuYeuCau
{
    public string Name { get; set; }
    public string Code { get; set; }
}
public class EformSelect
{
    public string Name { get; set; }
    public string Code { get; set; }
}


public class MucDichCapPhieu
{
    public string Name { get; set; }
    public string Code { get; set; }
}

public class QuaTrinhCuTru
{
    public string TuNam { get; set; }
    public string DenNam { get; set; }
    public string NgheNghiep { get; set; }
    public string NoiThuongTru { get; set; }
}

public class QuocTich
{
    public string __type { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
}

public class LGSPLyLichTuPhapDataEform
{
    public string LoaiToKhai { get; set; }
    public string NoiOHienTai { get; set; }
    public string HoVaTen { get; set; }
    public string TenGoiKhac { get; set; }
    public QuocTich QuocTich { get; set; }
    public DanToc DanToc { get; set; }
    public EformSelect GiayToTuyThan { get; set; }
    public string NgayCapGiayTo { get; set; }
    public NoiCapGiayTo NoiCapGiayTo { get; set; }
    public string Email { get; set; }
    public string DiaChiTamTru { get; set; }
    public string NgaySinhCha { get; set; }
    public string NgaySinhMe { get; set; }
    public string NgaySinhVoChong { get; set; }
    public List<QuaTrinhCuTru> QuaTrinhCuTru { get; set; }
    public string KhaiAnTich { get; set; }
    public MucDichCapPhieu MucDichCapPhieu { get; set; }
    public LoaiPhieuYeuCau LoaiPhieuYeuCau { get; set; }
    public SoLuongCapThem SoLuongCapThem { get; set; }
    public string DoiTuongUuTien { get; set; }
    public YeuCauXacNhanKhac YeuCauXacNhanKhac { get; set; }
    public string HoVaTenDuoi { get; set; }
    public string ExportTemplateCustom { get; set; }
    public string NgayHienTai { get; set; }
    public string NgayLamDon { get; set; }
    public string NgaySinh { get; set; }
    public GioiTinh GioiTinh { get; set; }
    public string SoGiayTo { get; set; }
    public string DienThoai { get; set; }
    public string NoiSinh { get; set; }
    public string DiaChiThuongTru { get; set; }
    public string HoVaTenCha { get; set; }
    public string HoVaTenMe { get; set; }
    public string HoVaTenVoChong { get; set; }
}

public class SoLuongCapThem
{
    public string Name { get; set; }
    public string Code { get; set; }
}

public class YeuCauXacNhanKhac
{
    public string Name { get; set; }
    public string Code { get; set; }
}

public class MetadataEform
{
}

public class Eform
{
    public LGSPLyLichTuPhapDataEform data { get; set; }
    public MetadataEform metadata { get; set; }
}

public class LyLichTuPhapForm
{
    public string idReceivedDec { get; set; }
    public string dateReceivedDec { get; set; }
    public string datePromissoryDec { get; set; }
    public string idMoneyReceipt { get; set; }
    public DeclarationForm declarationForm { get; set; }
    public List<ResidenceForm> residenceForm { get; set; }
    public MandatorForm mandatorForm { get; set; }
}

public class DeclarationForm
{
    public string fullName { get; set; }
    public string birthDateStr { get; set; }
    public string genderId { get; set; }
    public string birthPlace { get; set; }
    public int nationalityId { get; set; }
    public string residence { get; set; }
    public string idIssuePlace { get; set; }
    public string idIssueDate { get; set; }
    public string dadName { get; set; }
    public string dadDob { get; set; }
    public string momName { get; set; }
    public string momDob { get; set; }
    public string partnerName { get; set; }
    public string partnerDob { get; set; }
    public string phone { get; set; }
    public string email { get; set; }
    public string note { get; set; }
    public string otherName { get; set; }
    public string idTypeId { get; set; }
    public string identifyNo { get; set; }
    public string reRegionId { get; set; }
    public string rtRegionId { get; set; }
    public int declareTypeId { get; set; }
    public int objectRequestId { get; set; }
    public string agencyRequestId { get; set; }
    public int regionRequestId { get; set; }
    public int isBanPosition { get; set; }
    public int delivery { get; set; }
    public string deliveryAddress { get; set; }
    public int deliveryDistrict { get; set; }
    public string purpose { get; set; }
    public string receiveNo { get; set; }
    public string declarationPortalID { get; set; }
    public string giveProfileDistrict { get; set; }
    public string ethnicId { get; set; }
    public string ministryJusticeId { get; set; }
    public int requestQty { get; set; }
    public string requestQtyAdd { get; set; }
    public string declareDate { get; set; }
    public string formType { get; set; }
    public string residenceTemporary { get; set; }
}

public class MandatorForm
{
    public string fullName { get; set; }
    public string genderId { get; set; }
    public string birthDateStr { get; set; }
    public string birthPlaceId { get; set; }
    public string residence { get; set; }
    public string regionId { get; set; }
    public string idTypeId { get; set; }
    public string identifyNo { get; set; }
    public string idIssueDate { get; set; }
    public string idIssuePlace { get; set; }
    public string mandatorRelation { get; set; }
    public string mandatorDate { get; set; }
}

public partial class ResidenceForm
{
    public string fromDateStr { get; set; }
    public string toDateStr { get; set; }
    public string residencePlace { get; set; }
    public string jobName { get; set; }
    public string workPlace { get; set; }
}
public class LienThongLLTPRequest
{
    public string idHoSo { get; set; }
    public string eformBase64Data { get; set; }
}

public class GuiLienThongLLTPResponse
{
    public string status { get; set; }
    public string description { get; set; }
    public string id { get; set; }
}


public static class LLTP_VNEIDParams
{
    public class Response
    {
        public string statusCode { get; set; }
        public object? data { get; set; }
        public string? errorDetail { get; set; }
    }
    public class RootDataEform
    {
        public DataEform data { get; set; }
        public string metadata { get; set; }
    }
    public class DanhMucDiaBanEform
    {
        public string maDiaBan { get; set; }
        public string tenDiaBan { get; set; }
    }
    public class DanhMucEform
    {
        public string Code { get; set; }
        public string Name { get; set; }
    }
    public class QuaTrinhCuTruEform
    {
        public string NgheNghiep { get; set; }
        public string NoiThuongTru { get; set; }
        public string TuNam { get; set; }
        public string DenNam { get; set; }
        public string NoiLamViec { get; set; }
    }
    public class DataEform
    {
        public string FormType { get; set; }
        public string LoaiToKhai { get; set; }
        public DanhMucEform nycQuanHe { get; set; }
        public DanhMucEform nycGiayToTuyThan { get; set; }
        public string nycNgayCapGiayTo { get; set; }
        public DanhMucEform nycNoiCapGiayTo { get; set; }
        public string HoVaTen { get; set; }
        public string NgaySinh { get; set; }
        public DanhMucEform GioiTinh { get; set; }
        public string TenGoiKhac { get; set; }
        public DanhMucEform QuocTich { get; set; }
        public DanhMucEform DanToc { get; set; }
        public DanhMucEform GiayToTuyThan { get; set; }
        public string SoGiayTo { get; set; }
        public string NgayCapGiayTo { get; set; }
        public DanhMucEform NoiCapGiayTo { get; set; }
        public DanhMucDiaBanEform NoiSinh { get; set; }
        public bool NoiSinhNuocNgoai { get; set; }
        public string NoiSinhNuocNgoaiChiTiet { get; set; }
        public string NoiThuongTru { get; set; }
        public DanhMucDiaBanEform NoiThuongTruTinhThanh { get; set; }
        public DanhMucDiaBanEform NoiThuongTruQuanHuyen { get; set; }
        public DanhMucDiaBanEform NoiThuongTruXaPhuong { get; set; }
        public string? DiaChiTamTru { get; set; }
        public DanhMucDiaBanEform? DiaChiTamTruTinhThanh { get; set; }
        public DanhMucDiaBanEform? DiaChiTamTruQuanHuyen { get; set; }
        public DanhMucDiaBanEform? DiaChiTamTruXaPhuong { get; set; }
        public string HoVaTenCha { get; set; }
        public string NgaySinhCha { get; set; }
        public string HoVaTenMe { get; set; }
        public string NgaySinhMe { get; set; }
        public string HoVaTenVoChong { get; set; }
        public string NgaySinhVoChong { get; set; }
        public List<QuaTrinhCuTruEform> QuaTrinhCuTru { get; set; }
        public string KhaiAnTich { get; set; }
        public DanhMucEform MucDichCapPhieu { get; set; }
        public DanhMucEform LoaiPhieuYeuCau { get; set; }
        public DanhMucEform SoLuongCapThem { get; set; }
        public string DoiTuongUuTien { get; set; }
        public DanhMucEform YeuCauXacNhanKhac { get; set; }
        public DanhMucEform HinhThucNhanKetQua { get; set; }
        public string HoVaTenDuoi { get; set; }
        public string ExportTemplateCustom { get; set; }
        public DateTime NgayHienTai { get; set; }
        public string NgayLamDon { get; set; }
        public DanhMucEform nycGioiTinh { get; set; }
        public string nycHoVaTen { get; set; }
        public string nycNgaySinh { get; set; }
        public string nycSoGiayTo { get; set; }
        public string nycSoDienThoai { get; set; }
        public string nycEmail { get; set; }
        public string nycNoiSinh { get; set; }
        public DanhMucDiaBanEform nycNoiSinhTinhThanh { get; set; }
        public DanhMucDiaBanEform nycNoiSinhQuanHuyen { get; set; }
        public DanhMucDiaBanEform nycNoiSinhXaPhuong { get; set; }
        public string nycNoiOHienTai { get; set; }

        public DanhMucDiaBanEform nycNoiOHienTaiTinhThanh { get; set; }
        public DanhMucDiaBanEform nycNoiOHienTaiQuanHuyen { get; set; }
        public DanhMucDiaBanEform nycNoiOHienTaiXaPhuong { get; set; }
        public string SoDienThoai { get; set; }
        public string Email { get; set; }
    }
    public class DiaChiCuTru
    {
        public string maQuocGia { get; set; }
        public string tenQuocGia { get; set; }
        public string maTinhThanh { get; set; }
        public string tenTinhThanh { get; set; }
        public string maQuanHuyen { get; set; }
        public string tenQuanHuyen { get; set; }
        public string maPhuongXa { get; set; }
        public string tenPhuongXa { get; set; }
        public string chiTiet { get; set; }
    }
    public class DataLGSP
    {
        public string authKey { get; set; }
        public string maTinh { get; set; }
        public string tenTinh { get; set; }
        public string maHoSoMCDT { get; set; }
        public string nguonDangKy { get; set; }
        public string tenNguonDangKy { get; set; }
        public string ngayTiepNhan { get; set; }
        public ToKhaiLGSP toKhai { get; set; }
    }
    public class DiaBanLGSP
    {
        public string maTinhThanh { get; set; }
        public string tenTinhThanh { get; set; }
        public string maQuanHuyen { get; set; }
        public string tenQuanHuyen { get; set; }
        public string maPhuongXa { get; set; }
        public string tenPhuongXa { get; set; }
        public string dcChiTiet { get; set; }
    }
    public class ToKhaiLGSP
    {
        public string ngayHenTra { get; set; }
        public string nycNoiSinhNuocNgoai { get; set; }
        public string loaiPhieu { get; set; }
        public string yeuCauCDNCV { get; set; }
        public string maMucDich { get; set; }
        public string mucDich { get; set; }
        public string tenMucDich { get; set; }
        public string soLuongCap { get; set; }
        public string nycHoTen { get; set; }
        public string nycTenGoiKhac { get; set; }
        public string nycGioiTinh { get; set; }
        public string nycTenGioiTinh { get; set; }
        public string nycTenLoaiGiayTo { get; set; }
        public string nycNgaySinh { get; set; }
        public DiaBanLGSP nycThuongTru { get; set; }
        public DiaBanLGSP? nycTamTru { get; set; }
        public string nycDienThoai { get; set; }
        public string nycEmail { get; set; }
        public string nycSoGiayTo { get; set; }
        public string nycLoaiGiayTo { get; set; }
        public string nycNgayCapGiayTo { get; set; }
        public string nycNoiCapGiayTo { get; set; }
        public string nycQuocTich { get; set; }
        public string nycTenQuocTich { get; set; }
        public string nycDanToc { get; set; }
        public string nycTenDanToc { get; set; }
        public string nycHoTenCha { get; set; }
        public string chaNgaySinh { get; set; }
        public string chaLoaiGiayTo { get; set; }
        public string chaSoGiayTo { get; set; }
        public string nycHoTenMe { get; set; }
        public string meNgaySinh { get; set; }
        public string meLoaiGiayTo { get; set; }
        public string meSoGiayTo { get; set; }
        public string nycHoTenVoChong { get; set; }
        public string voChongNgaySinh { get; set; }
        public string voChongLoaiGiayTo { get; set; }
        public string voChongSoGiayTo { get; set; }
        public DiaBanLGSP nycNoiSinh { get; set; }
        public string uyQuyen { get; set; }
        public string uyQuyenHoTen { get; set; }
        public string nuqTenGoiKhac { get; set; }
        public string nuqGioiTinh { get; set; }
        public string nuqNgaySinh { get; set; }
        public string nuqTenDanToc { get; set; }
        public string nuqDanToc { get; set; }
        public string nuqTenQuocTich { get; set; }
        public string nuqQuocTich { get; set; }
        public string nuqEmail { get; set; }
        public string nyqQuanHe { get; set; }
        public DiaBanLGSP nuqThuongTruChiTiet { get; set; }
        //public DiaBanLGSP nuqNoiSinh { get; set; }
        public string nuqDienThoai { get; set; }
        public string nuqLoaiGiayto { get; set; }
        public string thongTinAnTich { get; set; }
        public string nuqSoGiayTo { get; set; }
        public string nuqNgayCapGiayTo { get; set; }
        public string nuqNoiCapGiayTo { get; set; }
        public string mucDichKhac { get; set; }
        public List<NycCuTruLGSP> nycCuTru { get; set; }
        public List<FileHoSoLGSP> fileHoSo { get; set; }
    }
    public class FileHoSoLGSP
    {
        public string tenLoaiFile { get; set; }
        public string tenFile { get; set; }
        public string noiDungFile { get; set; }
    }


    public class NycCuTruLGSP
    {
        public string tuNgay { get; set; }
        public string denNgay { get; set; }
        public string noiCuTru { get; set; }
        public string ngheNghiep { get; set; }
        public string noiLamViec { get; set; }
    }
    public class LLTPServiceSettings_VNeID_Response
    {
        public string statusCode { get; set; }
        public string accessToken { get; set; }
        public string errorDetail { get; set; }
    }


    public class DongBoTrangThaiParam
    {
        public string? maTinh { get; set; } = string.Empty;
        public string? tenTinh { get; set; } = string.Empty;
        public string? maHoSoMCDT { get; set; } = string.Empty;
        public string? trangThaiXuLy { get; set; } = string.Empty;
        public string? tenTrangThaiXuLy { get; set; } = string.Empty;
        public string? lyDoTuChoi { get; set; } = string.Empty;
        public string? ngayHenTraKetQua { get; set; } = string.Empty;
        public string? type { get; set; } = string.Empty;
        public KetQuaXuLy? ketQuaXuLy { get; set; }

        public class KetQuaXuLy
        {
            public string? soPhieuLLTP { get; set; } = string.Empty;
            public string? ngayCapPhieu { get; set; } = string.Empty;
            public string? loaiPhieu { get; set; } = string.Empty;
            public string? nguoiLapPhieu { get; set; } = string.Empty;
            public string? nguoiKy { get; set; } = string.Empty;
            public string? chucVu { get; set; } = string.Empty;
            public string? tinhTrangAnTich { get; set; } = string.Empty;
            public string? tenTinhTrangAnTich { get; set; } = string.Empty;
            public string? thongTinCDNCV { get; set; } = string.Empty;
            public string? tenThongTinCDNCV { get; set; } = string.Empty;
            public List<ThongTinAn>? thongTinAn { get; set; }
            public List<DsCDNCV>? dsCDNCV { get; set; }
            public string? phieuLLTP { get; set; } = string.Empty;
            public string? quyetDinhThuHoi { get; set; } = string.Empty;
        }

        public class ThongTinAn
        {
            public string? soBanAn { get; set; } = string.Empty;
            public string? ngayBanAn { get; set; } = string.Empty;
            public string? toaDaTuyen { get; set; } = string.Empty;
            public string? tenToaDaTuyen { get; set; } = string.Empty;
            public List<DsToiDanh>? dsToiDanh { get; set; }
            public List<DsHinhPhatChinh>? dsHinhPhatChinh { get; set; }
            public List<DsHinhPhatBoSung>? dsHinhPhatBoSung { get; set; }
            public string? ngayChapHanh { get; set; } = string.Empty;
            public string? ngayXoaAn { get; set; } = string.Empty;
            public string? dieuKhoan { get; set; } = string.Empty;
            public string? anPhi { get; set; } = string.Empty;
            public string? nghiaVuDanSu { get; set; } = string.Empty;
            public string? tinhTrangThiHanh { get; set; } = string.Empty;
        }

        public class DsToiDanh
        {
            public string? toiDanh { get; set; } = string.Empty;
            public string? tenToiDanh { get; set; } = string.Empty;
        }

        public class DsHinhPhatChinh
        {
            public string? maHinhPhat { get; set; } = string.Empty;
            public string? tenHinhPhat { get; set; } = string.Empty;
            public string? ghiChu { get; set; } = string.Empty;
        }

        public class DsHinhPhatBoSung
        {
            public string? maHinhPhat { get; set; } = string.Empty;
            public string? tenHinhPhat { get; set; } = string.Empty;
            public string? noiDungHinhPhatBoSung { get; set; } = string.Empty;
        }

        public class DsCDNCV
        {
            public string? soQuyetDinh { get; set; } = string.Empty;
            public string? ngayQuyetDinh { get; set; } = string.Empty;
            public string? toaAnQD { get; set; } = string.Empty;
            public string? chucVuCam { get; set; } = string.Empty;
            public string? thoiHanCam { get; set; } = string.Empty;
            public string? camTuNgay { get; set; } = string.Empty;
        }
    }
    public class ThuHoiQuyetDinhLLTP {
        public string? LyDoThuHoi { get; set; }
        public string? SoQuyetDinh { get; set; }
        public DateTime? NgayQuyetDinh { get; set; }
        public string? TrichYeuQuyetDinh { get; set; }
        public string FileQuyetDinh { get; set; }
    }
    public static class ScanBoParams
    {
        public class Request
        {
            public string authKey { get; set; }
            public string maTinh { get; set; }
            public string maHoSoMCDT { get; set; }
        }
        public class Response
        {
            /// <summary>
            /// 1 - thành công
            /// 0 - thất bại
            /// </summary>
            public int status { get; set; }
            public string statusDescription { get; set; }
            public List<Value> value { get; set; }
        }
        public class Value
        {
            public string maHoSoMCDT { get; set; }
            public string trangThaiXuLy { get; set; }
            public KetQuaXuLy? ketQuaXuLy { get; set; }
        }
        public class KetQuaXuLy
        {
            public string? soPhieuLLTP { get; set; } = string.Empty;
            public string? ngayCapPhieu { get; set; } = string.Empty;
            public string? loaiPhieu { get; set; } = string.Empty;
            public string? nguoiLapPhieu { get; set; } = string.Empty;
            public string? nguoiKy { get; set; } = string.Empty;
            public string? chucVu { get; set; } = string.Empty;
            public string? tinhTrangAnTich { get; set; } = string.Empty;
            public string? tenTinhTrangAnTich { get; set; } = string.Empty;
            public string? thongTinCDNCV { get; set; } = string.Empty;
            public string? tenThongTinCDNCV { get; set; } = string.Empty;
            public List<ThongTinAn>? thongTinAn { get; set; }
            public List<DsCDNCV>? dsCDNCV { get; set; }
            public string? phieuLLTP { get; set; } = string.Empty;
            public string? quyetDinhThuHoi { get; set; } = string.Empty;
        }
    }
    public class Request
    {
        public string maTinh { get; set; } = string.Empty;
        public string tenTinh { get; set; } = string.Empty;
        public string maHoSoMCDT { get; set; } = string.Empty;
        public string ngayTiepNhan { get; set; } = string.Empty;
        public int? nguonDangKy { get; set; }
        public string tenNguonDangKy { get; set; } = string.Empty;
        public ToKhaiData? toKhai { get; set; }
        public ThongTinBienLaiData? thongTinBienLai { get; set; }

        public class ToKhaiData
        {
            public int? loaiPhieu { get; set; }
            public int? yeuCauCDNCV { get; set; }
            public int? maMucDich { get; set; }
            public string? tenMucDich { get; set; } = string.Empty;
            public string? mucDichKhac { get; set; } = string.Empty;
            public int? soLuongCap { get; set; }
            public string? nycHoTen { get; set; } = string.Empty;
            public string? nycTenGoiKhac { get; set; } = string.Empty;
            public int? nycGioiTinh { get; set; }
            public string? nycTenGioiTinh { get; set; } = string.Empty;
            public string? nycNgaySinh { get; set; } = string.Empty;
            public string? nycDoiTuongNopPhi { get; set; } = string.Empty;
            public string? nycTenDoiTuongNopPhi { get; set; } = string.Empty;
            public DiaChi? nycThuongTru { get; set; }
            public DiaChi? nycTamTru { get; set; }
            public string? nycDienThoai { get; set; } = string.Empty;
            public string? nycEmail { get; set; } = string.Empty;
            public int? nycLoaiGiayTo { get; set; }
            public string? nycTenLoaiGiayTo { get; set; } = string.Empty;
            public string? nycSoGiayTo { get; set; } = string.Empty;
            public string? nycNgayCapGiayTo { get; set; } = string.Empty;
            public string? nycNoiCapGiayTo { get; set; } = string.Empty;
            public string? nycQuocTich { get; set; } = string.Empty;
            public string? nycTenQuocTich { get; set; } = string.Empty;
            public string? nycDanToc { get; set; } = string.Empty;
            public string? nycTenDanToc { get; set; } = string.Empty;
            public string? nycHoTenCha { get; set; } = string.Empty;
            public int? chaNamSinh { get; set; }
            public string? nycHoTenMe { get; set; } = string.Empty;
            public int? meNamSinh { get; set; }
            public string? nycHoTenVoChong { get; set; } = string.Empty;
            public int? voChongNamSinh { get; set; }
            public DiaBanNoiSinh? nycNoiSinh { get; set; }
            public int? uyQuyen { get; set; }
            public ThongTinUyQuyen? thongTinUyQuyen { get; set; }
            public string? thongTinAnTich { get; set; } = string.Empty;
            public List<QuaTrinhCTNNNLV> quaTrinhCTNNNLV { get; set; } = [];
            public ThongTinThanhToan? thongTinThanhToan { get; set; }
            public List<GiayToDinhKem> giayToDinhKem { get; set; } = [];
        }
        public class DiaBanNoiSinh
        {
            public string? maQuocGia { get; set; } = string.Empty;
            public string? tenQuocGia { get; set; } = string.Empty;
            public string? maTinhThanh { get; set; } = string.Empty;
            public string? tenTinhThanh { get; set; } = string.Empty;
            public string? maQuanHuyen { get; set; } = string.Empty;
            public string? tenQuanHuyen { get; set; } = string.Empty;
            public string? maPhuongXa { get; set; } = string.Empty;
            public string? tenPhuongXa { get; set; } = string.Empty;
            public string? chiTiet { get; set; } = string.Empty;
            public string? dcChiTiet { get; set; } = string.Empty;
        }
        public class DiaChi
        {
            public string? maTinhThanh { get; set; } = string.Empty;
            public string? tenTinhThanh { get; set; } = string.Empty;
            public string? maQuanHuyen { get; set; } = string.Empty;
            public string? tenQuanHuyen { get; set; } = string.Empty;
            public string? maPhuongXa { get; set; } = string.Empty;
            public string? tenPhuongXa { get; set; } = string.Empty;
            public string? chiTiet { get; set; } = string.Empty;
            public string? tenQuocGia { get; set; } = string.Empty;
        }

        public class ThongTinUyQuyen
        {
            public string? nuqHoTen { get; set; } = string.Empty;
            public int? nuqGioiTinh { get; set; }
            public string? nuqTenGioiTinh { get; set; } = string.Empty;
            public string? nuqNgaySinh { get; set; } = string.Empty;
            public string? nuqDienThoai { get; set; } = string.Empty;
            public string? nuqEmail { get; set; } = string.Empty;
            public int? nuqLoaiGiayTo { get; set; }
            public string? nuqTenLoaiGiayTo { get; set; } = string.Empty;
            public string? nuqSoGiayTo { get; set; } = string.Empty;
            public string? nuqNgayCapGiayTo { get; set; } = string.Empty;
            public string? nuqNoiCapGiayTo { get; set; } = string.Empty;
            public string? nuqQuocTich { get; set; } = string.Empty;
            public string? nuqTenQuocTich { get; set; } = string.Empty;
            public string? nuqDanToc { get; set; } = string.Empty;
            public string? nuqTenDanToc { get; set; } = string.Empty;
            public DiaChi? nuqNoiDKKS { get; set; }
            public DiaChi? nuqNoiOHienTai { get; set; }
            public QuanHe? nuqQuanHe { get; set; }
            public string? nuqNgayKyVanBanUyQuyen { get; set; } = string.Empty;
        }

        public class QuanHe
        {
            public int? ma { get; set; }
            public string? ten { get; set; } = string.Empty;
        }

        public class QuaTrinhCTNNNLV
        {
            public string? tuThangNam { get; set; } = string.Empty;
            public string? denThangNam { get; set; } = string.Empty;
            public string? loaiCuTru { get; set; } = string.Empty;
            public DiaChi? diaChiCuTru { get; set; }
            public string? ngheNghiep { get; set; } = string.Empty;
            public string? noiLamViec { get; set; } = string.Empty;
        }

        public class ThongTinThanhToan
        {
            public int? nhomDoiTuong { get; set; }
            public string? tenNhomDoiTuong { get; set; } = string.Empty;
            public string? phiLLTP { get; set; } = string.Empty;
            public string? phiCapThemBanGiay { get; set; } = string.Empty;
            public int? hinhThucNhanBanGiay { get; set; }
            public string? tenHinhThucNhanBanGiay { get; set; } = string.Empty;
            public string? diaChiNhan { get; set; } = string.Empty;
            public string? tongPhi { get; set; } = string.Empty;
        }

        public class GiayToDinhKem
        {
            public string? ma { get; set; } = string.Empty;
            public string? ten { get; set; } = string.Empty;
            public List<DanhSachGiayTo> danhSach { get; set; } = [];
        }

        public class DanhSachGiayTo
        {
            public string? loai { get; set; } = string.Empty;
            public string? duLieu { get; set; } = string.Empty;
        }

        public class ThongTinBienLaiData
        {
            public int? maDichVu { get; set; }
            public string? maDVC { get; set; } = string.Empty;
            public string? tenDVC { get; set; } = string.Empty;
            public string? maTTHC { get; set; } = string.Empty;
            public string? tenTTHC { get; set; } = string.Empty;
            public string? maDonVi { get; set; } = string.Empty;
            public string? tenDonVi { get; set; } = string.Empty;
            public string? tkThuHuong { get; set; } = string.Empty;
            public string? maNhThuHuong { get; set; } = string.Empty;
            public string? tenTkThuHuong { get; set; } = string.Empty;
            public List<DSKhoanNop>? dSKhoanNop { get; set; }
            public int? trangThaiGD { get; set; }
            public string? tenTrangThaiGD { get; set; } = string.Empty;
            public string? urlBienLai { get; set; } = string.Empty;
        }

        public class DSKhoanNop
        {
            public string? NoiDung { get; set; } = string.Empty;
            public string? SoTien { get; set; } = string.Empty;
        }
    }
}