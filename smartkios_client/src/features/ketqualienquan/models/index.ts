import { IBaseExt, IBasePagination, IBaseSearch } from "@/models";

export interface IKetQuaLienQuan extends Pick<IBaseExt, "id"> {
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
}

export interface ISearchKetQuaLienQuan extends IBasePagination, Partial<Pick<IKetQuaLienQuan, "maHoSo" | "nguoiKy">>{

}