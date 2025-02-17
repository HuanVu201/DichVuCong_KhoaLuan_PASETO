import { IBaseExt, IBasePagination, IPickSearch } from "@/models";
export interface IFooterPortal extends IBaseExt{
    tieuDe: string,
    noiDung: string,
    imageUrl: string
    
}

export interface ISearchFooterPortal extends IBasePagination, IPickSearch<IFooterPortal>{
    
}