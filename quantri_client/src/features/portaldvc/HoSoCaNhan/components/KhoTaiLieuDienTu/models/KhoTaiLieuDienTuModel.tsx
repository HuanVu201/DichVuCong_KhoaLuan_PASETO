import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from '@/models'

export interface IKhoTaiLieuDienTu extends IBaseExt {
    soDinhDanh: string,
    tenKhoTaiLieu: string,
    moTa?: string,
    dungLuong?: number,
    soLuong?: number,
}

export interface ISearchKhoTaiLieuDienTu extends IBasePagination, IBaseSearch, IPickSearch<IKhoTaiLieuDienTu> {
    soDinhDanh?: string,
    tenKhoTaiLieu?: string,
    moTa?: string,
}