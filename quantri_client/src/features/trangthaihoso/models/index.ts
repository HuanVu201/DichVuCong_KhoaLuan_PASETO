import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface ITrangThaiHoSo extends IBaseExt {
    ten: string;
    ma?: string;
    moTa?: string;
    laTrangThaiQuyTrinh?: boolean;
}

export interface ISearchTrangThaiHoSo extends IBasePagination, IBaseSearch, IPickSearch<ITrangThaiHoSo, "ten">{
    
}