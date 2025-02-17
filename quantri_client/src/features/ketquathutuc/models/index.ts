import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";


export interface IKetQuaThuTuc extends Pick<IBaseExt, "id"> {
    maNhanDienOCR: string;
    maKetQua: string;
    tenKetQua: string;
    tenTep: string;
    url: string;
    maTTHC: string;
    eFormKetQua: string;
    loaiThoiHan?: string;
    thoiHanMacDinh?: number;
    laGiayToThongDung?: boolean;
    dinhKemPhoi?: string;
}

export interface ISearchKetQuaThuTuc extends IBasePagination, IBaseSearch, IPickSearch<IKetQuaThuTuc, "maTTHC" | "laGiayToThongDung"> {
    maLinhVucChinh?: string
} 