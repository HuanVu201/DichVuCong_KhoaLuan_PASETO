import { IPhiLePhi } from '@/features/philephi/models'
import {
  IBaseExt,
  IBasePagination,
  IBaseSearch,
  IPickSearch,
} from '../../../models'
import { IThanhPhanThuTuc } from '@/features/thanhphanthutuc/models'
import { IYeuCauThanhToan } from '@/features/yeucauthanhtoan/models'
import { IThanhPhanHoSo } from '@/features/thanhphanhoso/models'

export interface IThongKeHSLT extends IBaseExt {
  groupName: string,
  groupCode: string,
  soLuongHoSoKT: string,
  soLuongHoSoKS: string,
  tongSoLuongHoSo: string,
}

export interface IThongKeTheoDoiTrangThaiXuLyHS extends IBaseExt {
  groupName: string,
  groupCode: string,
  choTiepNhanTrucTuyen: string,
  choTiepNhan: string,
  moiTiepNhan: string,
  choTiepNhanQuaBCCI: string,
  duDieuKienDaNopPhiChoTiepNhan: string,
  duDieuKienChuaNopPhiChoTiepNhan: string,
  moiTiepNhanQuaMang: string,
  moiTiepNhanQuaBCCI: string,
  moiTiepNhanTrucTuyen: string,
  dangXuLy: string,
  dungXuLy: string,
  choThucHienNghiaVuTaiChinh: string,
  choBoSung: string,
  choXacNhanKetQua: string,
  choXacNhanBoSung: string,
  choXacNhanTraLai: string,
  choTra: string,
  hoSoKhongDuocTiepNhan: string
}

export interface ITheoDoiHoSoKhongDuocTiepNhan extends IBaseExt {
  groupName: string,
  groupCode: string,
  groupOrder: string,
  maDinhDanh: string,
  hoSoKhongDuocTiepNhan: string
}

export interface IThongKeHoSoTrongNgay extends IBaseExt {
  groupName: string,
  groupCode: string,
  groupOrder: string,
  maDinhDanh: string,
  tiepNhanTrongNgay: string,
  tiepNhanTrucTiepTrongNgay: string,
  tiepNhanTrucTuyenTrongNgay: string,
  tiepNhanBCCITrongNgay: string,
  coKetQuaTrongNgay: string,
  daTraCongDanTrongNgay: string,
  thuPhiLePhiTrongNgay: string,
  yeuCauBoSungTrongNgay: string,
  yeuCauTraLaiXinRutTrongNgay: string,
}

export interface IThongKeHoSoTiepNhanBuuChinh extends IBaseExt {
  groupName: string,
  groupCode: string,
  countTiepNhanQuaBuuChinh: string,
  countBuuDienDaChuyenTraKQ: string,
  countDangKyQuaKQBuuDien: string,
  catalog: string
}

export interface IHoSo extends IBaseExt {
  id: string,
  donViPhiDiaGioi?: string;
  nguoiNhanPhiDiaGioi?: string;
  ngayGuiPhiDiaGioi?: string;
  ngayTraPhiDiaGioi?: string;
  trangThaiPhiDiaGioi?: "1" | "2" | "3",
  trangThaiSoHoa?: "1" | "2", // 1: chua; 2: da
  ids: string[],
  fullName?: string
  thuTucId?: string
  donViId: string
  linhVucId: string
  dinhKemSoHoa?: string
  maHoSo: string
  kenhThucHien: string
  loaiDoiTuong: string
  trangThaiBoSung: string
  maDoiTuong: string
  chuHoSo?: string
  soDienThoaiChuHoSo: string
  emailChuHoSo: string
  soGiayToChuHoSo: string
  loaiGiayToChuHoSo: string
  ngaySinhChuHoSo: string
  tinhThanhChuHoSo: string
  quanHuyenChuHoSo: string
  xaPhuongChuHoSo: string
  diaChiChuHoSo: string
  uyQuyen: boolean,
  hoanThanhDanhGia: boolean,
  nguoiUyQuyen?: string
  soDienThoaiNguoiUyQuyen?: string
  emailNguoiUyQuyen?: string
  soGiayToNguoiUyQuyen?: string
  loaiGiayToNguoiUyQuyen?: string
  ngaySinhNguoiUyQuyen?: string
  tinhThanhNguoiUyQuyen?: string
  quanHuyenNguoiUyQuyen?: string
  xaPhuongNguoiUyQuyen?: string
  diaChiNguoiUyQuyen?: string
  trichYeuHoSo?: string
  tinhThanhDiaBan?: string
  quanHuyenDiaBan?: string
  xaPhuongDiaBan?: string
  ngayTiepNhan?: string
  ngayHenTra?: string
  ngayLuuViTriHoSo?: string
  nguoiLuuViTriHoSo?: string
  trangThaiHoSoId: string
  ngayTra: string
  hinhThucTra: string
  ngayKetThucXuLy: string
  ghiChu: string
  noiNopHoSo: string
  hoSoCoThanhPhanSoHo: string
  taiKhoanDuocXacThucVoiVNeID: string
  duocThanhToanTrucTuyen: string
  ngayTuChoi: string
  ngayYeuCauBoSung: string
  ngayCongDanBoSung: string
  ngayHenTraCaNhan: string
  loaiDinhDanh: string
  soDinhDanh: string
  ngayNopHoSo: string,
  ngayDangKy: string,
  tenTrangThaiHoSo: string,
  tenTTHC?: string
  maTTHC: string
  maLinhVucChinh: string
  maLinhVuc: string
  tenLinhVuc: string
  tenTruongHop: string
  maTruongHop: string
  truongHopId: string
  thoiGianThucHien: number
  thoiGianThucHienHoSo: number
  loaiThoiGianThucHien: string
  thongBaoEmail: boolean
  thongBaoZalo: boolean
  thongBaoSMS: boolean
  nguoiXuLyTiep: string
  ngayXacNhanKetQua: string
  buocXuLyTiep: string
  nguoiNhanHoSo: string
  nguoiDaXuLy: string
  NguoiDangXuLy: string
  mucDo: string
  soBoHoSo: string
  tenBuocHienTai: string
  tenTruongHopThuTuc: string,
  donViChuyenXuLy?: string
  buocHienTai: string
  nguoiXuLyTruoc: string
  buocXuLyTruoc: string
  dangKyNhanHoSoQuaBCCIData?: string
  trichYeuKetQua?: string
  dinhKemKetQua?: string
  yKienNguoiChuyenXuLy?: string
  dinhKemYKienNguoiChuyenXuLy?: string
  thongTinTiepNhanBoSung: string
  hinhThucThu: string
  soTien: string
  maTrangThaiHoSo: string
  maTrangThai: string
  thanhPhanThuTucs?: IThanhPhanThuTuc[]
  phiLePhis?: IPhiLePhi[]
  yeuCauThanhToans?: IYeuCauThanhToan[]
  thanhPhanHoSos?: IThanhPhanHoSo[]
  eFormData?: string
  eForm?: string // thtt
  nguoiGui?: string // thtt
  edgeQuyTrinh?: string // thtt
  nodeQuyTrinh?: string // thtt
  nguoiTiepNhan?: string // thtt
  nguoiNopHoSo?: string // thtt
  tenDonVi?: string
  lyDoTuChoi?: string
  dinhKemTuChoi?: string
  groupName?: string
  catalog?: string
  danhGia?: string
  noiDungDanhGia?: string
  eFormKetQuaData?: string
  maDinhDanh?: string
  phi?: string
  lePhi?: string
  laHoSoChungThuc: boolean
  YeuCauBCCILayKetQua?: boolean
  maVanDonBuuDien?: string
  trangThaiThuPhi?: string;
  loaiVanBanKetQua?: string
  soKyHieuKetQua?: string
  soKyHieuHSLT?: string
  trichyeuHSLT?: string
  dinhKemHSLT?: string
  loaiKetQuaHSLT?: string
  nguoiKyKetQua?: string
  coQuanBanHanhKetQua?: string
  ngayBanHanhKetQua?: string
  ngayKyKetQua?: string,
  trangThaiPhiLePhi: boolean
  soDienThoaiDonVi?: string;
  tenDiaBan?: string;
  viTriDeHoSo?: string;
  loaiNguoiNhanKetQua?: string;
  hoTenNguoiNhanKetQua?: string;
  soDienThoaiNguoiNhanKetQua?: string;
  banGocThuLai?: string;
  soLuongBanGocThuLai?: string;
  dinhKemNhanKetQua?: string;
  chuKyNguoiNhanKetQua?: string;
  nguoiNhapDanhGiaText?: string
  //Dành cho XuatPhieuAction
  docxPhieu?: string
  pdfPhieu?: string
  urlPhieu?: string,
  urlPhoi?: string,
  idQrCode?: string
  maTinh?: string,
  tenTinh?: string,
  khongCoNgayHenTra?: boolean,
  loaiKetQua?: string,
  dinhKem?: string,
  nhanKetQuaBCCI?: boolean
  maGiayToHoSo?: string,
  thuTucKhongCoKetQua?: string
  batBuocDinhKemKetQua?: boolean,
  batBuocKySoKetQua?: boolean,
  ngayDangKyBuuDien?: string,
  ngayTraBuuDien?: string,
  lyDoBoSung?: string
  noteNgayLamViec?: string
  noteTraKetQua?: string
  loaiDuLieuKetNoi?: keyof typeof LOAIDULIEUKETNOI
}
export const LOAIDULIEUKETNOI = {
  "BaoTroXaHoi": "BaoTroXaHoi",
  "BaoTroXaHoiTinh": "BaoTroXaHoiTinh",
  "BTXHT_Convert": "BTXHT_Convert",
  "GPLX": "GPLX",
  "LTKS": "LTKS",
  "LTKT": "LTKT",
  "LTTP": "LTTP",
  "SyncGPLX": "SyncGPLX",
  "SyncGPLXBGT": "SyncGPLXBGT",
  "TBKM": "TBKM",
  "TBKMBS": "TBKMBS",
  "LLTPVneidUyQuyen": "LLTPVneidUyQuyen",
  "LLTPVneid": "LLTPVneid",
} as const

export const TRANGTHAIBOSUNG = {
  'Yêu cầu một cửa bổ sung': 'Yêu cầu một cửa bổ sung',
  'Yêu cầu công dân bổ sung': 'Yêu cầu công dân bổ sung',
  'Công dân đã gửi bổ sung': 'Công dân đã gửi bổ sung',
  'Hoàn thành bổ sung': 'Hoàn thành bổ sung',
} as const
export const TRANGTHAITHUPHI = {
  'Chờ thanh toán': 'Chờ thanh toán',
  'Chưa thanh toán': 'Chưa thanh toán',
  'Đã thanh toán': 'Đã thanh toán',
  'Hủy thanh toán': 'Hủy thanh toán',
  'Hoàn phí': 'Hoàn phí',
} as const
type KeyTrangThaiBoSung = keyof typeof TRANGTHAIBOSUNG
type KeyTrangThaiThuPhi = keyof typeof TRANGTHAITHUPHI
export interface ISearchHoSo
  extends IBasePagination,
  IBaseSearch,
  IPickSearch<IHoSo, 'tenTTHC' | 'maHoSo' | 'maTrangThai' | 'maLinhVucChinh' | 'thuTucId' | "chuHoSo" | "soDienThoaiChuHoSo" | "nguoiUyQuyen" | "soDienThoaiNguoiUyQuyen" | "trichYeuHoSo"> {
  maHoSo?: string
  trangThaiSoHoa?: "1" | "2"
  tenTTHC?: string
  tiepNhanFrom?: string,
  chuaDinhKemThanhPhan?: boolean
  hoSoTaiKhoan?: string,
  tiepNhanTo?: string
  henTraFrom?: string
  henTraTo?: string
  hoSoToiHan?: string
  ngayTraFrom?: string
  ngayTraTo?: string
  ngayGuiTo?: string
  ngayGuiFrom?: string
  byCurrentUser?: boolean
  coNgayTiepNhan?: boolean
  trangThaiHoSoId?: string,
  daKySo?: boolean,
  maTrangThai?: string
  viewHoSo?: string
  notInMaTrangThais?: string[]
  inMaTrangThais?: string[]
  nguoiDaXuLy?: string
  nguoiXuLyTruoc?: string
  nguoiXuLyTiep?: string
  kenhThucHien?: string
  notEqKenhThucHien?: string
  hinhThucTra?: string
  groupCode?: string
  groupCode2?: string
  nguoiNhanHoSo?: string
  byNguoiGui?: boolean
  trichYeuHoSo?: string
  trangThaiBoSung?: KeyTrangThaiBoSung
  nhanKetQuaBCCI?: boolean
  trangThaiThuPhi?: KeyTrangThaiThuPhi
  hinhThucThuPhi?: string
  donViYeuCauThuPhi?: string
  trangThaiTraKq?: string
  donViTraKq?: string
  laHoSoChungThuc?: boolean
  searchKeys?: string
  trangThaiChuaHoacKhongThuPhi?: boolean
  daYeuCauBCCILayKetQua?: boolean;
  canBoBCCIDaDangKy?: boolean;
  searchAllType?: boolean;
  laNguoiNhanHoSo?: boolean;
  lyDoTuChoi?: string;
  trangThaiTheoDoiHoSo?: string;
  dangKyBuuDienTuNgay?: string;
  dangKyBuuDienDenNgay?: string;
  traKqBuuDienDenNgay?: string;
  traKqBuuDienTuNgay?: string;
  nopHoSoTuNgay?: string;
  nopHoSoDenNgay?: string;
  orderBy?: string[];
  hienThiTrangThaiThanhToan?: boolean;
  donViQuanLy?: string;
  loaiKetQua?: string;
  trangThaiPhiDiaGioi?: "1" | "2" | "3" | "4",
  khongThuocTrangThaiPhiDiaGioi?: "1" | "2" | "3" | "4";
  byNguoiNhanPhiDiaGioi?: boolean;
}

export interface ISearchHoSoTraLaiXinRut
  extends IBasePagination, IBaseSearch {
  trangThaiThanhToan?: string,
  donViQuanLy?: string,
  catalog?: string,
  maDonVi?: string,
  tuNgay?: string,
  denNgay?: string,
  traLaiTuNgay?: string,
  traLaiDenNgay?: string,
  loai?: string,
  hinhThucThuPhi?: string,
  trangThaiHoSoId?: string,
  loaiDoiTuong?: string,
  yeuCauBoSungTuNgay?: string,
  yeuCauBoSungDenNgay?: string,


}
export interface ISearchHoSoChoBoSung
  extends IBasePagination, IBaseSearch {
  trangThaiThanhToan?: string,
  donViQuanLy?: string,
  catalog?: string,
  maDonVi?: string,
  tuNgay?: string,
  denNgay?: string,
  traLaiTuNgay?: string,
  traLaiDenNgay?: string


}
export interface ISearchHoSoTheoBaoCaoTongHopParams extends IBasePagination, IBaseSearch {
  tieuChi?: string;
  MaLinhVucChinh?: string,
  MaDonVi?: string,
  MaDinhDanh?: string,
  MaDinhDanhCha?: string,
  LoaiLienThong?: string,
  Groupcode?: string,
  Catalog?: string,
  TuNgay?: string,
  DenNgay?: string,
  MaTTHC?: string,
  KenhThucHien?: string,
  DaYeuCauBCCILayKetQua?: boolean,
  DangKyTraKQQuaBuuDien?: boolean,
  catalogs?: string[],
  tiepNhanFrom?: string,
  tiepNhanTo?: string,
  kenhThucHien?: string,
  nopHoSoTuNgay?: string,
  nopHoSoDenNgay?: string,
  hienThiTrangThaiThanhToan?: boolean,
  searchAllType?: boolean,
  trangThaiTheoDoiHoSo?: string,
  mucDo?: string,
  loaiDoiTuong?: string,
  tieuChiThongKeHoSoTrongNgay?: string
  hienThiTrangThaiThanhToanBaoGomNgayThuPhi?: boolean
  donViQuanLy?: string
  trangThaiHoSoId?: string
  trangThaiHoSoIds?: string[]
  loaiDuLieuKetNois?: string[]
  maTruongHop?: string,
  mucDos?: string[],
  laDuLieuThongKeCacNam?: boolean,
  maTTHC?: string,
  laHoSoTrucTuyen?: boolean
}

export interface ISearchTheoDoiHoSoChungThucParams extends IBasePagination, IBaseSearch {
  searchKeys?: string;
  maChungThuc?: string;
  soChungThuc?: string;
  loaiDoiTuong?: string;
  trangThai?: string;
  nopHoSoTuNgay?: string;
  nopHoSoDenNgay?: string;
}

export interface IXuatPhieuActionParams {
  id: string,
  maLoaiPhieu: string,
  loaiPhoi: string,
  code: string,
  tenGiayTo?: string,
  phoneNumberCurUser?: boolean
}

export interface IXuatPhieuHuongDanNopTrucTiepParams {
  maLoaiPhieu: string,
  loaiPhoi: string,
  code: string,
  tenGiayTo?: string,
  maTTHC?: string,
  maLinhVuc?: string,
}