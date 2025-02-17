import { IBasePagination, IBaseSearch } from "@/models";
import dayjs from "dayjs"

export interface IThongKeHoSoTrucTuyenCapTinhParams {
  maDinhDanhCha?: string;
  tuNgay?: string;
  denNgay?: string;
  catalog?: string;
  laDuLieuThongKeCacNam?: boolean;
}
export interface IThongKeHoSoTrucTuyenTheoThuTucParams {
  maDinhDanhCha?: string;
  tuNgay?: string;
  denNgay?: string;
  catalog?: string;
  coPhatSinhHoSo?: boolean;
  maDinhDanh?: string;
  linhVucId?: string;
  laDuLieuThongKeCacNam?: boolean
}
export interface IThongKeHoSoTrucTuyenCacSoBanNganhParams {
  tuNgay?: string;
  denNgay?: string;
  maDinhDanhCha?: string;
  catalogs: ["so-ban-nganh", "cnvpdk"],
  laDuLieuThongKeCacNam?: boolean
}
export interface IThongKeHoSoTrucTuyenCapHuyenParams {
  tuNgay?: string;
  denNgay?: string;
  maDinhDanhCha?: string;
  catalog?: string;
  maDinhDanh?: string;
  chiBaoGomDonViCon?: boolean;
  laDuLieuThongKeCacNam?: boolean
}
export interface IThongKeHoSoTrucTuyenCapXaParams {
  tuNgay?: string;
  denNgay?: string;
  maDinhDanhCha?: string;
  catalog?: string;
  laDuLieuThongKeCacNam?: boolean
}

export interface IThongKeHoSoTrangChuParams {
  tuNgay: string;
  denNgay: string;
  cache?: number
}
export interface IThongKeTyLeXuLyDungHanParams {
  maDinhDanh?: string
  type?: number
  tuNgay: string;
  denNgay: string;
  cache?: number
}

export interface IThongKeHoSoDaCoKetQuaParams extends IBaseSearch, IBasePagination {
  cache?: number
}

export interface IThongKeHoSoTheoKyParams extends IBaseSearch, IBasePagination {
  tuNgay: string;
  denNgay: string;
  year?: number;
}

export interface INhacViecPortal {
  nguoiGui: boolean
}




