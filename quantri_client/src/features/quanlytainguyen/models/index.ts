import { IBaseExt, IBasePagination, IBaseSearch } from "@/models";

export interface IQuanLyTaiNguyen extends IBaseExt {
    dinhKem : string;
    ten : string;
    mota : string;
    public : boolean | undefined;
    suDung : boolean 
    kichThuocTep : number
}

export interface ISearchQuanLyTaiNguyen extends IBasePagination, Partial<Pick<IQuanLyTaiNguyen, "ten" | "suDung" | "public" | "dinhKem" >>{
    user ?: string;
}