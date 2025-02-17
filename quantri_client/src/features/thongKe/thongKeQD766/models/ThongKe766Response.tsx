export interface IThongKeTTTTResponse {
  data: IThongKeTTTTElement[];
}
export interface IThongKeTTTTElement {
  maThongKe: string;
  tenThongKe: string;
  thuTucCoPhi: number;
  thuTucCoPhiPhatSinhHoSo: number;
  thuTucPhatSinhThanhToan: number;
  thuTucPhatSinhTTTT: number;
  hoSoThuocThuTucCoPhi: number;
  hoSoThuocThuTucCoPhiDaTTTT: number;
  catalog: string;
}

export interface IThongKeTienDoGiaiQuyetResponse {
  data: IThongKeTienDoGiaiQuyetElement[];
}
export interface IThongKeTienDoGiaiQuyetElement {
  maThongKe: string;
  catalog: string;
  tenThongKe: string;
  tongSo: number;
  tongTiepNhan: number;
  tongDaXuLy: number;
  tongDangXuLy: number;
  dangXuLyVaBoSung: number;
  dangXuLyTrongHanVaBoSung: number;
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
export interface IThongKeChiTieuDVCResponse {
  data: IThongKeChiTieuDVCElement[];
}
export interface IThongKeChiTieuDVCElement {
  maThongKe: string;
  catalog: string;
  tenThongKe: string;
  tongSo: number;
  tongSoThuTuc?: number;
  thuTucDvcTrucTuyen?: number;
  thuTucDvcTrucTuyenToanTrinh?: number;
  thuTucDvcTrucTuyenMotPhan?: number;
  thuTucPhatSinhHoSo?: number;
  tongHoSoPhatSinh?: number;
  thuTucTrucTuyenPhatSinhHoSo?: number;
  hoSoPhatSinhTrongThuTucTrucTuyen?: number;
  hoSoPhatSinhTrucTuyenTrongThuTucTrucTuyen?: number;
  thuTucToanTrinh?: number;
  thuTucToanTrinhPhatSinhHoSo?: number;
  hoSoPhatSinhTrongThuTucToanTrinh?: number;
  hoSoPhatSinhTrucTuyenTrongThuTucToanTrinh?: number;
  thuTucMotPhan?: number;
  thuTucMotPhanPhatSinhHoSo?: number;
  hoSoPhatSinhTrongThuTucMotPhan?: number;
  hoSoPhatSinhTrucTuyenTrongThuTucMotPhan?: number;
  thuTucDvc?: number;
  thuTucDvcPhatSinhHoSo?: number;
  hoSoPhatSinhTrongThuTucDvc?: number;
}

export interface IThongKeChiTieuSoHoaResponse {
  data: IThongKeChiTieuSoHoaElement[];
}
export interface IThongKeChiTieuSoHoaElement {
  maThongKe: string;
  catalog: string;
  tenThongKe: string;
  tiepNhan?: number;
  chuaSoHoaTPHS?: number;
  coSoHoaTPHS?: number;
  coTaiSuDungTPHS?: number;
  coTaiSuDungTPHSTuDvcQg?: number;
  daGiaiQuyet?: number;
  daGiaiQuyetChuaSoHoa?: number;
  daGiaiQuyetDaSoHoa?: number;
}
export interface IThongKeQD766DonDocTTTTResponse {
  data: IThongKeQD766DonDocTTTTElement[];
}
export interface IThongKeQD766DonDocTTTTElement {
  catalog?: string;
  maThongKe?: string;
  tenThongKe?: string;
  hoSoDaThuPhi: number;
  hoSoDaThuPhiTrucTiep: number;
  hoSoDaThuPhiTrucTuyen: number;
  tongSoTien: number;
  tongPhi: number;
  tongLePhi: number;
  tongSoTienTienMat: number;
  tongSoTienChuyenKhoan: number;
  tongSoTienTrucTuyen: number;
  hoSoThuocDoiTuongMienPhi: number;
}
