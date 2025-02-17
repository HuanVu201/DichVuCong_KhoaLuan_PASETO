import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";

export const MENUMODULES = {
    "dvc": "Hệ thống một cửa điện tử",
    "portaldvc_admin": "Quản trị cổng DVC",
    "admin": "Quản trị hệ thống",
    "admin_tthc": "Quản trị kết quả TTHC điện tử",
} as const

export type MENUMODULE = keyof typeof MENUMODULES

export interface IMenuKetQuaThuTuc extends IBaseExt{
    tenMenu: string;
    parentId?: string;
    thuTuMenu: number;
    active?: boolean;
    maDonVi?: string;
    iconName?: string;
    maTTHC: string;
    queryStringParams: string;
    tenDonVi?: string;
    catalog?: string;
    maKetQuaTTHC?: string;
}

export interface ISearchMenuKetQuaThuTuc extends IBasePagination, IPickSearch<IMenuKetQuaThuTuc, "tenMenu" | "maTTHC" | "catalog">{
    isRoot?:boolean;
}