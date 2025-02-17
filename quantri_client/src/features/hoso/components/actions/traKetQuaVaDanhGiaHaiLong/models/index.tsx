import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";

export interface IPhieuKhaoSat extends IBaseExt {
    // id?: string,
    // createdOn?: string,
    // deletedOn?: string
    // deletedBy?: string
    donVi?: string;
    donViText?: string;
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
    chiSo1?: string;
    chiSo2?: string;
    chiSo3?: string;
    chiSo4?: string;
    chiSo5?: string;
    chiSo6?: string;
    chiSo7?: string;
    chiSo8?: string;
    chiSo9?: string;
    chiSo10? : string;
    chiSo11? : string;
    maHoSo?: string | undefined;
    hinhThucDanhGia?: string,
    mucDoRHL?: string,
    mucDoHL?: string,
    mucDoBT?: string,
    mucDoKHL?: string,
    mucDoRKHL?: string,
    ngayTao?: Date,
    nguoiNhapDanhGia?: string,
    nguoiNhapDanhGiaText?: string,
    loaiNhom?: string,
    phongBan?: string,
    phongBanText?: string,
    hoanThanhDanhGia? : boolean,
    tongDiem ?: string,
    quy? : string,
    nam? : string

}

export interface ISearchPhieuKhaoSat extends IBasePagination, IBaseSearch, IPickSearch<IPhieuKhaoSat, "maHoSo" | "ngayTao" | "donVi" | "quy" | "nam"> {
}

export interface ISearchBaoCao01 extends IBasePagination, IBaseSearch, IPickSearch<IPhieuKhaoSat, "maHoSo" | "ngayTao" | "donVi" | "quy" | "nam"> {
}




