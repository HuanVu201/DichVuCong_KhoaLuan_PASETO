import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from '@/models';

export interface IConfigApiString extends IBaseExt {
    urlapi: string
    token: string
}

export interface ILienThongQLVB {
    DocId?: string,
    DonViGui?: string,
    ThoiGianXuLy?: any,
    CreatedBy?: string,
    Created?: any,
    ModifiedBy?: string,
    Modified?: string,
    Name?: string,
    Code?: string,
    ID?: any
    SoLanXuLy: string,
    LogGuiNhan: string,
    NgayTiepNhan: string,
    NgayHenTra: string,
    DonViNhan: string,
    MaDonViGui: string,
    MaDonViNhan: string,
    TrangThai: string,
    MaTrangThai: string,
    LoaiGoiTin: string,
    LoaiGuiNhan: string,
    LoaiKetQua: string,
    LoaiKetQuaText: string,
    NoiDungGoiTin: string
}


export interface INoiDungGoiTin {
    IDHoSo: string
    MaHoSo: string
    ChuHoSo: {
        Ten: string,
        CMND: string,
        SoDienThoai: string,
        DiaChi: string
    },
    NguoiNop: {
        Ten: string,
        CMND: string,
        SoDienThoai: string,
        DiaChi: string
    },
    NguoiKy: {
        Ten: string,
        TaiKhoan: string
    },
    NguoiTrinhKy: {
        Ten: string,
        TaiKhoan: string
    },
    DonVi: {
        Ten: string,
        MaDinhDanh: string
    },
    VanBanDuThao: {
        TrichYeu: string,
        NgayTao: string,
        DinhKem: [{
            Ten: string
            Base64: string
        }],
        TenHoSo: string,
        ThuTuc: string,
        ThamSoAn: null,
        HccLinkAPI: string,
        LoaiHSLienthong: string,
        NgayTiepNhan: string,
        NgayHenTra: string
    }
}

export interface IQLVBSearchParams {
    draw?: number,
    columns?: [

    ],
    order?: [],
    start?: 0,
    length?: number,
    search?: {
        value?: "",
        regex?: false
    },
    TuNgay?: string,
    DenNgay?: string,
    XLTuNgay?: string,
    XLDenNgay?: string,
    TrangThai?: any,
    LoaiGuiNhan?: any,
    LoaiGoiTin?: string,
    TrongNgay?: string
}