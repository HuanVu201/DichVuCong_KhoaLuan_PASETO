import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IGiayToSoHoa extends IBaseExt {
    ten: string;
    ma: string;
    maGiayToKhoQuocGia: string;
    maDinhDanh: string;
    maGiayTo: string;
    donViId: string;
    nguoiSoHoa: string;
    thoiGianSoHoa: string;
    thoiHanHieuLuc: string;
    ngayBanHanh: string;
    phamViHieuLuc: string;
    trichYeuNoiDung: string;
    coQuanBanHanh: string;
    nguoiKy: string;
    loaiSoHoa: string;
    dinhKem: string;
    dinhKemSoHoa: string;
    fullName?: string;
    soKyHieu?: string;
    thoiHanVinhVien?: boolean;
    jsonOcr?: string;
    maHoSo?: string;
    khoTaiLieuDienTuId?: string;
    ngayCapNhatKho?: string;
    dungLuong?: number;
    maDinhDanhChiaSe?: string;
    tenNguoiChiaSe?: string;
    chuGiayTo?: string;
    chuHoSo?: string;
    thoiGianChiaSe?: string;
    maTTHC?: string;
    maLinhVuc?: string;
    trangThaiSoHoa?: "1" | "2" | "3";
}


export interface ISearchGiayToSoHoa extends IBasePagination, IBaseSearch, IPickSearch<IGiayToSoHoa, "maDinhDanh" | "trangThaiSoHoa" | "maTTHC" | "maLinhVuc"> {
    maKetQuaTTHC?: string;
    hienThiGiayToKetQua?: boolean;
    daHetHan?: boolean;
    khoTaiLieuDienTuId?: string;
    groupByUser?: boolean;
    byCurrentUser?: boolean;
    tuNgay?: string;
    denNgay?: string
}