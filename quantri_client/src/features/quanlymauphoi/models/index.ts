import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IMauPhoi extends IBaseExt {
    loaiPhoi: string,
    code: string,
    tenMauPhoi: string,
    maDonVi?: any,
    maLinhVuc?: any,
    maThuTuc?: any,
    urlMauPhoi?: string,
    htmlPhoi?: string,
    laPhoiEmail?: boolean,
    laPhoiMacDinh?: boolean,
    customerId?: string

}

export interface IGetUrlPhoi {
    loaiPhoi?: string,
    code?: string,
    maDonVi?: any,
    maLinhVuc?: any,
    maThuTuc?: any,
}

export interface ISearchMauPhoi extends IBasePagination, IBaseSearch, IPickSearch<IMauPhoi> {
    loaiPhoi?: string,
    code?: string,
    tenMauPhoi?: string,
    maDonVi?: string,
    maLinhVuc?: string,
    maThuTuc?: string
    laPhoiEmail?: boolean,
    laPhoiMacDinh?: boolean
    customerId?: string

}