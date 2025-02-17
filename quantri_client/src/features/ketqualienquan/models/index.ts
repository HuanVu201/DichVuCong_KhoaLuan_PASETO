import { IBaseExt, IBasePagination, IBaseSearch } from "@/models";

export interface IKetQuaLienQuan extends IBaseExt {
    maHoSo: string;
    loaiKetQua?: string;
    soKyHieu?: string;
    trichYeu?: string;
    ngayKy?: string;
    nguoiKy: string;
    ngayCoHieuLuc?: string;
    ngayHetHieuLuc?: string;
    trangThai?: string;
    coQuanBanHanh?: string;
    dinhKem?: string;
    suDung: boolean;
}

export interface ISearchKetQuaLienQuan extends IBasePagination, Partial<Pick<IKetQuaLienQuan, "maHoSo" | "nguoiKy">>{

}