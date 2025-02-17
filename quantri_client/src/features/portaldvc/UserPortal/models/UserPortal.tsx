import { IBaseExt, IBasePagination, IPickSearch } from "@/models";

export interface IUserPortal extends IBaseExt {
    imageUrl: string;
    fullName: string;
    userName: string;
    soCMND: string;
    soDinhDanh: string;
    ngayThangNamSinh: string;
    namSinh: string;
    phoneNumber: string;
    gioiTinh: string;
    noiDangKyKhaiSinh: string;
    email: string;
    queQuan: string;
    thuongTru: string;
    diaChiKhaiSinh: string;
    diaChiThuongTru: string;

}

export interface ISearchUserPortal
    extends IBasePagination,
    IPickSearch<IUserPortal> {

}