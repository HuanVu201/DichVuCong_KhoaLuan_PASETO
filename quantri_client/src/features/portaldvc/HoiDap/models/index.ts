import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../../models";
export interface IHoiDap extends IBaseExt {
    hoTen: string,
    email: string,
    soDienThoai : string,
    ma : string,
    tieuDe : string,
    noiDung : string,
    diaChi : string,
    ngayGui : Date,
    traLoi : string,
    nguoiTraLoi : string,
    congKhai : string,
    dinhKem : string,
    maDonVi : string,
    trangThai : string,
    tieuDeTraLoi: string,
    noiDungTraLoi: string,
}

export interface ISearchHoiDap extends IBasePagination, IBaseSearch, IPickSearch<IHoiDap, "maDonVi" | "noiDung"> {

}