import { IBaseExt, IBasePagination, IPickSearch } from "../../../models";
export interface IBuocXuLy extends IBaseExt {
    tenBuoc : string
}

export interface ISearchBuocXuLy extends IBasePagination, IPickSearch<IBuocXuLy, "tenBuoc"> {

}