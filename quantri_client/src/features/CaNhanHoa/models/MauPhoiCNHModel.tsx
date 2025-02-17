import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IMauPhoiCNH extends IBaseExt {
    loaiPhoi: string,
    tenMauPhoi: string,
    maDonVi: any,
    maLinhVuc?: any,
    maThuTuc?: any,
    urlMauPhoi?: string,
    htmlPhoi?: string,
    laPhoiEmail?: boolean,
    laPhoiMacDinh?: boolean,
    customerId?: string

}

export interface ISearchMauPhoiCNH extends IBasePagination, IBaseSearch, IPickSearch<IMauPhoiCNH> {
    loaiPhoi?: string,
    tenMauPhoi?: string,
    maDonVi?: string,
    maLinhVuc?: string,
    maThuTuc?: string
    laPhoiEmail?: boolean,
    laPhoiMacDinh?: boolean
    customerId?: string
}