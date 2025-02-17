import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IYeuCauThanhToan extends IBaseExt {
    maHoSo : string;
    ma : string;
    soTien : string;
    phi : string;
    lePhi : string;
    trangThai : string;
    ngayYeuCau : string;
    nguoiYeuCau : string;
    donViThu : string;
    hinhThucThanhToan : string;
    hinhThucThu : string;
    chiTiet : string;
    ghiChuThanhToan : string;
    mauSoBienLai : string;
    kyHieuBienLai : string;
    soHieuBienLai : string;
    nguoiThuPhi : string;
    ngayThuPhi : string;
    donViThuPhiMaSoThue : string;
    donViMaSoThue : string;
    ngayHoanPhi : string;
    nguoiHoanPhi : string;
    lyDoHoanPhi : string;
    ngayHuy : string;
    nguoiHuy : string;
    lyDoHuy : string;
    tenNguoiYeuCau: string;
    tenDonVi: string;
}

export interface ISearchYeuCauThanhToan extends IBasePagination, IBaseSearch, IPickSearch<IYeuCauThanhToan, "maHoSo">{
    trangThai? : string;
    donViThu?: string;
    donVi?: string;
    laNguoiTiepNhan?: boolean
    hoSoId?: string
    nguoiGui?: string;
}

export const YEUCAUTHANHTOAN_TRANGTHAI = {
    "Đã thanh toán"  : "Đã thanh toán",
    "Hoàn phí" : "Hoàn phí",
    "Hủy thanh toán" : "Hủy thanh toán",
    "Chờ thanh toán" : "Chờ thanh toán",
    "Chưa thanh toán" : "Chưa thanh toán",
} as const

export type YEUCAUTHANHTOAN_TRANGTHAI_TYPE = keyof typeof YEUCAUTHANHTOAN_TRANGTHAI