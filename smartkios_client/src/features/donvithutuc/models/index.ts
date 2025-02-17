import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";

export interface IDonViThuTuc extends IBaseExt {
    maTTHC: string;
    donViId: string;
    catalog: string;
    groupName: string;
    nguoiTiepNhanId: string;
    mucDo : string;
    tKThuHuong : string;
    maNHThuHuong : string;
    tenTKThuHuong : string;
    urlRedirect : string;
    maSoThue : string;  
    donViMaSoThue : string;
}
export interface IAddMultiDonViThuTuc {
    idDonVis: string[];
    maTTHCs: string[];
    mucDo? : string;
    nguoiTiepNhanId?: string;
    nhomNguoiDungs?: string[];
    urlRedirect?: string;
    maSoThue?: string;
    donViMaSoThue?: string;
    taiKhoanThuHuongId?: string;
}
export interface ISearchDonViThuTuc extends IBasePagination, IBaseSearch, IPickSearch<IDonViThuTuc, "maTTHC" | "donViId">{
    
}
export interface IUpdateMultiDonViThuTuc {
    Ids: string[];
    NguoiTiepNhanId?: string;
    MucDo?: string;
    TaiKhoanThuHuongId?: string;

}
export interface IDeleteMultiDonViThuTuc {
    Ids: string[];
    ForceDelete: boolean;

}