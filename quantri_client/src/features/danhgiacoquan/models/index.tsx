import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";

export interface IDanhGiaCoQuan extends IBaseExt {
    donVi: string;
    donViText: string;
    groupName: string;
    maNhomCha: number;
    maNhomChaText: boolean;
    dongBo: boolean;
    quy: string;
    nam: string;
    traLoi1: string;
    traLoi2: string;
    traLoi3: string;
    traLoi4: string;
    traLoi5: string;
    traLoi6: string;
    traLoi7: string;
    traLoi8: string;
    traLoi9: string;
    traLoi10: string;
    traLoi11: string;
    soPhieu: string;
    tongDiem: string;
    phongBan: string;
    lyDoTruDiem: string;
    maHoSo: string;
    hinhThucDanhGia: string;
    mucDoRHL: string;
    mucDoHL: string;
    mucDoBT: string;
    mucDoKHL: string;
    mucDoRKHL: string;
    thamDinhTraLoi1: string;
    thamDinhTraLoi2: string;
    thamDinhTraLoi3: string;
    thamDinhTraLoi4: string;
    thamDinhTraLoi5: string;
    thamDinhTraLoi6: string;
    thamDinhTraLoi7: string;
    thamDinhTraLoi8: string;
    thamDinhTraLoi9: string;
    thamDinhTraLoi10: string;
    thamDinhTraLoi11: string;
    xepLoai: string;
    xepHang: string;
    tongDonViCon: boolean;
    khlChiSo10 : string,
    hlChiSo10 : string,
    rhlChiSo10 : string,
    khlChiSo11 : string,
    hlChiSo11 : string,
    rhlChiSo11 : string,
    layDonViCon : boolean
    maDinhDanhCha : string,
    maDinhDanh : string,
}

export interface ISearchDanhGiaCoQuan extends IBasePagination, IBaseSearch, IPickSearch<IDanhGiaCoQuan, "nam" | "quy" | "donVi" | "layDonViCon" | 'maDinhDanh' | 'maDinhDanhCha' > {
}
