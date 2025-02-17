import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IThayDoiMucDoThuTuc extends IBaseExt {
   thuTuc : string,
   donVi : string,
   thoiGian : Date,
   mucDoCu : string,
   mucDoMoi : string,
   nguoiCapNhat : string
}

export interface ISearchThayDoiMucDoThuTuc extends IBasePagination, IBaseSearch, IPickSearch<IThayDoiMucDoThuTuc,"thuTuc" | "donVi" | "mucDoCu" | "mucDoMoi"> {

}