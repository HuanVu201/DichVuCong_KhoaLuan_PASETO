import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface INguoiDungNhomNguoiDung extends IBaseExt {
    taiKhoan?: string;
    nhomNguoiDungId?: string;
    groupCode?: string;
    groupName?: string;
    officeCode?: string;
    officeName?: string;
    fullName:string;
    userName?: string;
    userId: string;
}

export interface ISearchNguoiDungNhomNguoiDung extends IBasePagination, IBaseSearch, IPickSearch<INguoiDungNhomNguoiDung, "taiKhoan" | "nhomNguoiDungId">{
    nhomNguoiDungIds?: string[];
    tenNhomNguoiDung?: string;
    tenUser?: string;
    loaiBuoc?: string;
    userGroupCode?:string;
    userOfficeCode? : string;
    donViTiepNhan?:string;
    maDinhDanh?: string;
    orderBy?: string[];
}

export interface ISearchUserNotInNhom extends IBasePagination, IBaseSearch{
    groupCode?: string;
    nhomNguoiDungId?: string;
    chucVu?: string;
}