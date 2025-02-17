import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface ILogCSDLDanCuDoanhNghiep extends IBaseExt {
    id: string;
    taiKhoan: string;
    thoiGian?: string; // Đảm bảo thuộc tính này tồn tại và có kiểu dữ liệu phù hợp
    loai: string;
    donViId: string;
    input : string;
    groupName: string;
}

export interface IGetUrlPhoi {
    loaiPhoi?: string,
    maDonVi?: any,
    maLinhVuc?: any,
    maThuTuc?: any,
}

export interface ISearchLogCSDLDanCuDoanhNghiep extends IBasePagination, IBaseSearch, IPickSearch<ILogCSDLDanCuDoanhNghiep> {
    loaiPhoi?: string,
    tenLogCSDLDanCuDoanhNghiep?: string,
    maDonVi?: string,
    maLinhVuc?: string,
    maThuTuc?: string
    laPhoiEmail?: boolean,
    laPhoiMacDinh?: boolean,
    tuNgay?: string; // Đảm bảo thuộc tính này có mặt
    denNgay?: string; // Đảm bảo thuộc tính này có mặt

}