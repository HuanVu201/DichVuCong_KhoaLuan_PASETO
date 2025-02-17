import { IBaseExt, IBasePagination, IBaseSearch } from "@/models";


export interface IQuaTrinhTraoDoiCongDan extends Pick<IBaseExt, "id">{
    maHoSo : string;
    nguoiGuiTraoDoi : string;
    fullName : string;
    ngayGui : string;
    noiDungTraoDoi : string;
    email ?: boolean;
    sms ?: boolean;
    zalo ?: boolean;
}

export interface ISearchQuaTrinhTraoDoiCongDan extends IBasePagination, IBaseSearch, Pick<IQuaTrinhTraoDoiCongDan, "maHoSo"> {
    
} 