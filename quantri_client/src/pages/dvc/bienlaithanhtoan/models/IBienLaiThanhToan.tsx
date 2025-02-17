export interface IGetBienLaiThanhToan {
  idYeuCauThanhToan?: string;
  loaiPhi?: string;
}

export interface IBienLaiThanhToan {
  chiTiet: string
  chuHoSo?: string
  diaChiBienLai?: string
  diaChiChuHoSo?: string
  donVi?: string
  donViMaSoThue?: string
  donViThu?: string
  donViThuPhiMaSoThue?: string
  ghiChuThanhToan?: string
  hinhThucThanhToan?: string
  hinhThucThu?: string
  id?: string
  kyHieuBienLai?: string
  lePhi?: number
  lePhiTheoTTHC?: string
  loaiBienLaiThanhToan?: string
  lyDoHoanPhi?: string
  lyDoHuy?: string
  ma?: string
  maDonViThucHienHoSo?: string
  maHoSo?: string
  maNganHang?: string
  maSoThueBienLai?: string
  maTTHC?: string
  mauSoBienLai?: string
  ngayHoanPhi?: string
  ngayHuy?: string
  ngayThuPhi?: string
  ngayYeuCau?: string
  nguoiHoanPhi?: string
  nguoiHuy?: string
  nguoiNopTienBienLai?: string
  nguoiThuPhi?: string
  nguoiUyQuyen?: string
  nguoiYeuCau?: string
  noiDung?: string
  phi?: number
  phiTheoTTHC?: string
  soGiayToChuHoSo?: string
  soHieuBienLai?: string
  soTien?: string
  taiKhoanNguoiYeuCau?: string
  taiKhoanThuHuong?: string
  tenDonViThu?: string
  tenDonViThucHienHoSo?: string
  tenLePhiBienLai?: string
  tenNguoiYeuCau?: string
  tenPhiBienLai?: string
  tenTTHC?: string
  tenTaiKhoanThuHuong?: string
  trangThai?: string
}
