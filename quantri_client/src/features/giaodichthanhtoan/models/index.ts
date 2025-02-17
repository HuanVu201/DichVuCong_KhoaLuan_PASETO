import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface IGiaoDichThanhToan extends IBaseExt {
    ten?:string;
    ma?: string;
    maNganh?: string;
    hoSo?: string;
    maThamChieu?: string;
    nguoiNopTienBienLai?: string;
    maSoThueBienLai?: string;
    diaChiBienLai?: string;
    trangThai: string,
    bodyKetQua: string,
    responseDvcPayment: string;
    soTien: string;
    thoiGianGD?: Date;
}
export interface IConfirmDvcPaymentResponse {
    maLoi: string,
    moTaLoi: string,

}
export interface ISearchGiaoDichThanhToan extends IBasePagination, IBaseSearch {
    DonViQuanLy?: string;
    hoSo?: string;
    tuNgay?: string;
    denNgay?: string;
    trangThai?: string;
}