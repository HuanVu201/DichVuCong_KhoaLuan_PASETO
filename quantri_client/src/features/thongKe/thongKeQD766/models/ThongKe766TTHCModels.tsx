export interface ISearchThongKe766TTHCParams {
  MaLinhVuc?: string;
  Catalog?: string;
  // groupCode: string
}
export interface IThongKe766TTHCResponse {
  data: IThongKe766TTHCElement[];
}
export interface IThongKe766TTHCElement {
  maDonVi?: string;
  tenDonVi?: string;
  catalog?: string;
  malinhVuc?: string;
  tenLinhVuc: string;
  tongTTHC?: number;
  tthcTrucTuyenToanTrinh?: number;
  tthcTrucTuyenMotPhan?: number;
  tthcConLai?: number;
  tongTTHCThuPhi?: number;
  tthcThuPhiTrucTuyenToanTrinh?: number;
  tthcThuPhiTrucTuyenMotPhan?: number;
  tthcThuPhiConLai?: number;
}
