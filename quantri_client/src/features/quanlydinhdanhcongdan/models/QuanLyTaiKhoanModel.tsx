import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";

export interface IQuanLyTaiKhoanDinhDanh extends IBaseExt {
  fullName?: string;
  userName?: string;
  soDinhDanh?: string;
  email?: string;
  phoneNumber?: string;
  gioiTinh?: string;
  ngayThangNamSinh?: string;
  typeUser?: string;
  suDungKhoTaiLieuDienTu?: boolean

  namChuaDinhDanh?: string;
  namDaDinhDanh?: string;
  nuChuaDinhDanh?: string;
  nuDaDinhDanh?: string;
  lockoutEnabled?: boolean;
}


export interface IExportThongKeParams  {
  daDinhDanh?: boolean
  doTuoi?: string;
  doiTuong?: string;
  gioiTinh?: string;
  pageSize?: number;
  pageNumber?: number;
}


export interface ISearchQuanLyTaiKhoanDinhDanhParams extends IBasePagination, IBaseSearch, IPickSearch<IQuanLyTaiKhoanDinhDanh> {
  fullName?: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  doTuoi?: string;
  gioiTinh?: string;
  doiTuong?: string;
  daDinhDanh?: boolean
  tuNgay?: string;
  denNgay?: string;
  // typeUser?: 'CongDan'
}

export interface ISearchThongKeTaiKhoanDinhDanhParams extends IBasePagination, IBaseSearch, IPickSearch<IQuanLyTaiKhoanDinhDanh> {
  gioiTinh?: string;
  doTuoi?: string;
}