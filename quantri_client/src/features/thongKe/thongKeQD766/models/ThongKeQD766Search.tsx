export interface ISearchThongKeParams {
  pageNumber?: number;
  pageSize?: number;
  tuNgay?: string;
  denNgay?: string;
  maDinhDanhCha?: string;
  maDinhDanh?: string;
  trangThaiXuLy?: string;
  trangThaiHoSoId?: string;
  donViQuanLy?: string;
  chiBaoGomDonViCon?: boolean;
  groupCode?: string;
  donViPhiDiaGioi?: string;
  maLinhVucChinh?: string;
  maTTHC?: string;
  catalog?: string;
  mucDos?: string[];
  maDonVi?: string;
  laDuLieuThongKeCacNam?: boolean;

}
export interface ITheoDoiChiTieuDVCTrucTuyenParams
  extends ISearchThongKeParams {
  type?: string;
}
export interface ITienDoGiaiQuyetParams extends ISearchThongKeParams {
  type?: string;

}
export interface IThanhToanTrucTuyenParams extends ISearchThongKeParams {
  type?: string;
}
