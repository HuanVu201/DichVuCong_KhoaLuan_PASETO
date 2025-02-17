
export interface IBaoCaoDonVi {
    maThongKe: string;
    tenThongKe: string;
    catalog: string;
    tongSo: number;
    thuTu: number;
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
}

export interface ISearchBaoCaoDonVi {
    maDonViCha?: string;
    catalog?: string;
    type?: string;
    tuNgay?: Date;
    denNgay?: Date;
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
