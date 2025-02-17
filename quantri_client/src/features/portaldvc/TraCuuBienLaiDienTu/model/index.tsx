import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IBienLaiDienTuPortal extends IBaseExt {
    maHoSo: string,
    chuHoSo: string,
    soGiayToChuHoSo: string,
    diaChiChuHoSo?: string,
    trichYeuHoSo?: string,
    ngayTiepNhan?: string,
    ngayHenTra?: string,
    phi?: number,
    tenNguoiYeuCau?: string,
    tenDonVi?: string,
    ngayThuPhi?: string,
    loaiBienLaiThanhToan?: string,
}

export interface ISearchBienLaiDienTuPortal extends IBasePagination, IBaseSearch, IPickSearch<IBienLaiDienTuPortal> {
    maHoSo: string,
    soGiayToChuHoSo: string,
    
}

export type SearchBienLaiPortalParams = {
    MaHoSo: string,
    SoGiayToChuHoSo: string,
    // MaCaptCha: string;
}

export interface IGetBienLaiThanhToanPortal {
    idYeuCauThanhToan?: string;
    loaiPhi?: string;
  }
  
  export interface IBienLaiThanhToanPortal {
    chiTiet: string
    chuHoSo?: string
    diaChiBienLai?: string
    diaChiChuHoSo?: string
    donVi?: string
    donViMaSoThue?: string
    donViThu?: string
    donViThuPhiMaSoThue?: string
    ghiChuThanhToan?: string
    hinhThucThanhToan?: string
    hinhThucThu?: string
    id?: string
    kyHieuBienLai?: string
    lePhi?: number
    lePhiTheoTTHC?: string
    loaiBienLaiThanhToan?: string
    lyDoHoanPhi?: string
    lyDoHuy?: string
    ma?: string
    maDonViThucHienHoSo?: string
    maHoSo?: string
    maNganHang?: string
    maSoThueBienLai?: string
    maTTHC?: string
    mauSoBienLai?: string
    ngayHoanPhi?: string
    ngayHuy?: string
    ngayThuPhi?: string
    ngayYeuCau?: string
    nguoiHoanPhi?: string
    nguoiHuy?: string
    nguoiNopTienBienLai?: string
    nguoiThuPhi?: string
    nguoiUyQuyen?: string
    nguoiYeuCau?: string
    noiDung?: string
    phi?: number
    phiTheoTTHC?: string
    soGiayToChuHoSo?: string
    soHieuBienLai?: string
    soTien?: string
    taiKhoanNguoiYeuCau?: string
    taiKhoanThuHuong?: string
    tenDonViThu?: string
    tenDonViThucHienHoSo?: string
    tenLePhiBienLai?: string
    tenNguoiYeuCau?: string
    tenPhiBienLai?: string
    tenTTHC?: string
    tenTaiKhoanThuHuong?: string
    trangThai?: string
  }
  