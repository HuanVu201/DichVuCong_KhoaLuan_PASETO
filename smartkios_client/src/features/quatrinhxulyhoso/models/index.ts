import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";

export interface IQuaTrinhXuLyHoSo extends IBaseExt {
    maHoSo: string;
    thoiGian: string;
    trangThai: string;
    nodeQuyTrinh: string;
    nguoiGui: string;
    nguoiNhan?: string;
    thoiHanBuocXuLy: string;
    loaiThoiHanBuocXuLy: string;
    ngayHetHanBuocXuLy: string;
    thaoTac: string;
    noiDung: string;
    dinhKem: string;
    trangThaiDongBoDVCQuocGia: string;
    tenNguoiGui: string;
    tenNguoiNhan: string;
}

export interface ISearchQuaTrinhXuLyHoSo extends IBasePagination, IBaseSearch, IPickSearch<IQuaTrinhXuLyHoSo, "maHoSo" | "nguoiGui"> {

}