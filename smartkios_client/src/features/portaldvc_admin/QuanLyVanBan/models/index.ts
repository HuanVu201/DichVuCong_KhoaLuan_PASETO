import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../../models";
export interface IQuanLyVanBan extends IBaseExt {
    soKyHieu : string,
    ngaybanHanh : Date,
    loaiVanBan : string,
    thuTu : number,
    trichYeu : string,
    fileDinhKem : string,
    maLinhVuc : string,
    coQuanBanHanh : string,
    congKhai : boolean
}

export interface ISearchQuanLyVanBan extends IBasePagination, IBaseSearch, IPickSearch<IQuanLyVanBan, "maLinhVuc" | "congKhai" | "trichYeu" | "loaiVanBan"> {
    
}