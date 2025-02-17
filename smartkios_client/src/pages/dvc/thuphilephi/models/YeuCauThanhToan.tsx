import { IBaseExt } from "@/models";

export interface IYeuCauThanhToan extends IBaseExt {
  maHoSo?: string;
  ma?: string;
  soTien?: string;
  phi?: string;
  lePhi?: string;
  trangThai?: string;
  ngayYeuCau?: string;
  nguoiYeuCau?: string;
  tenNguoiYeuCau?: string;
  taiKhoanNguoiYeuCau?: string;
  donViThu?: string;
  hinhThucThanhToan?: string;
  hinhThucThu?: string;
  chiTiet?: string;
  ghiChuThanhToan?: string;
  mauSoBienLai?: string;
  kyHieuBienLai?: string;
  soHieuBienLai?: string;
  nguoiThuPhi?: string;
  ngayThuPhi?: string;
  donViThuPhiMaSoThue?: string;
  donViMaSoThue?: string;
  ngayHoanPhi?: string;
  nguoiHoanPhi?: string;
  lyDoHoanPhi?: string;
  ngayHuy?: string;
  nguoiHuy?: string;
  lyDoHuy?: string;
  ghiChu?: string;
  tenDonVi?: string;
  tenDonViThu?: string;
}
