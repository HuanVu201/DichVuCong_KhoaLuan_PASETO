export interface IHoSoTiepNhanQuaHan {
  id?: string;
  maHoSo?: string;
  ngayTiepNhan?: string;
  chuHoSo?: string;
  trichYeuHoSo?: string;
  soDienThoaiChuHoSo?: string;
  emailChuHoSo?: string;
  soGiayToChuHoSo?: string;
  ngayTra?: string;
  ngayKetThucXuLy?: Date;
  ngayNopHoSo?: string;
  ngayHenTra?: string;
  createdOn?: string;
  kenhThucHien?: string;
  tenDonVi?: string;
  donViId?: string;
  diaChiChuHoSo?: string;
  tenTTHC?: string;
  tenLinhVuc?: string;
  maTTHC?: string;
  nguoiNhanHoSo?: string;
  tenNguoiNhanHoSo?: string;
  trangThaiHoSoId?: string;
  tenTrangThaiHoSo?: string;
  soBoHoSo?: string;
  tenDiaBan?: string;
}
export interface ISearchHoSoTiepNhanQuaHan {
  tiepNhanTuNgay?: string;
  tiepNhanDenNgay?: string;
  maLinhVucChinh?: string;
  maTrangThai?: string;
  maHoSo?: string;
  soGiayToChuHoSo?: string;
  kenhThucHien?: string;
  groupCode?: string;
  nguoiNhanHoSo?: string;
  tenTTHC?: string;
  maTTHC?: string;
  daTiepNhan?: string;
  donViQuanLy?: string;
  maDinhDanhCha?: string;
  maDinhDanh?: string;
  pageSize?: number,
  pageNumber?: number,
}
