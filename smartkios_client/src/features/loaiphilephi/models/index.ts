import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface ILoaiPhiLePhi extends IBaseExt {
    ten: string,
    ma: string,
    sudung: boolean
}

export interface ISearchLoaiPhiLePhi extends IBasePagination, IBaseSearch, IPickSearch<ILoaiPhiLePhi, "ten"> {

}