import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IThuTucThietYeu extends IBaseExt {
    maTTHC?: string,
    tenTTHC?: string,
    linkDVC?: string,
    soThuTu?: number,
}


export interface ISearchThuTucThietYeu extends IBasePagination, IBaseSearch, IPickSearch<IThuTucThietYeu> {
    maTTHC?: string,
    tenTTHC?: string,
    linkDVC?: string,
}