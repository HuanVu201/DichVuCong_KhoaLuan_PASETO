import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface ISoChungThuc extends IBaseExt {
   donVi: string,
   tenSo: string,
   soBatDau: number,
   soHienTai: number,
   ngayBatDau: Date,
   ngayDongSo: Date,
   trangThai: boolean,
   loai?: SOCHUNGTHUC_LOAI_TYPE;
}

export interface ISearchSoChungThuc extends IBasePagination, IBaseSearch, IPickSearch<ISoChungThuc, "tenSo" | "donVi" | "trangThai" > {
}

export const SOCHUNGTHUC_LOAI = {
   "Giấy" : "Giấy",
   "Điện tử" : "Điện tử",
} as const

export type SOCHUNGTHUC_LOAI_TYPE = keyof typeof SOCHUNGTHUC_LOAI