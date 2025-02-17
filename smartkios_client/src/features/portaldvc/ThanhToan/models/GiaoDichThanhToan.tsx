import { IBaseExt } from "@/models";

export interface IGiaoDichThanhToan {
  maGiaoDichThanhToan: string;
  duongDanThanhToan: string;
}
export interface IGiaoDichThanhToanDetailPortal extends IBaseExt {
  hoSo: string;
  yeuCauThanhToan: string;
  soTien: string;
  thongTinGiaoDich: string;
  maThuTucDVCQG: string;
  tenThuTucDVCQG: string;
  hoTenNguoiNop: string;
  soCMNDNguoiNop: string;
  diaChiNguoiNop: string;
  trangThai: string;
  duongDanBienLai: string;
}
