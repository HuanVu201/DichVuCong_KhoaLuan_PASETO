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
    quyetDinh: string
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
    dinhKemQuyetDinh: string
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
    thucHienTaiBoPhanMotCua: boolean;
    choPhepLayFileTuTHPS: boolean;
    thuTucKhongCoKetQua?: boolean
    laThuTucChungThuc: boolean
    urlVideoTutorial?: string;
    laPhiDiaGioi?: boolean;
}

export interface ISearchThuTuc extends IBasePagination, IBaseSearch, IPickSearch<IThuTuc, "capThucHien" | "maLinhVucChinh" | "tenTTHC" | "maTTHC" | "loaiTTHC" | "tuKhoa" | "doiTuongThucHien" | "laThuTucChungThuc"> {
    donVi?: string;
    nguoiTiepNhanId?: string;
    LaTieuBieu?: boolean;
    OrderBy?: string[];
    mucDo?: string;
    suDung?: boolean;
    currentDonVi?: boolean;
    laTTHCTrucTuyen?: boolean;
    trangThaiPhiLePhi?: string;
    laPhiDiaGioi?: boolean;
}
export interface ISearchThuTucTheoBaoCaoTongHop extends IBasePagination, IBaseSearch {
    groupCode?: string;
    catalog?: string;
    maLinhVuc?: string;
    tieuChi?: string;
    coPhatSinhHoSo?: boolean;
}


export interface INguoiTiepNhanThuTuc extends IBaseExt {
    nguoiTiepNhan: string,
    tenTTHC: string,
    maTTHC: string,
    loaiTTHC: string,
    mucDo: MUCDO,
    donViId?: string
    quyetDinhCongBo?: string
    dinhKemQuyetDinh?: string
}

export interface ISearchNguoiTiepNhanThuTuc extends IBasePagination, IBaseSearch, IPickSearch<INguoiTiepNhanThuTuc, "nguoiTiepNhan" | "tenTTHC" | "maTTHC" | "loaiTTHC" | "mucDo" | "donViId"> {

}

export interface IimportThuTuc {
    message: string,
    lstMaTTTHC: string[]
}