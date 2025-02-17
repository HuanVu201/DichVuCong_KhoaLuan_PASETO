import { IBaseExt, IBasePagination, IPickSearch } from "../../../../models";
export interface IKieuNoiDung extends IBaseExt {
    tenNoiDung ?: string,
    choPhepNhapNoiDung : boolean,
    choPhepNhapLoaiLienKet : boolean
}

export interface ISearchKieuNoiDung extends IBasePagination, IPickSearch<IKieuNoiDung, "tenNoiDung"> {

}