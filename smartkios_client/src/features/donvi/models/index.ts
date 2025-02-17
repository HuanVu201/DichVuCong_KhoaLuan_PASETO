import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";

export interface IDonVi extends IBaseExt {
    index?: number
    maTTHC?: string,
    tenTTHC?: string,
    groupName?: string,
    donViId?: string,
    nguoiTiepNhanId: string,
    mucDo? : string,
    urlRedirect? : string,
    maSoThue? : string,  
    donViMaSoThue? : string
    taiKhoanThuHuongId? : string;
    nguoiTiepNhan?: {id: string, userName:string}[];
    tenTaiKhoanThuHuong?: string;
    children? : IDonVi[]
    
}

export interface ISearchDonVi extends IBasePagination, IBaseSearch, IPickSearch<IDonVi, "maTTHC" | "donViId" | "taiKhoanThuHuongId">{
    type?: string;
    catalog?: string;
    otherCatalog? : string;
    Removed?: boolean;
}