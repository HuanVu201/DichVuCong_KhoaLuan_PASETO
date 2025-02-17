
export interface IBaoCaoDonVi {
    maDonVi?: string;
    tenDonVi?: string;
    maTTHC?: string;
    tenTTHC?: string;
    maThongKe: string;
    tenThongKe: string;
    catalog?: string;
    tongSo: number;
    thuTu?: number;
    tongTiepNhan: number;
    tongDaXuLy: number;
    tongDangXuLy: number;
    tongBoSung: number;
    tongTraLai: number;
    tiepNhanKyTruoc: number;
    tiepNhanQuaMang: number;
    tiepNhanTrucTiep: number;
    tiepNhanQuaBCCI: number;
    tiepNhanTrongKy: number;
    daXuLyTruocHan: number;
    daXuLyDungHan: number;
    daXuLyQuaHan: number;
    dangXuLyTrongHan: number;
    dangXuLyQuaHan: number;
    tiepNhanTrucTiepVaBCCI: number;
    daXuLyVaTraLai: number;
    daXuLyDungHanVaTraLai: number;
    dangXuLyVaBoSung: number;
    dangXuLyTrongHanVaBoSung: number;
    daXuLyDungHanVaTruocHan: number;
    traLaiDungHan: number;
    traLaiQuaHan: number;
    traLaiTruocHan: number;
    trangThaiBoSung: number;
    trangThaiDungXuLy: number;
    trangThaiYeuCauThucHienNVTC: number;
    mucDo?: string;
    thanhPhan?: IBaoCaoDonVi[]
}

export interface IBaoCaoTongHop07b {
    maThongKe?: string;
    tenThongKe?: string;
    catalog?: string;
    soTTHCCapTinh?: number;
    soTTHCCapHuyen?: number;
    soTTHCCapXa?: number;
    soTTHCTaiBPMCCapTinh?: number;
    soTTHCTaiBPMCCapHuyen?: number;
    soTTHCTaiBPMCCapXa?: number;
    soQuyTrinhCapTinh?: number;
    soQuyTrinhCapHuyen?: number;
    soQuyTrinhCapXa?: number;
    tongSoTTHC?: number;
    tongSoQuyTrinh?: number;
    tongSoTTHCTheoCCMC?: number;

}
export interface IBaoCaoNguoiNopHoSo {
    maThongKe: string;
    tenThongKe: string;
    catalog: string;
    tongSo: number;
    congDan: number;
    doanhNghiep: number;
    toChuc: number;
}
export interface IBaoCaoTongHopThanhToan {
    maThongKe: string;
    tenThongKe: string;
    catalog: string;
    phi: number;
    lePhi: number;
    tongSo: number;
    tongTienMat: number;
    tongTrucTuyen: number;
    tongHinhThucThanhToanKhac: number;
    hoSoDaThuPhi: number;
}

export interface ISearchBaoCaoDonVi {
    maDonViCha?: string;
    maDinhDanhCha?: string;
    maDinhDanh?: string;
    chiBaoGomDonViCon?: boolean;
    catalog?: string;
    type?: string;
    tuNgay?: string;
    denNgay?: string;
    cache?: boolean;
    kenhThucHien?: string;
    mucDo?: string;
    loaiDoiTuong?: string;
    maTTHC?: string;
    loaiDuLieuKetNois?: string[];
    linhVucId?: string;
    laDuLieuThongKeCacNam?: boolean
}
export interface ISearchBaoCaoThuTuc {
    maDonVi?: string;
    maLinhVuc?: string;
    maDinhDanh?: string;
    maDinhDanhCha?: string;
    catalog?: string;
    tuNgay?: string;
    denNgay?: string;
    cache?: boolean;
    chiBaoGomDonViCon?: boolean;
    coPhatSinhHoSo?: boolean;
    kenhThucHien?: string;
    mucDo?: string;
    maTTHC?: string;
    loaiDoiTuong?: string;
    linhVucId?: string;
    suDung?: string;
    laDuLieuThongKeCacNam?: boolean
}
export interface ISearchBaoCaoTongHopThanhToan {
    maDonVi?: string;
    maLinhVuc?: string;
    maDinhDanh?: string;
    maDinhDanhCha?: string;
    catalog?: string;
    tuNgay?: string;
    denNgay?: string;
    tiepNhanTuNgay?: string;
    tiepNhanDenNgay?: string;
    thanhToanTuNgay?: string;
    thanhToanDenNgay?: string;
    daThuPhi?: boolean;
    cache?: boolean
}
//////////////////////////////////////////////////////////

export interface IThongKeTTTTElement {
    maThongKe: string;
    tenThongKe: string;
    thuTucCoPhi: number;
    thuTucCoPhiPhatSinhHoSo: number;
    thuTucPhatSinhThanhToan: number;
    thuTucPhatSinhTTTT: number;
    hoSoThuocThuTucCoPhi: number;
    hoSoThuocThuTucCoPhiDaTTTT: number;
}


export interface IThongKeTienDoGiaiQuyetElement {
    maThongKe: string;
    catalog: string;
    tenThongKe: string;
    tongSo: number;
    tongTiepNhan: number;
    tongDaXuLy: number;
    tongDangXuLy: number;
    tongTamDungXuLy: number;
    tiepNhanKyTruoc: number;
    tiepNhanQuaMang: number;
    tiepNhanTrucTiep: number;
    tiepNhanBCCI: number;
    daXuLyDungHan: number;
    daXuLyQuaHan: number;
    daXuLyTruocHan: number;
    dangXuLyTrongHan: number;
    dangXuLyQuaHan: number;
    tamDungXuLyTrongHan: number;
    tamDungXuLyQuaHan: number;
}

export interface IThongKeChiTieuDVCElement {
    maThongKe: string;
    catalog: string;
    tenThongKe: string;
    tongSo: number;
    tongSoThuTuc?: number,
    thuTucDvcTrucTuyen?: number,
    thuTucDvcTrucTuyenToanTrinh?: number,
    thuTucDvcTrucTuyenMotPhan?: number,
    thuTucPhatSinhHoSo?: number,
    tongHoSoPhatSinh?: number,
    thuTucTrucTuyenPhatSinhHoSo?: number,
    hoSoPhatSinhTrongThuTucTrucTuyen?: number,
    hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen?: number,
    thuTucToanTrinh?: number,
    hoSoPhatSinhTrongThuTucToanTrinh?: number,
    hoSoPhatSinhTrucTuyenTrongThuTucToanTrinh?: number,
    thuTucMotPhan?: number,
    hoSoPhatSinhTrongThuTucMotPhan?: number,
    hoSoPhatSinhTrucTuyenTrongThuTucMotPhan?: number,
    thuTucDvc?: number,
    thuTucDvcPhatSinhHoSo?: number,
    hoSoPhatSinhTrongThuTucDvc?: number
}


export interface IThongKeChiTieuSoHoaElement {
    maThongKe: string;
    catalog: string;
    tenThongKe: string;
    tiepNhan?: number,
    chuaSoHoaTPHS?: number,
    coSoHoaTPHS?: number,
    coTaiSuDungTPHS?: number,
    coTaiSuDungTPHSTuDvcQg?: number,
    daGiaiQuyet?: number,
    daGiaiQuyetChuaSoHoa?: number,
    daGiaiQuyetDaSoHoa?: number

}

export interface IThongKeThuTucPhatSinhHoSos {
    maTTHC?: string,
    tenTTHC?: string,
    tenDonVi?: string,
    maDonVi?: string,
    tiepNhanTrucTiep?: number,
    tiepNhanTrucTuyen?: number,
    tiepNhanBCCI?: number,
    traKetQuaQuaBCCI?: number,
    tongTiepNhan?: number,
}