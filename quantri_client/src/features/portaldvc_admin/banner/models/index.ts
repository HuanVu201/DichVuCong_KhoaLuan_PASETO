import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../../models";
export interface IBanner extends IBaseExt {
    imageUrl: string,
    suDung: boolean
}

export interface ISearchBanner extends IBasePagination, IBaseSearch, IPickSearch<IBanner, "imageUrl" | "suDung"> {

}