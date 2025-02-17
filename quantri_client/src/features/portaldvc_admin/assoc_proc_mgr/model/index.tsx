import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IAssor_Proc_Mgr extends IBaseExt {
    thuTu?: number,
    thuTucId?: string,
    thuTucLienQuanId?: string,
    tenThuTuc: string,
    tenThuTucLienQuan: string,
}


export interface ISearchAssor_Proc_Mgr extends IBasePagination, IBaseSearch, IPickSearch<IAssor_Proc_Mgr> {

}