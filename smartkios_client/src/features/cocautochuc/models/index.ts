import { IBaseExt, IBasePagination, IPickSearch, ISoftDelete } from "../../../models";
export interface ICoCauToChuc extends IBaseExt {
    groupCode: string
    groupName: string
    ofGroupCode: string
    ofGroupName: string
    ofGroupId: string
    groupOrder: string
    active: string
    agent: string
    description: string
    type: string
    maDinhDanh: string
    catalog?: string
    otherCatalog : string
    maNhomLienThong?: string
    diaChi?: string
    soDienThoai?:string
    thoiGianLamViec?: string
}
export type CataLog = "so-ban-nganh" | "quan-huyen" | "xa-phuong"

export interface ISearchCoCauToChuc extends IBasePagination, IPickSearch<ICoCauToChuc, "groupCode" | "groupName" | "ofGroupCode" | "active" | "type"> {
    orderBy?: string[],
    groupCode? : string,
    isRootGroupCode?: boolean;
    cataLog?: string;
    cataLogs?:string[];
    otherCataLog?: string;
    otherCataLogs?:string[];
    type?:string;
    maDinhDanh?:string;
    getAllChildren?: boolean;
    maDinhDanhCha?: string;
    
}
export interface IDeleteCoCauToChuc extends ISoftDelete {
    parentCode : string;
}