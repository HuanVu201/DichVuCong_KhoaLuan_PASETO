import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IYeuCauThanhToan extends IBaseExt {
    maHoSo: string;
    ma: string;
    soTien: string;
    phi: string;
    lePhi: string;
    lePhiTheoTTHC?: string;
    phiTheoTTHC?: string;
    tenTTHC?: string;
    nguoiNopTienBienLai?: string;
    maSoThueBienLai?: string;
    diaChiBienLai?: string;
    noiDung?: string;
    tenPhiBienLai?: string;
    tenLePhiBienLai?: string;
    chuHoSo: string;
    diaChiChuHoSo: string;
    ngayYeuCau: string;
    nguoiYeuCau: string;
    donViThu: string;
    hinhThucThanhToan: string;
    hinhThucThu: string;
    chiTiet: string;
    ghiChuThanhToan?: string;
    mauSoBienLai: string;
    kyHieuBienLai: string;
    soHieuBienLai: string;
    nguoiThuPhi: string;
    ngayThuPhi: string;
    donViThuPhiMaSoThue: string;
    donViMaSoThue: string;
    ngayHoanPhi: string;
    nguoiHoanPhi: string;
    lyDoHoanPhi: string;
    ngayHuy: string;
    nguoiHuy: string;
    lyDoHuy: string;
    tenNguoiYeuCau: string;
    tenDonVi: string;
    trangThai?: string;
    nguoiUyQuyen?: string;
    diaChiNguoiUyQuyen?: string;
    trichYeuHoSo?: string;
    tenTaiKhoanHoanPhi?: string;
    tenNganHangHoanPhi?: string;
    soTaiKhoanHoanPhi?: string;
    loaiBienLaiThanhToan?: string;
    soGiayToChuHoSo?: string;
    emailChuHoSo?: string;
    emailNguoiNopTienBienLai?: string
    soBienLaiPhi?: string;
    soBienLaiLePhi?: string;
    soDienThoaiNguoiNopTienBienLai?: string;
    soDienThoaiChuHoSo?: string;
    soGiayToNguoiNopTienBienLai?: string;
    soDienThoaiNguoiUyQuyen?: string;
    maThamChieuGiaoDich?: string;
}
export interface IBienLaiDienTuDto {
    idYeuCauThanhToan?: string;
    bienLaiDienTu?: string;
    maLoi?: string;
    mauSoBienLai?: string;
    kyHieuBienLai?: string;
    soBienLai?: string;
    loaiBienLaiThanhToan?: string;
}
export interface ISearchYeuCauThanhToan extends IBasePagination, IBaseSearch, IPickSearch<IYeuCauThanhToan> {
    trangThai?: string;
    donViThu?: string;
    donVi?: string;
    laNguoiTiepNhan?: boolean
    hoSoId?: string
    nguoiGui?: string;
    maDinhDanhCha?: string;
    maDinhDanh?: string;
    tuNgay?: string;
    denNgay?: string;
    thanhToanTuNgay?: string;
    thanhToanDenNgay?: string;
    tieuChi?: string;
    maHoSo?: string;
    khacHinhThucThus?: string[];
    mucDos?: string[];
    catalog?: string;
}

export const YEUCAUTHANHTOAN_TRANGTHAI = {
    "Đã thanh toán": "Đã thanh toán",
    "Đã hoàn phí": "Đã hoàn phí",
    "Hủy thanh toán": "Hủy thanh toán",
    "Chờ thanh toán": "Chờ thanh toán",
    "Chưa thanh toán": "Chưa thanh toán",
} as const

export type YEUCAUTHANHTOAN_TRANGTHAI_TYPE = keyof typeof YEUCAUTHANHTOAN_TRANGTHAI