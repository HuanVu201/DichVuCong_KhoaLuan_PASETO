import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";

export interface INgayNghi extends IBaseExt {
    date: Date,
    description: string
}

export interface ISearchNgayNghi extends IBasePagination, IBaseSearch, IPickSearch<INgayNghi, "date"> {

}