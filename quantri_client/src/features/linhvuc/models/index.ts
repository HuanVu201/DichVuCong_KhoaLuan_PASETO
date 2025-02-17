import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface ILinhVuc extends IBaseExt {
    ten: string,
    ma: string,
    maNganh: string,
    soLuongThuTuc: number,
    soLuongThuTucCapTinh: number,
    soLuongThuTucCapHuyen: number,
    soLuongThuTucCapXa: number,
    suDung?: boolean
}

export interface ISearchLinhVuc extends IBasePagination, IBaseSearch, IPickSearch<ILinhVuc, "ma" | "maNganh" | "ten"> {
    hasThuTuc?: boolean
    hasThuTucCapTinh?: boolean
    hasThuTucCapHuyen?: boolean
    hasThuTucCapXa?: boolean
    maLinhVuc?: string;
    maTTHC?: string;
    tuKhoa?: string;
    laTTHCTrucTuyen?: boolean;
    donViId?: string;
    mucDo?: string;
    doiTuongThucHien?: string;
    thucHienTaiBoPhanMotCua?: boolean
}