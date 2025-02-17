import { IBaseExt, IBasePagination, IBaseSearch } from "@/models";

export interface IHoSoTheoTrangThaiXuLy extends IBaseExt {
  kenhThucHien?: string;
  ngayTiepNhan?: string;
  ngayHenTra?: string;
  maHoSo?: string;
  donViId?: string;
  chuHoSo?: string;
  maTTHC?: string;
  ngayTra?: string;
  linhVucChinh?: string;
  trangThaiHoSoId?: string;
  tenTrangThaiHoSo?: string;
  tenTTHC?: string;
  diaChiChuHoSo?: string;
  groupName?: string;
  nguoiXuLyQuaHans?: NguoiXuLyQuaHan[];
}
export interface NguoiXuLyQuaHan {
  tenNguoiGui: string;
  tenDonViGui: string;
}
export interface ISearchHoSoTheoTrangThaiXuLy
  extends IBasePagination,
    IBaseSearch {
  TuNgay?: string;
  DenNgay?: string;
  TrangThaiXuLy?: "daxulyquahan" | "dangxulyquahan";
  maDinhDanhCha?: string;
}
