import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IPhiLePhi extends IBaseExt {
    ten: string
    ma: string
    thuTucId: string
    truongHopId: string
    loai: string
    soTien: number
    donVi: string
    moTa?: string
    dinhKem?: string

}

export interface ISearchPhiLePhi extends IBasePagination, IBaseSearch, IPickSearch<IPhiLePhi, "thuTucId" | "loai" | "donVi" | "truongHopId"> {

}