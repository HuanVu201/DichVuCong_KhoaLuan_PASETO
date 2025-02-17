import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "@/models";
export interface IYeuCauThanhToanPortal extends IBaseExt {
  id: string;
  maHoSo: string;
  ma: string;
  soTien: string;
  phi: string;
  lePhi: string;
  trangThai: string;
  ngayYeuCau: string;
  nguoiYeuCau: string;
  donViThu: string;
  hinhThucThanhToan: string;
  hinhThucThu: string;
  chiTiet: string;
  ghiChuThanhToan: string;
  mauSoBienLai: string;
  kyHieuBienLai: string;
  soHieuBienLai: string;
  nguoiThuPhi: string;
  ngayThuPhi: string;
  donViThuPhiMaSoThue: string;
  donViMaSoThue: string;
  ngayHoanPhi: string;
  nguoiHoanPhi: string;
  lyDoHoanPhi: string;
  ngayHuy: string;
  nguoiHuy: string;
  lyDoHuy: string;
  tenTTHC?: string;
  nguoiNopTienBienLai?: string;
  maSoThueBienLai?: string;
  diaChiBienLai?: string;
  trichYeuHoSo?: string;
  chuHoSo?: string;
  diaChiChuHoSo?: string;
  soGiayToChuHoSo?: string;
  soGiayToNguoiNopTienBienLai?: string;
  emailNguoiNopTienBienLai?: string;
  emailChuHoSo?: string;

}

export interface ISearchYeuCauThanhToanPortal
  extends IBasePagination,
    IBaseSearch,
    IPickSearch<IYeuCauThanhToanPortal, "maHoSo"> {
  trangThai?: string;
}
