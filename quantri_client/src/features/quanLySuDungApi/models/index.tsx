import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IApiChiaSe extends IBaseExt {
    maApiChiaSe?: string,
    tenApiChiaSe?: string,
    noiDung?: string,
    gioiHan?: number,
    duongDan?: string,
    ngayGoi?: string,
    soLuotGoiTrongNgay?: number,
    ip?: string,
}


export interface ISearchApiChiaSe extends IBasePagination, IBaseSearch {
    id?: string,
    maApiChiaSe?: string,
    tenApiChiaSe?: string,
    noiDung?: string,
    duongDan?: string,
    tuNgay?: string,
    denNgay?: string,
}