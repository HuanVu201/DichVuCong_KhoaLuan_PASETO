import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface ISoLieuBaoCao extends IBaseExt {
    loaiThoiGian?: string,
    ky?: number,
    nam?: number,
    loaiThongKe: string,
    maDinhDanh?: string,
    soLieu: string,
}
export interface ICoordinates  {
    id?: string
    maDinhDanh?: string,
    groupName?: string,
    catalog?: string,
    diem766?: number,
    name?: string,
    loaiThoiGian?: string,
    ky?: number,
    nam?: number,
    coordinates?: string,
}

export interface ISearchSoLieuBaoCao extends IBasePagination, IBaseSearch, IPickSearch<ISoLieuBaoCao> {
    loaiThoiGian?: string,
    ky?: number,
    nam?: number,
    loaiThongKe?: string,
    maDinhDanh?: string,
    nhomChiTieu?: string
    getAllMonth?: boolean
    catalog?: string
}

export interface ISearchCoordinates extends IBasePagination, IBaseSearch, IPickSearch<ISoLieuBaoCao> {
    maDinhDanh?: string,
    loaiThoiGian?: string,
    ky?: number,
    nam?: number,
    getChild?: boolean
}