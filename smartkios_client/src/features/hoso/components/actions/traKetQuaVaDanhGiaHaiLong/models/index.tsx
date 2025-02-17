import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";

export interface IPhieuKhaoSat extends IBaseExt {
    donVi: string;
    donViText: string;
    traLoi1: string;
    traLoi2: string;
    traLoi3: string;
    traLoi4: string;
    traLoi5: string;
    traLoi6: string;
    traLoi7: string;
    traLoi8: string;
    traLoi9: string;
    maHoSo: string | undefined;
    hinhThucDanhGia: string,
    mucDoRHL: string,
    mucDoHL: string,
    mucDoBT: string,
    mucDoKHL: string,
    mucDoRKHL: string,
    ngayTao: Date,
    nguoiNhapDanhGia: string,
    nguoiNhapDanhGiaText: string,
    loaiNhom: string,
    phongBan: string,
    phongBanText: string,
    hoanThanhDanhGia : boolean,
    tongDiem : string

}

export interface ISearchPhieuKhaoSat extends IBasePagination, IBaseSearch, IPickSearch<IPhieuKhaoSat, "maHoSo" | "ngayTao" | "donVi"> {
}
