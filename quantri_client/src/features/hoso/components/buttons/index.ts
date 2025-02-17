import { XacNhanTraLaiXinRutProps, XacNhanTraLaiXinRutWrapper } from './XacNhanTraLaiXinRut';
import { ActionType } from '../../data'
import { ChuyenBuocXuLyProps, ChuyenBuocXuLyWrapper } from './ChuyenBuocXuLy'
import { ChuyenNoiBoProps, ChuyenNoiBoWrapper } from './ChuyenNoiBo'
import { SuaHoSoProps, SuaHoSoWrapper } from './SuaHoSo'
import { ThayDoiTruongHopXuLyProps, ThayDoiTruongHopXuLyWrapper } from './ThayDoiTruongHopXuLy'
import { ThemMoiHoSoWrapper, ThemMoiHoSoProps } from './ThemMoiHoSo'
import { CapNhatKetQuaXuLyHoSoProps, CapNhatKetQuaXuLyHoSoWrapper } from './CapNhatKetQuaXuLyHoSo'
import { TraLaiBuocTruocProps, TraLaiBuocTruocWrapper } from './TraLaiBuocTruoc'
import { XoaHoSoProps, XoaHoSoWrapper } from './XoaHoSo'
import { YeuCauThanhToanProps, YeuCauThanhToanWrapper } from './YeuCauThanhToan'
import { KetThucProps, KetThucWrapper } from './KetThuc'
import { ThuHoiHoSoProps, ThuHoiHoSoWrapper } from './ThuHoiHoSo'
import { YeuCauMotCuaBoSungProps, YeuCauMotCuaBoSungWrapper } from './YeuCauMotCuaBoSung'
import { CapNhatBoSungHoSoProps, CapNhatBoSungHoSoWrapper } from './CapNhatBoSungHoSo'
import { ChuyenBuocNhanhHoSoProps, ChuyenBuocNhanhHoSoWrapper } from './ChuyenBuocNhanhHoSo'
import { YeuCauCongDanBoSungHoSoProps, YeuCauCongDanBoSungHoSoWrapper } from './YeuCauCongDanBoSungHoSo'
import { TiepNhanHoSoTrucTuyenProps, TiepNhanHoSoTrucTuyenWrapper } from './TiepNhanHoSoTrucTuyen'
import { TuChoiTiepNhanHoSoTrucTuyenProps, TuChoiTiepNhanHoSoTrucTuyenWrapper } from './TuChoiTiepNhanHoSoTrucTuyen'
import { TraBoSungProps, TraBoSungWrapper } from './TraBoSung'
import { HoanThanhBoSungProps, HoanThanhBoSungWrapper } from './HoanThanhBoSung'
import { KhongTiepNhanHoSoBoSungQuaHanProps, KhongTiepNhanHoSoBoSungQuaHanWrapper } from './KhongTiepNhanHoSoBoSungQuaHan'
import { XacNhanKetQuaProps, XacNhanKetQuaWrapper } from './XacNhanKetQua'
import { LienThongHeThongLLTPHoSoProps, LienThongHeThongLLTPHoSoWrapper } from './LienThongHeThongLLTP'
import { ChuyenTraKetQuaHCCProps, ChuyenTraKetQuaHCCWrapper } from './ChuyenTraKetQuaHCC'
import { TiepNhanHoSoChungThucProps, TiepNhanHoSoChungThucWrapper } from './TiepNhanHoSoChungThuc'
import { ThemMoiHoSoChungThucProps, ThemMoiHoSoChungThucWrapper } from './ThemMoiHoSoChungThuc'
import { KySoChungThucProps, KySoChungThucWrapper } from './KySoChungThuc'
import { KetThucXuLyNhieuHoSoProps, KetThucXuLyNhieuHoSoWrapper } from './KetThucXuLyNhieuHoSo'
import { TraKetQuaVaDanhGiaHaiLongProps, TraKetQuaVaDanhGiaHaiLongWrapper } from './TraKetQuaVaDanhGiaHaiLong'
import { TraKetQuaChungThucVaDanhGiaHaiLongProps, TraKetQuaChungThucVaDanhGiaHaiLongWrapper } from './TraKetQuaChungThucVaDanhGiaHaiLong'
import { DuThaoBoSungHoSoProps, DuThaoBoSungHoSoWrapper } from './DuThaoBoSungHoSo'
import { DuThaoTraLaiXinRutHoSoProps, DuThaoTraLaiXinRutHoSoWrapper } from './DuThaoTraLaiXinRutHoSo'
import { YeuCauBCCILayKetQuaModalProps, YeuCauBCCILayKetQuaModalWrapper } from './YeuCauBCCILayKetQua'
import { XacNhanVaYeuCauBCCILayKetQuaModalProps, XacNhanVaYeuCauBCCILayKetQuaModalWrapper } from './XacNhanVaYeuCauBCCILayKetQua'
import { ChuyenPhiDiaGioiProps, ChuyenPhiDiaGioiWrapper } from './ChuyenPhiDiaGioi'
import { DongDauProps, DongDauWrapper } from './DongDauChungThucHoSo'
import { YeuCauThanhToanChungThucProps, YeuCauThanhToanChungThucWrapper } from './YeuCauThanhToanChungThuc'
import { DangKyNhanKetQuaBCCIProps, DangKyNhanKetQuaBCCIWrapper } from './DangKyNhanKetQuaQuaBCCI'
import { YeuCauThanhToanVaXacNhanKqProps, YeuCauThanhToanVaXacNhanKqWrapper } from './YeuCauThanhToanVaXacNhanKq'
import { TraKetQuaChungThucProps, TraKetQuaChungThucWrapper } from './TraKetQuaChungThuc'
import { YeuCauThanhToanNhieuHoSosProps, YeuCauThanhToanNhieuHoSosWrapper } from './YeuCauThanhToanNhieuHoSos'
import { YeuCauThanhToanLLTPProps, YeuCauThanhToanLLTPWrapper } from './YeuCauThanhToanLLTP'
import { DuThaoXinLoiHoSoProps, DuThaoXinLoiHoSoWrapper } from './DuThaoXinLoiHoSo'
import { ThuHoiHoSoDaTraKetQuaProps, ThuHoiHoSoDaTraKetQuaWrapper } from './ThuHoiHoSoDaTraKetQua'
import { TraKetQuaHCCProps, TraKetQuaHCCWrapper } from './TraKetQuaHCC'
import { TraKetQuaVaThuLaiBanGocProps, TraKetQuaVaThuLaiBanGocWrapper } from './TraKetQuaVaThuLaiBanGoc'
import { BanGiaoKetQuaProps, BanGiaoKetQuaWrapper } from './BanGiaoKetQua'
import { XacNhanBoSungProps, XacNhanBoSungWrapper } from './XacNhanBoSung';
import { InTiepNhanNhieuHoSoProps, InTiepNhanNhieuHoSoWrapper } from './InTiepNhanNhieuHoSo';
import { TraKetQuaHccNhieuHoSoProps, TraKetQuaHccNhieuHoSoWrapper } from './TraKetQuaHccNhieuHoSo';
import { ChuyenBuocXuLyNhieuHoSoProps, ChuyenBuocXuLyNhieuHoSoWrapper } from './ChuyenBuocXuLyNhieuHoSo';
import { TraKetQuaHCCHuyenXaProps, TraKetQuaHCCHuyenXaWrapper } from './TraKetQuaHccHuyenXa';
import { TraKetQuaProps, TraKetQuaWrapper } from './TraKetQua';
import { KetThucHoSoTBKMProps, KetThucHoSoTBKMWrapper } from './KetThucHoSoTBKM';
import { ThemNguoiTiepNhanHoSoProps, ThemNguoiTiepNhanHoSoWrapper } from './ThemNguoiTiepNhanHoSo';
import { ThuHoiMaVanDonBuuDienModalProps, ThuHoiMaVanDonBuuDienModalWrapper } from './ThuHoiMaVanDonBuuDien';
import { XuatExcelDanhSachHoSoProps, XuatExcelDanhSachHoSoWrapper } from './XuatExcelDanhSachHoSo';
import { YeuCauBCCILayKetQuaWithoutItemCodeModalProps, YeuCauBCCILayKetQuaWithoutItemCodeModalWrapper } from './YeuCauBCCILayKetQuaWithoutItemCode';
import { ThuHoiDangKyNhanKqQuaBCCIModalProps, ThuHoiDangKyNhanKqQuaBCCIModalWrapper } from './ThuHoiMaVanDonBuuDien copy';
import { LienThongBTPHoSoProps, LienThongBTPHoSoWrapper } from './LienThongBTP';
import { YeuCauBCCILayKetQuaNhieuHoSoItemCodeModalProps, YeuCauBCCILayKetQuaNhieuHoSoItemCodeModalWrapper } from './YeuCauBCCILayKetQuaNhieuHoSoItemCode';
import { TraLaiXinRutKhongTrinhKyHoSoProps, TraLaiXinRutKhongTrinhKyHoSoWrapper } from './TraLaiXinRutKhongTrinhKy';
import { CapNhatKetQuaXuLyNhieuHoSoProps, CapNhatKetQuaXuLyNhieuHoSoWrapper } from './CapNhatKetQuaXuLyNhieuHoSo';
import { BienNhanKetQuaProps, BienNhanKetQuaWrapper } from './BienNhanKetQua';
import { DuyetThongQuaDuThaoProps, DuyetThongQuaDuThaoWrapper } from './DuyetThongQuaDuThao';
import { TuChoiDuThaoProps, TuChoiDuThaoWrapper } from './TuChoiDuThao';
import { ThemMoiHoSoPhiDiaGioiProps, ThemMoiHoSoPhiDiaGioiWrapper } from './ThemMoiHoSoPhiDiaGioi';
import { TraCuuBTPHoSoProps, TraCuuBTPHoSoWrapper } from './TraCuuBTP';
import { FakeTuChoiBTPHoSoProps, FakeTuChoiBTPHoSoWrapper } from './FakeTuChoiBTP';
import { DatLaiHoSoQuaHanProps, DatLaiHoSoQuaHanWrapper } from './DatLaiHoSoQuaHan';
import { GuiLienThongLLTPProps, GuiLienThongLLTPWrapper } from './GuiLienThongLLTP';
import { ThuHoiQuyetDinhLLTPProps, ThuHoiQuyetDinhLLTPWrapper } from './ThuHoiQuyetDinhLLTP';
import { TiepNhanGuiVBDLISModalProps, TiepNhanGuiVBDLISModalWrapper } from './TiepNhanGuiVBDLIS';
import { BoSungHoSoGuiVBDLISModalProps, BoSungHoSoGuiVBDLISModalWrapper } from './BoSungHoSoGuiVBDLIS';
import { ChuyenBuocXuLyChungThucProps, ChuyenBuocXuLyChungThucWrapper } from './ChuyenBuocXuLyChungThuc';
import { GuiPhiDiaGioiProps, GuiPhiDiaGioiWrapper } from './GuiPhiDiaGioi';
import { ThucHienNghiaVuTaiChinhGuiVBDLISModalProps, ThucHienNghiaVuTaiChinhGuiVBDLISModalWrapper } from './ThucHienNghiVuTaiChinhGuiVBDLIS';
import { ThemMoiHoSoDienTuProps, ThemMoiHoSoDienTuWrapper } from './ThemMoiHoSoDienTu';
import { AdminCapNhatHoSoProps, AdminCapNhatHoSoWrapper } from './AdminCapNhatHoSo';
import { ExcelXuatDanhSachHoSoTheoDoiProps, ExcelXuatDanhSachHoSoTheoDoiWrapper } from './ExcelXuatDanhSachHoSoTheoDoi';

export const buttonActions: Record<ActionType, (...any: any) => React.ReactNode> = {
    'them-moi': (props: ThemMoiHoSoProps) => ThemMoiHoSoWrapper(props),
    'chuyen-buoc-xu-ly': (props: ChuyenBuocXuLyProps) => ChuyenBuocXuLyWrapper(props),
    'chuyen-buoc-xu-ly-chung-thuc': (props: ChuyenBuocXuLyChungThucProps) => ChuyenBuocXuLyChungThucWrapper(props),
    'sua-ho-so': (props: SuaHoSoProps) => SuaHoSoWrapper(props),
    'them-moi-ho-so-dien-tu': (props: ThemMoiHoSoDienTuProps) => ThemMoiHoSoDienTuWrapper(props),
    'cap-nhat-ket-qua-xu-ly-ho-so': (props: CapNhatKetQuaXuLyHoSoProps) => CapNhatKetQuaXuLyHoSoWrapper(props),
    'cap-nhat-ket-qua-xu-ly-nhieu-ho-so': (props: CapNhatKetQuaXuLyNhieuHoSoProps) => CapNhatKetQuaXuLyNhieuHoSoWrapper(props),
    'scan-ket-qua': (props: CapNhatKetQuaXuLyNhieuHoSoProps) => CapNhatKetQuaXuLyNhieuHoSoWrapper(props),
    'ky-so-ho-so': (props: CapNhatKetQuaXuLyNhieuHoSoProps) => CapNhatKetQuaXuLyNhieuHoSoWrapper(props),
    'scan-ho-so': (props: AdminCapNhatHoSoProps) => AdminCapNhatHoSoWrapper(props),
    'them-nguoi-tiep-nhan-ho-so': (props: ThemNguoiTiepNhanHoSoProps) => ThemNguoiTiepNhanHoSoWrapper(props),
    'thay-doi-truong-hop-xu-ly': (props: ThayDoiTruongHopXuLyProps) => ThayDoiTruongHopXuLyWrapper(props),
    'yeu-cau-thu-phi-le-phi-ho-so': (props: YeuCauThanhToanProps) => YeuCauThanhToanWrapper(props),
    'xoa-ho-so': (props: XoaHoSoProps) => XoaHoSoWrapper(props),
    'tra-lai-buoc-truoc': (props: TraLaiBuocTruocProps) => TraLaiBuocTruocWrapper(props),
    'chuyen-noi-bo-ho-so': (props: ChuyenNoiBoProps) => ChuyenNoiBoWrapper(props),
    'ket-thuc-ho-so': (props: KetThucProps) => KetThucWrapper(props),
    'ban-giao-ket-qua': (props: BanGiaoKetQuaProps) => BanGiaoKetQuaWrapper(props),
    'bien-nhan-ket-qua': (props: BienNhanKetQuaProps) => BienNhanKetQuaWrapper(props),
    'chuyen-doi-ban-giay': (props: BanGiaoKetQuaProps) => BanGiaoKetQuaWrapper(props),
    'tra-ket-qua': (props: TraKetQuaProps) => TraKetQuaWrapper(props),
    'tra-ket-qua-hcc-huyen-xa': (props: TraKetQuaHCCHuyenXaProps) => TraKetQuaHCCHuyenXaWrapper(props),
    'tra-ket-qua-hcc': (props: TraKetQuaHCCProps) => TraKetQuaHCCWrapper(props),
    'tra-ket-qua-hcc-nhieu-ho-so': (props: TraKetQuaHccNhieuHoSoProps) => TraKetQuaHccNhieuHoSoWrapper(props),
    'tra-ket-qua-va-thu-lai-ban-goc': (props: TraKetQuaVaThuLaiBanGocProps) => TraKetQuaVaThuLaiBanGocWrapper(props),
    'danh-gia-hai-long': (props: TraKetQuaVaDanhGiaHaiLongProps) => TraKetQuaVaDanhGiaHaiLongWrapper(props),
    'tra-ket-qua-ho-so-chung-thuc-va-danh-gia-hai-long': (props: TraKetQuaChungThucVaDanhGiaHaiLongProps) => TraKetQuaChungThucVaDanhGiaHaiLongWrapper(props),
    'thu-hoi-ho-so': (props: ThuHoiHoSoProps) => ThuHoiHoSoWrapper(props),
    'yeu-cau-mot-cua-bo-sung-ho-so': (props: YeuCauMotCuaBoSungProps) => YeuCauMotCuaBoSungWrapper(props),
    'cap-nhat-bo-sung-ho-so': (props: CapNhatBoSungHoSoProps) => CapNhatBoSungHoSoWrapper(props),
    'chuyen-buoc-nhanh-ho-so': (props: ChuyenBuocNhanhHoSoProps) => ChuyenBuocNhanhHoSoWrapper(props),
    'yeu-cau-cong-dan-bo-sung-ho-so': (props: YeuCauCongDanBoSungHoSoProps) => YeuCauCongDanBoSungHoSoWrapper(props),
    'tiep-nhan-ho-so-truc-tuyen': (props: TiepNhanHoSoTrucTuyenProps) => TiepNhanHoSoTrucTuyenWrapper(props),
    'tu-choi-tiep-nhan-ho-so-truc-tuyen': (props: TuChoiTiepNhanHoSoTrucTuyenProps) => TuChoiTiepNhanHoSoTrucTuyenWrapper(props),
    'in-tiep-nhan-nhieu-ho-so': (props: InTiepNhanNhieuHoSoProps) => InTiepNhanNhieuHoSoWrapper(props),
    'tra-bo-sung': (props: TraBoSungProps) => TraBoSungWrapper(props),
    'hoan-thanh-bo-sung': (props: HoanThanhBoSungProps) => HoanThanhBoSungWrapper(props),
    'khong-tiep-nhan-ho-so-bo-sung-qua-han': (props: KhongTiepNhanHoSoBoSungQuaHanProps) => KhongTiepNhanHoSoBoSungQuaHanWrapper(props),
    'xac-nhan-ket-qua': (props: XacNhanKetQuaProps) => XacNhanKetQuaWrapper(props),
    'chuyen-tra-ket-qua': (props: ChuyenTraKetQuaHCCProps) => ChuyenTraKetQuaHCCWrapper(props),
    'lien-thong-he-thong-lltp': (props: LienThongHeThongLLTPHoSoProps) => LienThongHeThongLLTPHoSoWrapper(props),
    'tiep-nhan-ho-so-chung-thuc': (props: TiepNhanHoSoChungThucProps) => TiepNhanHoSoChungThucWrapper(props),
    'them-moi-ho-so-chung-thuc': (props: ThemMoiHoSoChungThucProps) => ThemMoiHoSoChungThucWrapper(props),
    'ky-so-chung-thuc-ho-so': (props: KySoChungThucProps) => KySoChungThucWrapper(props),
    'du-thao-bo-sung-ho-so': (props: DuThaoBoSungHoSoProps) => DuThaoBoSungHoSoWrapper(props),
    'du-thao-tra-lai-xin-rut-ho-so': (props: DuThaoTraLaiXinRutHoSoProps) => DuThaoTraLaiXinRutHoSoWrapper(props),
    'yeu-cau-bcci-lay-ket-qua': (props: YeuCauBCCILayKetQuaModalProps) => YeuCauBCCILayKetQuaModalWrapper(props),
    'tra-ket-qua-bcci': (props: YeuCauBCCILayKetQuaModalProps) => YeuCauBCCILayKetQuaModalWrapper(props),
    'tra-ket-qua-bcci-khong-gui-kem-itemcode': (props: YeuCauBCCILayKetQuaWithoutItemCodeModalProps) => YeuCauBCCILayKetQuaWithoutItemCodeModalWrapper(props),
    'tra-ket-qua-bcci-nhieu-ho-so-itemcode': (props: YeuCauBCCILayKetQuaNhieuHoSoItemCodeModalProps) => YeuCauBCCILayKetQuaNhieuHoSoItemCodeModalWrapper(props),
    'thu-hoi-ma-van-don-buu-dien': (props: ThuHoiMaVanDonBuuDienModalProps) => ThuHoiMaVanDonBuuDienModalWrapper(props),
    'thu-hoi-dang-ky-nhan-kq-qua-bcci': (props: ThuHoiDangKyNhanKqQuaBCCIModalProps) => ThuHoiDangKyNhanKqQuaBCCIModalWrapper(props),
    'xac-nhan-va-yeu-cau-bcci-lay-ket-qua': (props: XacNhanVaYeuCauBCCILayKetQuaModalProps) => XacNhanVaYeuCauBCCILayKetQuaModalWrapper(props),
    'chuyen-phi-dia-gioi': (props: ChuyenPhiDiaGioiProps) => ChuyenPhiDiaGioiWrapper(props),
    'dong-dau-chung-thuc-ho-so': (props: DongDauProps) => DongDauWrapper(props),
    "yeu-cau-thanh-toan-chung-thuc": (props: YeuCauThanhToanChungThucProps) => YeuCauThanhToanChungThucWrapper(props),
    'dang-ky-nhan-kq-qua-bcci': (props: DangKyNhanKetQuaBCCIProps) => DangKyNhanKetQuaBCCIWrapper(props),
    'yeu-cau-thanh-toan-va-xac-nhan-kq': (props: YeuCauThanhToanVaXacNhanKqProps) => YeuCauThanhToanVaXacNhanKqWrapper(props),
    'tra-ket-qua-chung-thuc': (props: TraKetQuaChungThucProps) => TraKetQuaChungThucWrapper(props),
    'yeu-cau-thu-phi-le-phi-nhieu-ho-so': (props: YeuCauThanhToanNhieuHoSosProps) => YeuCauThanhToanNhieuHoSosWrapper(props),
    'yeu-cau-thanh-toan-lltp': (props: YeuCauThanhToanLLTPProps) => YeuCauThanhToanLLTPWrapper(props),
    'du-thao-xin-loi': (props: DuThaoXinLoiHoSoProps) => DuThaoXinLoiHoSoWrapper(props),
    'thu-hoi-ho-so-da-tra-ket-qua': (props: ThuHoiHoSoDaTraKetQuaProps) => ThuHoiHoSoDaTraKetQuaWrapper(props),
    'xac-nhan-tra-lai-xin-rut': (props: XacNhanTraLaiXinRutProps) => XacNhanTraLaiXinRutWrapper(props),
    'xac-nhan-bo-sung': (props: XacNhanBoSungProps) => XacNhanBoSungWrapper(props),
    'chuyen-buoc-xu-ly-nhieu-ho-so': (props: ChuyenBuocXuLyNhieuHoSoProps) => ChuyenBuocXuLyNhieuHoSoWrapper(props),
    'ket-thuc-ho-so-co-thu-tuc-tbkm': (props: KetThucHoSoTBKMProps) => KetThucHoSoTBKMWrapper(props),
    'dat-lai-ho-so-qua-han': (props: DatLaiHoSoQuaHanProps) => DatLaiHoSoQuaHanWrapper(props),
    'xuat-file-excel-danh-sach-ho-so': (props: XuatExcelDanhSachHoSoProps) => XuatExcelDanhSachHoSoWrapper(props),
    'lien-thong-btp': (props: LienThongBTPHoSoProps) => LienThongBTPHoSoWrapper(props),
    'tra-lai-xin-rut-khong-ky-duyet': (props: TraLaiXinRutKhongTrinhKyHoSoProps) => TraLaiXinRutKhongTrinhKyHoSoWrapper(props),
    'ket-thuc-xu-ly-nhieu-ho-so': (props: KetThucXuLyNhieuHoSoProps) => KetThucXuLyNhieuHoSoWrapper(props),
    'them-moi-ho-so-phi-dia-gioi': (props: ThemMoiHoSoPhiDiaGioiProps) => ThemMoiHoSoPhiDiaGioiWrapper(props),
    'tra-cuu-btp': (props: TraCuuBTPHoSoProps) => TraCuuBTPHoSoWrapper(props),
    'fake-tu-choi-btp': (props: FakeTuChoiBTPHoSoProps) => FakeTuChoiBTPHoSoWrapper(props),
    'gui-lien-thong-lltp': (props: GuiLienThongLLTPProps) => GuiLienThongLLTPWrapper(props),
    'thu-hoi-quyet-dinh-lltp': (props: ThuHoiQuyetDinhLLTPProps) => ThuHoiQuyetDinhLLTPWrapper(props),
    'tiep-nhan-gui-vbdlis': (props: TiepNhanGuiVBDLISModalProps) => TiepNhanGuiVBDLISModalWrapper(props),
    'bo-sung-ho-so-gui-vbdlis': (props: BoSungHoSoGuiVBDLISModalProps) => BoSungHoSoGuiVBDLISModalWrapper(props),
    'thuc-hien-nghia-vu-tai-chinh-vbdlis': (props: ThucHienNghiaVuTaiChinhGuiVBDLISModalProps) => ThucHienNghiaVuTaiChinhGuiVBDLISModalWrapper(props),
    'gui-phi-dia-gioi': (props: GuiPhiDiaGioiProps) => GuiPhiDiaGioiWrapper(props),
    'xuat-excel-ho-so-theo-doi': (props: ExcelXuatDanhSachHoSoTheoDoiProps) => ExcelXuatDanhSachHoSoTheoDoiWrapper(props),
}   