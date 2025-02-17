import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../../models";
export interface IHuongDanSuDung extends IBaseExt {
    tenHuongDanSuDung : string,
    noiDungHuongDanSuDung : string | undefined,
    thuTu : number
}

export interface ISearchHuongDanSuDung extends IBasePagination, IBaseSearch, IPickSearch<IHuongDanSuDung, "tenHuongDanSuDung" | "noiDungHuongDanSuDung"> {

}