import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IThanhPhanHoSo extends IBaseExt {
    ten: string;
    ma: string;
    hoSo: string;
    soBanChinh: number;
    soBanSao: number;
    kyDienTu: number;
    maGiayToKhoQuocGia: string;
    dinhKem: string;
    nhanBanGiay: boolean;
    maGiayToSoHoa: string;
    trangThaiSoHoa: string;
    maGiayTo: string;
    duocLayTuKhoDMQuocGia: string;
    maKetQuaThayThe: string;
    dinhKemBoSung: string;
    noiDungBoSung: string;
    soTrang?: number;
    soBanGiay?: number;
    kyDienTuBanGiay?: boolean;
    daChungThucDienTu?: boolean;
    soChungThucDienTu?: number;
    soChungThucDT?: string;
    soChungThucGiay?: number;
    soChungThucG?: string;
    trangThaiDuyet?: THANHPHANHOSO_TRANGTHAIDUYET_TYPE;

    tongTien?: number
    tenGiayTo?: string;
    dinhKemGoc?: string;
}

export interface ISearchThanhPhanHoSo extends IPickSearch<IThanhPhanHoSo, "hoSo" | "ten" | "maGiayToKhoQuocGia"> {

}

export const THANHPHANHOSO_TRANGTHAIDUYET = {
    "Đã ký": "Đã ký",
    "Chưa ký": "Chưa ký",
} as const

export type THANHPHANHOSO_TRANGTHAIDUYET_TYPE = keyof typeof THANHPHANHOSO_TRANGTHAIDUYET