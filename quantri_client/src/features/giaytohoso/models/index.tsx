import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IGiayToHoSo extends IBaseExt {
    maHoSo?: string;
    loaiGiayTo?: string;
    nguoiXuatPhieu?: string;
    ngayXuatPhieu?: string;
    suDung?: boolean;
    maGiayTo?: string;
    docxPhieu?: string;
    pdfPhieu: string;
    hinhAnhChuKyCongDan?: string;
    ngayKySo?: string;
    nguoiKySo?: string;
    ngayGuiCongDan?: string;
    trangThaiGuiCongDan?: string;
    nguoiGuiCongDan?: string;
}

export interface ISearchGiayToHoSo extends IBasePagination, IBaseSearch, IPickSearch<IGiayToHoSo, "suDung" | "maGiayTo"> {
    maGiayTo?: string;
    suDung?: boolean;
}

export interface IGiayToHoSoParams {
    maHoSo?: string;
    loaiGiayTo?: string;
    nguoiXuatPhieu?: string;
    ngayXuatPhieu?: string;
    suDung?: boolean;
    maGiayTo?: string;
    blob?: string;
    pdfPhieu?: string;
    hinhAnhChuKyCongDan?: string;
    ngayKySo?: string;
    nguoiKySo?: string;
    ngayGuiCongDan?: string;
    trangThaiGuiCongDan?: string;
    nguoiGuiCongDan?: string;
}