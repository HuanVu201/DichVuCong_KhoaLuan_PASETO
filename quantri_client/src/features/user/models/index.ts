import { IBaseExt, IBasePagination, IPickSearch } from "../../../models";
export interface IUser extends IBaseExt {
    fullName: string,
    userName: string
    groupCode: string,
    groupName: string,
    positionCode: string,
    positionName: string,
    userOrder: string,
    isSystemAccount: string,
    phoneNumber: string,
    email: string
    oldGroupCode: string
    soDinhDanh: string;
    soCMND: string;
    gioiTinh: string;
    MaTinhThanh?: string;
    danToc: string;
    tonGiao: string;
    tinhTrangHonNhan: string;
    nhomMau: string;
    namSinh: string;
    ngayThangNamSinh: { nam: string, ngayThangNam: string };
    quocTich: string;
    noiDangKyKhaiSinh: string;
    queQuan: string;
    thuongTru: string;
    noiOHienTai: string;
    cha: string;
    me: string;
    voChong: string;
    nguoiDaiDien: string;
    chuHo: string;
    soSoHoKhau: string;
    officeCode: string;
    officeName: string;
    typeUser: UserType;
    diaChiThuongTru: string;
    diaChiKhaiSinh: string;
    diaChiQueQuan: string;
    imageUrl: string;
    hoVaTen: string;
    maDinhDanh?: string;
    roleId: string;
    laCanBoTiepNhan?: boolean
    donViQuanLy?: string;
    congDanDinhDanh?: string;
}

export type UserType = "CongDan" | "CanBo" | "Admin"

export type NguoiThan = {
    hoVaTen: string,
    quocTich: string,
    soCMND: string,
    soDinhDanh: string,
}
export type ChuHo = {
    hoVaTen: string,
    quanHe: string,
    soCMND: string,
    soDinhDanh: string,
}
export type DiaChi = {
    maTinhThanh: string;
    maQuanHuyen: string;
    maPhuongXa: string;
    tenTinhThanh: string;
    tenQuanHuyen: string;
    tenPhuongXa: string;
    chiTiet: string;
    quocGia: string;
}

export type GetCSDLDanCuResponse = {
    // envelope: {
    //     body: {
    //         congdanCollection: {
    //             congDan: {
    cha: NguoiThan;
    email?: string;
    phoneNumber?: string;
    me: NguoiThan;
    voChong: NguoiThan;
    nguoiDaiDien: NguoiThan;
    hoVaTen: { ho: string; ten: string; chuDem: string };
    fullName: string;
    lastName: string;
    firstName: string;
    chuHo: ChuHo;
    danToc: string;
    tonGiao: string;
    gioiTinh: string;
    tinhTrangHonNhan: string;
    nhomMau: string;
    // ngayThangNamSinh : {
    //     nam: string;
    //     ngayThangNam:string;
    // }
    namSinh: string;
    ngayThangNamSinh: { nam: string, ngayThangNam: string };
    noiDangKyKhaiSinh: DiaChi;
    noiOHienTai: DiaChi;
    thuongTru: DiaChi;
    queQuan: DiaChi;
    quocTich: string;
    soCMND: string;
    soDinhDanh: string;
    soSoHoKhau: string;
    //             }
    //         }
    //     }
    // }
}

export interface IChangePassWord {
    password: string,
    newPassword: string,
    confirmNewPassword: string,
    userName?: string
}

export interface IGetUser {
    data?: IUser
}
export interface ISearchUser extends IBasePagination, IPickSearch<IUser, "fullName" | "groupCode" | "officeCode" | "soDinhDanh" | "laCanBoTiepNhan"> {
    isActive?: boolean,
    orderBy?: string[],
    typeUser?: string,
    laCanBoTiepNhan?: boolean,
    officeCodeWithChildren?: string;
    donViQuanLy?: string
}
export interface IUserRole extends IBaseExt {
    roleId: string,
    roleName: string,
    description?: string,
    enabled?: boolean,
}
export interface IUpdateUserRole {
    userRoles: IUserRole[]
}

export type ThongTinCSDLDanCuSearchParams = {
    // MaYeuCau: string,
    // MaDVC: string,
    // MaTichHop: string,
    // MaCanBo: string,
    SoDinhDanh: string,
    SoCMND: string,
    HoVaTen: string,
    LoaiGiayTo?: string,
    NgayThangNam: string,
    Nam: string
    UpdateEntity?: boolean;
    MaHoSo?: string;
    OTP?: string;
}

export interface ILogOut {
    access_token: string,
    returnUrl?: string
}

export type SearchNhomLanhDaoResponse = {
    id: string;
    fullName: string;
    name: string;
    officeName: string;
    groupName: string;
    userName: string;
    positionName: string;
}


export interface ISearchUserByPermision extends IBasePagination, IPickSearch<IUser, "fullName" | "groupCode" | "officeCode" | "soDinhDanh" | "laCanBoTiepNhan"> {
    isActive?: boolean,
    orderBy?: string[],
    typeUser?: string,
    laCanBoTiepNhan?: boolean,
    officeCodeWithChildren?: string;
    donViQuanLy?: string
}
export type UpdateEmailAndPhoneNumberPortalParams = {
    userName: string
    email?: string
    phoneNumber?: string

}