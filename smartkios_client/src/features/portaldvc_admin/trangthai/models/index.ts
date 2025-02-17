import { IBaseExt, IBasePagination, IPickSearch, IBaseSearch } from "../../../../models";
export interface ITrangThai extends IBaseExt {
    tenTrangThai: string
    thuTu: number
    hienThiTrangChu: boolean
}

export interface ISearchTrangThai extends IBasePagination, IBaseSearch, IPickSearch<ITrangThai, "tenTrangThai"> {

}