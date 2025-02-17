import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
import { get } from "http";
export interface IDuThaoXuLyHoSo extends IBaseExt{

    hoSoId: string;
    maHoSo: string;
    loai: string;
    nguoiXuLy: string;
    trichYeu?: string;
    // createdBy?: string;
    trangThai: string;
    trangThaiLienThongQLVB?: string;
    fileDinhKem: string;
    ngayHenTraMoi?: string;
    taiKhoanLanhDaoKy?: string;
    tenLanhDaoKy?: string;
    
}

export interface ISearchDuThaoXuLyHoSo extends IPickSearch<IDuThaoXuLyHoSo, "maHoSo">, 
        Pick<ISearchHoSo, "maLinhVucChinh" |"tiepNhanFrom" |"tiepNhanTo" |"henTraFrom" |"henTraTo" |"maTrangThai" |"searchKeys" |"nguoiDaXuLy" >{
            loaiDuThao?: string;
            trangThaiDuThao?: string;
}


export interface ISearchDuThaoXuLyHoSoResponse extends IDuThaoXuLyHoSo,
    Pick<IHoSo, "kenhThucHien" | "ngayNopHoSo" | "ngayHenTra" | "trangThaiHoSoId" | "chuHoSo" | "soDienThoaiChuHoSo" | "emailChuHoSo" | "soGiayToChuHoSo" | "id" | "maHoSo" | "tenTTHC">,
    Pick<IDuThaoXuLyHoSo, "nguoiXuLy" | "trangThai" | "trangThaiLienThongQLVB">{

}

export const DUTHAOXULYHOSO_LOAI = {
    "Bổ sung" : "Bổ sung",
    "Trả lại/Xin rút" : "Trả lại/Xin rút",
    "Xin lỗi" : "Xin lỗi",
} as const

export const DUTHAOXULYHOSO_TRANGTHAI = {
    "Chờ xử lý" : "Chờ xử lý",
    "Đã xử lý" : "Đã xử lý",
    "Chờ ký duyệt" : "Chờ ký duyệt",
    "Chờ duyệt" : "Chờ duyệt",
} as const

export type DUTHAOXULYHOSO_LOAI_TYPE = keyof typeof DUTHAOXULYHOSO_LOAI
export type DUTHAOXULYHOSO_TRANGTHAI_TYPE = keyof typeof DUTHAOXULYHOSO_TRANGTHAI

