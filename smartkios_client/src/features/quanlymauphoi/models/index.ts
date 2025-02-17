import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IMauPhoi extends IBaseExt {
    loaiPhoi: string,
    tenMauPhoi: string,
    maDonVi: any,
    maLinhVuc?: string,
    maThuTuc?: string,
}

export interface ISearchMauPhoi extends IBasePagination, IBaseSearch, IPickSearch<IMauPhoi>{
    loaiPhoi?: string,
    tenMauPhoi?: string,
    maDoni?: string,
    maLinhVuc?: string,
    maThuTuc?: string
}