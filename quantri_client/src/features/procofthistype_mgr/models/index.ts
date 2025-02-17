import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IProcOfThisType_Mgr extends IBaseExt {
  loaithutucid? : string,
  thuTucID? : string,
  thutu: number,
  tenthutuc?: string,

}

export interface ISearchProcOfThisType_Mgr extends IBasePagination, IBaseSearch, IPickSearch<IProcOfThisType_Mgr,"loaithutucid"> {
  loaithutucid? : string;
}