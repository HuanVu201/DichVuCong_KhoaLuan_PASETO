import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";

export interface ILogThongKeDGHLCongDan extends IBaseExt {
    // id?: string,
    // createdOn?: string,
    // deletedOn?: string
    // deletedBy?: string
    donVi?: string;
    maHoSo?: string | undefined;
    ngayTao?: Date,
    nguoiDanhGia?: string | undefined,
    traLoi1?: string;
    traLoi2?: string;
    traLoi3?: string;
    traLoi4?: string;
    traLoi5?: string;
    traLoi6?: string;
    traLoi7?: string;
    traLoi8?: string;
    traLoi9?: string;
    traLoi10? : string;
    traLoi11? : string;
    hoanThanhDanhGia : boolean
    
  

}

export interface ISearchLogThongKeDGHLCongDan extends IBasePagination, IBaseSearch, IPickSearch<ILogThongKeDGHLCongDan, "maHoSo" | "ngayTao" | "donVi"> {
}
