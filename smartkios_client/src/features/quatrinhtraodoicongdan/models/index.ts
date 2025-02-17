import { IBaseExt, IBasePagination, IBaseSearch } from "@/models";


export interface IQuaTrinhTraoDoiCongDan extends Pick<IBaseExt, "id">{
    maHoSo : string;
    nguoiGuiTraoDoi : string;
    ngayGui : string;
    noiDungTraoDoi : string;
    email ?: boolean;
    sMS ?: boolean;
    zalo ?: boolean;
}

export interface ISearchQuaTrinhTraoDoiCongDan extends IBasePagination, IBaseSearch, Pick<IQuaTrinhTraoDoiCongDan, "maHoSo"> {
    
} 