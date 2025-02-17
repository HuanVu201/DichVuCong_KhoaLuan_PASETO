import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from '@/models'

export interface IPhienBanGiayToSoHoaKhoTaiLieuDienTu extends IBaseExt {
    soDinhDanh: string,
    khoTaiLieuDienTuId: string,
    maHoSo?: string,
    dinhKem?: string,
    maGiayTo?: string,
    dungLuong?: number,
    tenKhoTaiLieu?: string,
    lastModifiedOn?: string

}

export interface ISearchPhienBanGiayToSoHoaKhoTaiLieuDienTu extends IBasePagination, IBaseSearch, IPickSearch<IPhienBanGiayToSoHoaKhoTaiLieuDienTu> {
    soDinhDanh: string,
    khoTaiLieuDienTuId: string,
    maHoSo?: string,
    dinhKem?: string,
    maGiayTo?: string,
}