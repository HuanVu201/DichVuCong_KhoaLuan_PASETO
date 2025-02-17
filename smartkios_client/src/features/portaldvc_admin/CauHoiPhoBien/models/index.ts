import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../../models";
export interface ICauHoiPhoBien extends IBaseExt {
    tieuDe : string,
    noiDungCauHoi : string | undefined,
    noiDungTraLoi : string | undefined,
    type : string
    
}

export interface ISearchCauHoiPhoBien extends IBasePagination, IBaseSearch, IPickSearch<ICauHoiPhoBien, "type" | "noiDungCauHoi"> {

}