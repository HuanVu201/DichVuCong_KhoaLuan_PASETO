import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../../models";
export interface IDSTaiLieuHDSD extends IBaseExt {
    tenTaiLieu : string | undefined,
    thuTu : number,
    tepDinhKem : string,
    moTa : string,
    ngayDang : Date,

}

export interface ISearchDSTaiLieuHDSD extends IBasePagination, IBaseSearch, IPickSearch<IDSTaiLieuHDSD, "tenTaiLieu"> {

}