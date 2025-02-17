import { IBasePagination, IBaseSearch } from "@/models";
import dayjs from "dayjs"

export interface IThongKeHoSoTrucTuyenCapTinhParams {
  maDinhDanhCha?: string;
  tuNgay?: string;
  denNgay?: string;
  catalog?: string;
}
export interface IThongKeHoSoTrucTuyenCacSoBanNganhParams {
  tuNgay?: string;
  denNgay?: string;
  maDinhDanhCha?: string;
  catalog: 'so-ban-nganh';
}
export interface IThongKeHoSoTrucTuyenCapHuyenParams {
  tuNgay?: string;
  denNgay?: string;
  maDinhDanhCha?: string;
  catalog: 'quan-huyen';
}
export interface IThongKeHoSoTrucTuyenCapXaParams {
  tuNgay?: string;
  denNgay?: string;
  maDinhDanhCha?: string;
  catalog?: string;
}

export interface IThongKeHoSoTrangChuParams {
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



