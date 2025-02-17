import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from '@/models'

export interface IGiayToSoHoaChiaSe extends IBaseExt {
    soDinhDanh: string,
    giayToSoHoaId: string,
    maDinhDanhChiaSe?: string,
}

export interface ISearchGiayToSoHoaChiaSe extends IBasePagination, IBaseSearch, IPickSearch<IGiayToSoHoaChiaSe> {
    soDinhDanh?: string,
    giayToSoHoaId?: string,
    maDinhDanhChiaSe?: string,
}