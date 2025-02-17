import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IProcGroup_Mgr extends IBaseExt {
    ten: string,
    moTa: string,
    icon: string,
    mauSac: number,
    doiTuong: number,
    thuTu: number,

}

export interface ISearchProcGroup_Mgr extends IBasePagination, IBaseSearch, IPickSearch<IProcGroup_Mgr,"ten"> {
  

}