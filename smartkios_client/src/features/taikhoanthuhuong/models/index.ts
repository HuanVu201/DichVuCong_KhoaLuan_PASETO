import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface ITaiKhoanThuHuong extends IBaseExt {
   tkThuHuong : string,
   maNHThuHuong : string,
   tenTKThuHuong : string,
   moTa : string,
   donViId : string
}

export interface ISearchTaiKhoanThuHuong extends IBasePagination, IBaseSearch, IPickSearch<ITaiKhoanThuHuong,"maNHThuHuong" | "donViId" | "tenTKThuHuong"> {

}