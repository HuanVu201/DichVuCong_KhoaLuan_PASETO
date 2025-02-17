import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IGiayToSoHoa extends IBaseExt {
    ten: string;
    ma: string;
    maGiayToKhoQuocGia : string;
    maDinhDanh : string;
    maGiayTo : string;
    donViId : string;
    nguoiSoHoa : string;
    thoiGianSoHoa : string;
    thoiHanHieuLuc : string;
    ngayBanHanh : string;
    phamViHieuLuc : string;
    trichYeuNoiDung : string;
    coQuanBanHanh : string;
    nguoiKy : string;
    loaiSoHoa : string;
    dinhKem : string;
    dinhKemSoHoa : string;
    fullName?: string;
    soKyHieu?: string;
    thoiHanVinhVien?: boolean;
    jsonOcr?: string;
    maHoSo?:string;
}

export interface ISearchGiayToSoHoa extends IBasePagination, IBaseSearch, IPickSearch<IGiayToSoHoa, "maDinhDanh"> {
    maKetQuaTTHC?: string;
    hienThiGiayToKetQua?: boolean;
}