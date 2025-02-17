import { ActionType } from '../../data'
import { ChuyenBuocXuLyProps, ChuyenBuocXuLyWrapper } from './ChuyenBuocXuLy'
import { ChuyenNoiBoProps, ChuyenNoiBoWrapper } from './ChuyenNoiBo'
import { SuaHoSoProps, SuaHoSoWrapper } from './SuaHoSo'
import { ThayDoiTruongHopXuLyProps, ThayDoiTruongHopXuLyWrapper } from './ThayDoiTruongHopXuLy'
import {ThemMoiHoSoWrapper, ThemMoiHoSoProps} from './ThemMoiHoSo'
import { CapNhatKetQuaXuLyHoSoProps, CapNhatKetQuaXuLyHoSoWrapper } from './CapNhatKetQuaXuLyHoSo'
import { TraLaiBuocTruocProps, TraLaiBuocTruocWrapper } from './TraLaiBuocTruoc'
import { XoaHoSoProps, XoaHoSoWrapper } from './XoaHoSo'
import { YeuCauThanhToanProps, YeuCauThanhToanWrapper } from './YeuCauThanhToan'
import { KetThucProps, KetThucWrapper } from './KetThuc'
import { TraKetQuaProps, TraKetQuaWrapper } from './TraKetQua'
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
import { TraKetQuaVaDanhGiaHaiLongProps, TraKetQuaVaDanhGiaHaiLongWrapper } from './TraKetQuaVaDanhGiaHaiLong'
import { DuThaoBoSungHoSoProps, DuThaoBoSungHoSoWrapper } from './DuThaoBoSungHoSo'
import { DuThaoTraLaiXinRutHoSoProps, DuThaoTraLaiXinRutHoSoWrapper } from './DuThaoTraLaiXinRutHoSo'
import { YeuCauBCCILayKetQuaModalProps, YeuCauBCCILayKetQuaModalWrapper } from './YeuCauBCCILayKetQua'
import { XacNhanVaYeuCauBCCILayKetQuaModalProps, XacNhanVaYeuCauBCCILayKetQuaModalWrapper } from './XacNhanVaYeuCauBCCILayKetQua'
import { ChuyenPhiDiaGioiProps, ChuyenPhiDiaGioiWrapper } from './ChuyenPhiDiaGioi'
import { DongDauProps, DongDauWrapper } from './DongDauChungThucHoSo'
import { YeuCauThanhToanChungThucProps, YeuCauThanhToanChungThucWrapper } from './YeuCauThanhToanChungThuc'
import { DangKyNhanKetQuaBCCIProps, DangKyNhanKetQuaBCCIWrapper } from './DangKyNhanKetQuaQuaBCCI'
import { YeuCauThanhToanVaXacNhanKqProps, YeuCauThanhToanVaXacNhanKqWrapper } from './YeuCauThanhToanVaXacNhanKq'
export const buttonActions: Record<ActionType, (...any: any) => React.ReactNode> = {
    'them-moi' : (props: ThemMoiHoSoProps) => ThemMoiHoSoWrapper(props),
    'chuyen-buoc-xu-ly' : (props: ChuyenBuocXuLyProps) => ChuyenBuocXuLyWrapper(props),
    'sua-ho-so' : (props: SuaHoSoProps) => SuaHoSoWrapper(props),
    'cap-nhat-ket-qua-xu-ly-ho-so': (props: CapNhatKetQuaXuLyHoSoProps) => CapNhatKetQuaXuLyHoSoWrapper(props),
    'thay-doi-truong-hop-xu-ly': (props: ThayDoiTruongHopXuLyProps) => ThayDoiTruongHopXuLyWrapper(props),
    'yeu-cau-thu-phi-le-phi-ho-so': (props: YeuCauThanhToanProps) => YeuCauThanhToanWrapper(props),
    'xoa-ho-so': (props: XoaHoSoProps) => XoaHoSoWrapper(props),
    'tra-lai-buoc-truoc': (props: TraLaiBuocTruocProps) => TraLaiBuocTruocWrapper(props),
    'chuyen-noi-bo-ho-so': (props: ChuyenNoiBoProps) => ChuyenNoiBoWrapper(props),
    'ket-thuc-ho-so': (props: KetThucProps) => KetThucWrapper(props),
    'tra-ket-qua-ho-so': (props: TraKetQuaProps) => TraKetQuaWrapper(props),
    'tra-ket-qua-ho-so-va-danh-gia-hai-long': (props: TraKetQuaVaDanhGiaHaiLongProps) => TraKetQuaVaDanhGiaHaiLongWrapper(props),
    'thu-hoi-ho-so' : (props: ThuHoiHoSoProps) => ThuHoiHoSoWrapper(props),
    'yeu-cau-mot-cua-bo-sung-ho-so': (props: YeuCauMotCuaBoSungProps) => YeuCauMotCuaBoSungWrapper(props),
    'cap-nhat-bo-sung-ho-so': (props: CapNhatBoSungHoSoProps) => CapNhatBoSungHoSoWrapper(props),
    'chuyen-buoc-nhanh-ho-so': (props: ChuyenBuocNhanhHoSoProps) => ChuyenBuocNhanhHoSoWrapper(props),
    'yeu-cau-cong-dan-bo-sung-ho-so': (props: YeuCauCongDanBoSungHoSoProps) => YeuCauCongDanBoSungHoSoWrapper(props),
    'tiep-nhan-ho-so-truc-tuyen': (props: TiepNhanHoSoTrucTuyenProps) => TiepNhanHoSoTrucTuyenWrapper(props),
    'tu-choi-tiep-nhan-ho-so-truc-tuyen': (props: TuChoiTiepNhanHoSoTrucTuyenProps) => TuChoiTiepNhanHoSoTrucTuyenWrapper(props),
    'tra-bo-sung': (props: TraBoSungProps) => TraBoSungWrapper(props),
    'hoan-thanh-bo-sung': (props: HoanThanhBoSungProps) => HoanThanhBoSungWrapper(props),
    'khong-tiep-nhan-ho-so-bo-sung-qua-han': (props: KhongTiepNhanHoSoBoSungQuaHanProps) => KhongTiepNhanHoSoBoSungQuaHanWrapper(props),
    'xac-nhan-ket-qua' : (props: XacNhanKetQuaProps) => XacNhanKetQuaWrapper(props),
    'chuyen-tra-ket-qua' : (props: ChuyenTraKetQuaHCCProps) => ChuyenTraKetQuaHCCWrapper(props),
    'lien-thong-he-thong-lltp': (props: LienThongHeThongLLTPHoSoProps) => LienThongHeThongLLTPHoSoWrapper(props),
    'tiep-nhan-ho-so-chung-thuc': (props: TiepNhanHoSoChungThucProps) => TiepNhanHoSoChungThucWrapper(props),
    'them-moi-ho-so-chung-thuc': (props: ThemMoiHoSoChungThucProps) => ThemMoiHoSoChungThucWrapper(props),
    'ky-so-chung-thuc-ho-so': (props: KySoChungThucProps) => KySoChungThucWrapper(props),
    'du-thao-bo-sung-ho-so': (props: DuThaoBoSungHoSoProps) => DuThaoBoSungHoSoWrapper(props), 
    'du-thao-tra-lai-xin-rut-ho-so': (props: DuThaoTraLaiXinRutHoSoProps) => DuThaoTraLaiXinRutHoSoWrapper(props),
    'yeu-cau-bcci-lay-ket-qua':(props: YeuCauBCCILayKetQuaModalProps) => YeuCauBCCILayKetQuaModalWrapper(props),
    'xac-nhan-va-yeu-cau-bcci-lay-ket-qua':(props: XacNhanVaYeuCauBCCILayKetQuaModalProps) => XacNhanVaYeuCauBCCILayKetQuaModalWrapper(props),
    'chuyen-phi-dia-gioi':(props: ChuyenPhiDiaGioiProps) => ChuyenPhiDiaGioiWrapper(props),
    'dong-dau-chung-thuc-ho-so': (props: DongDauProps) => DongDauWrapper(props),
    "yeu-cau-thanh-toan-chung-thuc": (props: YeuCauThanhToanChungThucProps) => YeuCauThanhToanChungThucWrapper(props),
    'dang-ky-nhan-kq-qua-bcci':(props: DangKyNhanKetQuaBCCIProps) => DangKyNhanKetQuaBCCIWrapper(props),
    'yeu-cau-thanh-toan-va-xac-nhan-kq':(props: YeuCauThanhToanVaXacNhanKqProps) => YeuCauThanhToanVaXacNhanKqWrapper(props),
}   