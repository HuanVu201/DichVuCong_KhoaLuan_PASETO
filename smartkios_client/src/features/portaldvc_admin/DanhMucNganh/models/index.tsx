import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../../models";

export interface IDanhMucNganh extends IBaseExt {
    tenDanhMuc: string,
    code: string,
    active: boolean,
    // type: "quoc-tich" | "dan-toc" | "hoc-van" | "chuc-vu" | "hoc-vi" | "lanh-dao" | "nghe-nghiep" | "ton-giao" | "Nganh-nghi",
    type: "danh-muc-nganh",
    thuTu: number,
}

export interface ISearchDanhMucNganh extends IBasePagination, IBaseSearch, IPickSearch<IDanhMucNganh, "tenDanhMuc" | "type"> {

}