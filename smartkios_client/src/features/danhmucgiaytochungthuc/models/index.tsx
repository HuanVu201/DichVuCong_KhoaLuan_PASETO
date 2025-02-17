import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IDanhMucGiayToChungThuc extends IBaseExt {
   ten: string;
   ma: string;
   suDung: boolean
}

export interface ISearchDanhMucGiayToChungThuc extends IPickSearch<IDanhMucGiayToChungThuc, "ten" | "ma" | "suDung" > {
}
