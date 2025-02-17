import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface ILoaiGiayToKhoLuuTru extends IBaseExt {
    ma?: string,
    ten?: string,
    eform?: string,
    suDung?: boolean,
    lastModifiedOn?: string,
}

export interface ISearchLoaiGiayToKhoLuuTru extends IBasePagination, IBaseSearch, IPickSearch<ILoaiGiayToKhoLuuTru> {
    ma?: string,
    ten?: string,
    eform?: string,
    suDung?: boolean,
    orderByReq?: string
}