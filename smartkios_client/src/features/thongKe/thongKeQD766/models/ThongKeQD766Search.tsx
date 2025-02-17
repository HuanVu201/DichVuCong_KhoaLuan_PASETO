export interface ISearchThongKeParams {
  pageNumber?: number;
  pageSize?: number;
  tuNgay?: string;
  denNgay?: string;
  maDinhDanhCha?: string;
  trangThaiXuLy?: string;
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
