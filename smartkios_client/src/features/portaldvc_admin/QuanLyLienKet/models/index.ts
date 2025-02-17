import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../../models";
export interface IQuanLyLienKet extends IBaseExt {
    ten: string,
    ma: string,
    linkLienKet: string,
    suDung: boolean,
    thuTu : number
}

export interface ISearchQuanLyLienKet extends IBasePagination, IBaseSearch, IPickSearch<IQuanLyLienKet, "ten" | "suDung"> {

}