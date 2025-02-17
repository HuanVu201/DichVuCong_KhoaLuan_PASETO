import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface ISoChungThuc extends IBaseExt {
   donVi: string,
   tenSo: string,
   catalog: string,
   soBatDau: number,
   soHienTai: number,
   ngayBatDau: Date,
   ngayDongSo: Date,
   trangThai: boolean,
   loai?: SOCHUNGTHUC_LOAI_TYPE;

   groupName: string;
}

export interface IThongKeHoSoChungThuc  {
   kySoDienTu ?: boolean
   tongSoHoSo ?: string,
   banGiay ?: string,
   banDienTu ?: string,
   donViId ?: string,
   tenDonVi ?: string
   maDinhDanh ? : string
   maDinhDanhCha ? : string
   type ? : string
   tuNgay ? : string
   denNgay ? : string
}

export interface IThongKeHoSoChungThucChiTiet extends IBaseExt  {
   maHoSo ?: string
   so ?: string,
   ngayChungThuc ?: string,
   chuHoSo   ?: string,
   tenGiayTo ?: string,
   nguoiChungThuc ?: string
   ten ? : string,
   soTrang ? : string,
   tuNgay ? : string
   denNgay ? : string
}

export interface ISearchThongKeHoSoChungThuc extends IBasePagination, IBaseSearch, IPickSearch<IThongKeHoSoChungThuc, "maDinhDanhCha" | "donViId" | "maDinhDanh" | "kySoDienTu" | "type" | "denNgay" | "tuNgay" >{
    
}


export interface ISearchSoChungThuc extends IPickSearch<ISoChungThuc, "tenSo" | "donVi" | "trangThai" > {
   searchByOpening?: boolean
}

export const SOCHUNGTHUC_LOAI = {
   "Giấy" : "Giấy",
   "Điện tử" : "Điện tử",
} as const

export type SOCHUNGTHUC_LOAI_TYPE = keyof typeof SOCHUNGTHUC_LOAI