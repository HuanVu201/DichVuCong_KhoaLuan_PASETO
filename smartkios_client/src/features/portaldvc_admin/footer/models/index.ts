import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../../models";
export interface IFooter extends IBaseExt {
    imageUrl: string,
    noiDung: string,
    tieuDe : string
}

export interface ISearchFooter extends IBasePagination, IBaseSearch, IPickSearch<IFooter, "tieuDe" | "noiDung"> {

}