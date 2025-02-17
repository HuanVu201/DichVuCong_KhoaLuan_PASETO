import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../../models";
export interface IPhanAnhKienNghi extends IBaseExt {
    userId: string,
    hoTen: string,
    email: string,
    soDienThoai : string,
    diaChi : string,
    tieuDe : string,
    noiDung : string,
    ngayGui : string,
    trangThai : string,
    nguoiTraLoi : string,
    noiDungTraLoi: string,
    congKhai : string,
}

export interface ISearchPhanAnhKienNghi extends IBasePagination, IBaseSearch, IPickSearch<IPhanAnhKienNghi, "tieuDe" | "noiDung" | "trangThai"> {

}