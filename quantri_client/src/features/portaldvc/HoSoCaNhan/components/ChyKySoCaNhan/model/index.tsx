import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from '@/models'

export interface IChuKySoCaNhan extends IBaseExt {
    userName: string,
    hinhAnh: string,
    moTa?: string,
    thoiGianTao?: string,
    thoiGianThayDoi?: string,
}