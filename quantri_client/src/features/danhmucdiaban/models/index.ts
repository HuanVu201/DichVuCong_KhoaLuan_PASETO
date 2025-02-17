import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";

export interface IDanhMucDiaBan extends IBaseExt {
    tenDiaBan: string,
    maDiaBan: string,
    active: boolean,
    thuTu: number,
    maTinh?: string,
    maHuyen?: string,
    maXa?: string
}

export interface ISearchDanhMucDiaBan extends IBasePagination, IBaseSearch, IPickSearch<IDanhMucDiaBan, "tenDiaBan" | "maDiaBan"> {
    maTinh?: string,
    Loai?: "Tinh" | "Huyen" | "Xa"
}
