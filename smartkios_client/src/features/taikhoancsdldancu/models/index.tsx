import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface ILogCSDLDanCuDoanhNghiep extends IBaseExt {
   taiKhoan: string,
   donViId: string,
   thoiGian: string,
   loai: string,
}

export interface ISearchLogCSDLDanCuDoanhNghiep extends IBasePagination, IBaseSearch, IPickSearch<ILogCSDLDanCuDoanhNghiep, "donViId" | "thoiGian" | "loai" | "taiKhoan"> {
}

export interface IStatisticLogCSDLDanCuDoanhNghiep extends IBaseExt {
   soLuong: number,
   donViId: string,
   thoiGian: string,
}

export interface ISearchStatisticLogCSDLDanCuDoanhNghiep extends IBasePagination, IBaseSearch, IPickSearch<IStatisticLogCSDLDanCuDoanhNghiep, "thoiGian"> {
}