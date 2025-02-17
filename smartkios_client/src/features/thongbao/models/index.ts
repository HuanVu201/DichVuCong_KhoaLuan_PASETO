import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";

export interface IThongBao extends IBaseExt {
    tieuDe: string,
    noiDung: string,
    tepDinhKem: string,
    donViId: string,
    toanHeThong: boolean,
    quanTrong: boolean,
    suDung: boolean,

}

export interface ISearchThongBao extends IBasePagination, IBaseSearch, IPickSearch<IThongBao, "donViId"> {

}