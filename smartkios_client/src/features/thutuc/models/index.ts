import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
import { MUCDO } from "../data";
export interface IThuTuc extends IBaseExt {
    iDQG: string
    maTTHC: string
    tenTTHC: string
    maCoQuanCongBo: string
    loaiTTHC: string
    moTaDoiTuongThucHien: string
    diaChiTiepNhan: string
    yeuCau: string
    tuKhoa: string
    idQuyetDinhCongBo: string
    trangThai: string
    moTaCoQuanThucHien: string
    moTaCoQuanThamQuyen: string
    moTa: string
    trinhTuThucHien: string
    capThucHien: string
    linhVucThucHien: string
    cachThucThucHien: string
    doiTuongThucHien: string
    thanhPhanHoSo: string
    ketQuaThucHien: string
    canCuPhapLy: string
    tTHCLienQuan: string
    tTHCLienThong: string
    suDung: boolean
    goiTinThuTucQG: string
    coQuanThucHien: string
    coQuanCoThamQuyen: string
    coQuanDuocUyQuyen: string
    coQuanPhoiHop: string
    linhVucChinh: string
    maLinhVucChinh: string
    coQuanThucHienChinh: string
    maKetQuaChinh: string
    tenKetQuaChinh: string
    thoiGianGiaiQuyet: string
    quyetDinhCongBo: string
    ngayCapNhat?: string
    linhVucId: string
    trangThaiPhiLePhi: boolean
    mucDo: MUCDO
    lienThong: string
    hoSoPhatSinhTrongNam: number,
    soLuongTruongHopThuTuc: number,
    thuTu: number,
    laTieuBieu: boolean;
    choPhepLayFileTuTHPS: boolean;
    laThuTucChungThuc : boolean
}

export interface ISearchThuTuc extends IBasePagination, IBaseSearch, IPickSearch<IThuTuc, "maLinhVucChinh" | "tenTTHC" | "maTTHC" | "loaiTTHC" | "tuKhoa" | "doiTuongThucHien" | "laThuTucChungThuc"> {
    donVi?: string;
    nguoiTiepNhanId?: string;
    LaTieuBieu?: boolean;
    OrderBy?: string[];
    mucDo?: string;
}


export interface INguoiTiepNhanThuTuc extends IBaseExt {
    nguoiTiepNhan: string,
    tenTTHC: string,
    maTTHC: string,
    loaiTTHC: string,
    mucDo: string
}

export interface ISearchNguoiTiepNhanThuTuc extends IBasePagination, IBaseSearch, IPickSearch<INguoiTiepNhanThuTuc, "nguoiTiepNhan" | "tenTTHC" | "maTTHC" | "loaiTTHC" | "mucDo"> {
   
}