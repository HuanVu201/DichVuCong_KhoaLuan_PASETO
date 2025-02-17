import { IBaseExt, IBasePagination, IPickSearch } from "@/models";
export interface IBannerPortal extends IBaseExt{
    imageUrl: string,
    suDung: boolean
    
}

export interface ISearchBannerPortal extends IBasePagination, IPickSearch<IBannerPortal>{
    
}