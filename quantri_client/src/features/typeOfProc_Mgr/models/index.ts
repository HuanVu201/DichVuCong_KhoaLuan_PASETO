import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface ITypeOfProc_Mgr extends IBaseExt {
  nhomthutucid? : string,
  ten : string,
  mota:string ,
  thutu : number,

}

export interface ISearchTypeOfProc_Mgr extends IBasePagination, IBaseSearch, IPickSearch<ITypeOfProc_Mgr,"nhomthutucid"> {
  nhomthutucid? : string;
}